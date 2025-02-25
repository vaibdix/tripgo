import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Home from '../features/home/Home';
import Tours from '../features/tours/Tours';
import About from '../pages/about/About';
import SignIn from '../features/auth/signin/SignIn';
import SignUp from '../features/auth/signup/SignUp';
import Contact from '../features/contact/Contact';

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
      //   {
      //     path: '/product/:id',
      //     element: <Product />,
      //   },
    ],
  },
]);
