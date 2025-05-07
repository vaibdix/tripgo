const express = require("express");
const fs = require("node:fs").promises;
const path = require("node:path");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { SwaggerTheme } = require("swagger-themes");
const theme = new SwaggerTheme();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

const DATA_FILES = {
	users: path.join(__dirname, "./data/users.json"),
	tents: path.join(__dirname, "./data/tents.json"),
	cottages: path.join(__dirname, "./data/cottages.json"),
	farmhouses: path.join(__dirname, "./data/farmhouses.json"),
	hotels: path.join(__dirname, "./data/hotels.json"),
	homestays: path.join(__dirname, "./data/homestays.json"),
	treehouses: path.join(__dirname, "./data/treehouse.json"),
	villas: path.join(__dirname, "./data/villas.json"),
};

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const options = {
	explorer: true,
	customCss: theme.getBuffer("dracula"),
};

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, options),
);

const readData = async (filePath) => {
	try {
		const data = await fs.readFile(filePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		throw new Error("Error reading file");
	}
};

const writeData = async (filePath, data) => {
	try {
		await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
	} catch (err) {
		throw new Error("Error writing file");
	}
};

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

app.post("/auth/register", async (req, res) => {
	const { email, password, name, admin } = req.body;

	if (!email || !password || !name) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		const data = await readData(DATA_FILES.users);

		if (data.users.some((user) => user.email === email)) {
			return res.status(400).json({ error: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = {
			id: Math.floor(Date.now() / 1000),
			name,
			email,
			password: hashedPassword,
			admin: admin === true,
		};

		data.users.push(newUser);
		await writeData(DATA_FILES.users, data);

		const token = jwt.sign(
			{ id: newUser.id, admin: newUser.admin },
			JWT_SECRET,
			{ expiresIn: "24h" },
		);

		res.status(201).json({
			message: "User registered successfully",
			token,
			user: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				admin: newUser.admin,
			},
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
		const user = data.users.find((u) => u.email === email);

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user.id, admin: user.admin }, JWT_SECRET, {
			expiresIn: "24h",
		});

		res.json({
			message: "Login successful",
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				admin: user.admin,
			},
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

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

app.get("/auth/profile", authenticateToken, async (req, res) => {
	try {
		const data = await readData(DATA_FILES.users);
		const user = data.users.find((u) => u.id === req.user.id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json({
			id: user.id,
			name: user.name,
			email: user.email,
			admin: user.admin,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/auth/users", async (req, res) => {
	try {
		const data = await readData(DATA_FILES.users);
		// Remove password field from each user for security
		const sanitizedUsers = data.users.map(({ password, ...user }) => user);
		res.json(sanitizedUsers);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.put("/users/:id", async (req, res) => {
	const { id } = req.params;
	const { name, email, admin } = req.body;

	try {
		const data = await readData(DATA_FILES.users);
		const userIndex = data.users.findIndex((u) => u.id === Number(id));

		if (userIndex === -1) {
			return res.status(404).json({ error: "User not found" });
		}

		if (name) data.users[userIndex].name = name;
		if (email) {
			const emailExists = data.users.some(
				(u, i) => i !== userIndex && u.email === email,
			);
			if (emailExists) {
				return res.status(400).json({ error: "Email already in use" });
			}
			data.users[userIndex].email = email;
		}
		if (admin !== undefined) data.users[userIndex].admin = Boolean(admin);

		await writeData(DATA_FILES.users, data);

		const { password, ...updatedUser } = data.users[userIndex];
		res.json(updatedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.delete("/users/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const data = await readData(DATA_FILES.users);
		const userIndex = data.users.findIndex((u) => u.id === Number(id));

		if (userIndex === -1) {
			return res.status(404).json({ error: "User not found" });
		}

		data.users.splice(userIndex, 1);
		await writeData(DATA_FILES.users, data);

		res.json({ message: "User deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/users/all", async (req, res) => {
	try {
		const data = await readData(DATA_FILES.users);

		const sanitizedUsers = data.users.map(({ password, ...user }) => user);
		res.json(sanitizedUsers);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

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

app.use((req, res) => {
	res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
