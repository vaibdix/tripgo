// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from './layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
