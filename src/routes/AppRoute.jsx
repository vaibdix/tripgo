import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Home from '../features/home/Home';
import Tours from '../features/tours/Tours';
import About from '../pages/about/About';
import SignIn from '../features/auth/signin/SignIn';
import SignUp from '../features/auth/signup/SignUp';
import Contact from '../features/contact/Contact';
import ProductDetail from '../features/tours/components/ProductDetail';
import WishlistPage from '../features/wishlist/pages/WishlistPage';
import Cart from '../features/cart/Cart';
import Checkout from '../features/checkout/Checkout';
import Dashboard from '../features/admin/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/tours',
        element: <Tours />,
      },
      {
        path: '/tours/:id',
        element: <ProductDetail />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/login',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/wishlist',
        element: <WishlistPage />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      //   {
      //     path: '/product/:id',
      //     element: <Product />,
      //   },
      // Add this to your routes array
      {
        path: '/checkout',
        element: <Checkout />,
      },
      // Add this to your routes array
      {
        path: '/admin',
        element: <Dashboard />,
      }
    ],
  },
  // Add a separate route configuration for admin
  {
    path: '/admin/*',
    element: <Dashboard />,
  }
]);
