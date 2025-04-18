import AdminRoute from "../components/AdminRoute";
import MainLayout from "../components/MainLayout";
import Dashboard from "../features/admin/Dashboard";
import SignIn from "../features/auth/signin/SignIn";
import SignUp from "../features/auth/signup/SignUp";
import Cart from "../features/cart/Cart";
import Checkout from "../features/checkout/Checkout";
import Collection from "../features/collection/Collection";
import Contact from "../features/contact/Contact";
import Home from "../features/home/Home";
import Tours from "../features/tours/Tours";
import ProductDetail from "../features/tours/components/ProductDetail";
import WishlistPage from "../features/wishlist/pages/WishlistPage";
import About from "../pages/about/About";
import { createBrowserRouter, Navigate } from "react-router-dom";

// We'll create this component

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/tours",
				element: <Tours />,
			},
			{
				path: "/tours/:id",
				element: <ProductDetail />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/collection",
				element: <Collection />,
			},
			{
				path: "/login",
				element: <SignIn />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/wishlist",
				element: <WishlistPage />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			// Protected checkout route
			{
				path: "/checkout",
				element: <Checkout />,
			},

			// Remove the admin route from MainLayout
		],
	},
	// Move all admin routes outside of MainLayout
	{
		path: "/admin",
		element: (
			<AdminRoute>
				<Dashboard />
			</AdminRoute>
		),
	},
	{
		path: "/admin/*",
		element: (
			<AdminRoute>
				<Dashboard />
			</AdminRoute>
		),
	},
]);
