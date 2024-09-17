import React from 'react';
import { FaBoxOpen, FaTags, FaFileAlt, FaSlidersH, FaTasks } from 'react-icons/fa';
import AdminCard from '../components/AdminCard';

export const metadata = {
  title: 'E-commerce | Mi Panel Admin',
  description: 'Este es mi Panel de Admin',
  keywords: ['panel', 'admin', 'e-commerce']
}

const AdminPage = () => {
  return (
        <main className='container my-10 mx-auto flex-grow'>
            <AdminCard name="Ordenes Realizadas" icon={<FaTasks />} path="/admin/orders" />
            <AdminCard name="Categorías" icon={<FaTags />} path="/admin/categories" />
            <AdminCard name="Productos" icon={<FaBoxOpen />} path="/admin/products" />
            <AdminCard name="Banners" icon={<FaFileAlt />} path="/admin/banners" />
            <AdminCard name="Sliders" icon={<FaSlidersH />} path="/admin/sliders" />
        </main>    
  );
}

export default AdminPage;
