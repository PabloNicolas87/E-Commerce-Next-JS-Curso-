import React from 'react';
import { FaBoxOpen, FaTags } from 'react-icons/fa';
import AdminCard from '../components/AdminCard';

export const metadata = {
  title: 'E-commerce | Mi Panel Admin',
  description: 'Este es mi Panel de Admin',
  keywords: ['panel', 'admin', 'e-commerce']
}

const AdminPage = () => {
  return (
    <main className='container my-10 mx-auto flex-grow'>
      <AdminCard name="Categorías" icon={<FaTags />} path="/admin/categories" />
      <AdminCard name="Productos" icon={<FaBoxOpen />} path="/admin/products" />
    </main>
  );
}

export default AdminPage;
