const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { SwaggerTheme } = require('swagger-themes');
const theme = new SwaggerTheme();

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

// Define file paths centrally
const DATA_FILES = {
    users: path.join(__dirname, "./data/users.json"),
    tents: path.join(__dirname, "./data/tents.json"),
    cottages: path.join(__dirname, "./data/cottages.json"),
    farmhouses: path.join(__dirname, "./data/farmhouses.json"),
    hotels: path.join(__dirname, "./data/hotels.json"),
    homestays: path.join(__dirname, "./data/homestays.json"),
    treehouses: path.join(__dirname, "./data/treehouses.json"),
    villas: path.join(__dirname, "./data/villas.json"),
};

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Swagger UI setup with Dracula theme
const options = {
    explorer: true,
    customCss: theme.getBuffer('dracula')
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Helper function to read data from a file
const readData = async (filePath) => {
	try {
		const data = await fs.readFile(filePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		throw new Error("Error reading file");
	}
};

// Helper function to write data to a file
const writeData = async (filePath, data) => {
	try {
		await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
	} catch (err) {
		throw new Error("Error writing file");
	}
};

// Input validation middleware
const validateItem = (req, res, next) => {
	const { type } = req.params;
	const item = req.body;

	if (!item.name || !item.capacity) {
		return res.status(400).json({ error: "Name and capacity are required" });
	}

	if (typeof item.capacity !== "number" || item.capacity <= 0) {
		return res
			.status(400)
			.json({ error: "Capacity must be a positive number" });
	}

	next();
};



// User registration endpoint
app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const data = await readData(DATA_FILES.users);
        
        // Check if user already exists
        if (data.users.some(user => user.email === email)) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: Math.floor(Date.now() / 1000),
            name,
            email,
            password: hashedPassword
        };

        data.users.push(newUser);
        await writeData(DATA_FILES.users, data);

        // Create token
        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User login endpoint
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const data = await readData(DATA_FILES.users);
        const user = data.users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Create token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};

// Protected route example
app.get("/auth/profile", authenticateToken, async (req, res) => {
    try {
        const data = await readData(DATA_FILES.users);
        const user = data.users.find(u => u.id === req.user.id);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Protected route to get all users
app.get("/auth/users", authenticateToken, async (req, res) => {
    try {
        const data = await readData(DATA_FILES.users);
        // Remove password field from each user for security
        const sanitizedUsers = data.users.map(({ password, ...user }) => user);
        res.json(sanitizedUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Generic function for retrieving all items
app.get("/:type", async (req, res) => {
	const { type } = req.params;
	if (!DATA_FILES[type])
		return res.status(400).json({ error: "Invalid resource type" });

	try {
		const data = await readData(DATA_FILES[type]);
		res.json(data[type]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Generic function for retrieving a single item by ID
app.get("/:type/:id", async (req, res) => {
	const { type, id } = req.params;
	if (!DATA_FILES[type])
		return res.status(400).json({ error: "Invalid resource type" });

	try {
		const data = await readData(DATA_FILES[type]);
		const item = data[type].find(
			(item) => Number(item.id) === Number.parseInt(id),
		);
		if (!item)
			return res.status(404).json({ error: `${type.slice(0, -1)} not found` });

		res.json(item);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Generic function for creating a new item
app.post("/:type", validateItem, async (req, res) => {
	const { type } = req.params;
	if (!DATA_FILES[type])
		return res.status(400).json({ error: "Invalid resource type" });

	try {
		const data = await readData(DATA_FILES[type]);
		const newItem = { id: Math.floor(Date.now() / 1000), ...req.body };
		data[type].push(newItem);

		await writeData(DATA_FILES[type], data);
		res.status(201).json(newItem);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Generic function for updating an item by ID
app.put("/:type/:id", validateItem, async (req, res) => {
	const { type, id } = req.params;
	if (!DATA_FILES[type])
		return res.status(400).json({ error: "Invalid resource type" });

	try {
		const data = await readData(DATA_FILES[type]);
		const index = data[type].findIndex(
			(item) => Number(item.id) === Number.parseInt(id),
		);

		if (index === -1)
			return res.status(404).json({ error: `${type.slice(0, -1)} not found` });

		data[type][index] = { ...data[type][index], ...req.body };

		await writeData(DATA_FILES[type], data);
		res.json(data[type][index]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Generic function for deleting an item by ID
app.delete("/:type/:id", async (req, res) => {
	const { type, id } = req.params;
	if (!DATA_FILES[type])
		return res.status(400).json({ error: "Invalid resource type" });

	try {
		const data = await readData(DATA_FILES[type]);
		const index = data[type].findIndex(
			(item) => Number(item.id) === Number.parseInt(id),
		);

		if (index === -1)
			return res.status(404).json({ error: `${type.slice(0, -1)} not found` });

		data[type].splice(index, 1);

		await writeData(DATA_FILES[type], data);
		res.json({ message: `${type.slice(0, -1)} deleted successfully` });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// 404 Handler
app.use((req, res) => {
	res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
