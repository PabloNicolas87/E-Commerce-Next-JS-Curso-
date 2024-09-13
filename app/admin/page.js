import React from 'react';
import { FaBoxOpen, FaTags } from 'react-icons/fa';
import AdminCard from '../components/AdminCard';

const AdminPage = () => {
  return (
    <main className='container my-10 mx-auto flex-grow'>
      <AdminCard name="Categorías" icon={<FaTags />} path="/admin/categories" />
      <AdminCard name="Productos" icon={<FaBoxOpen />} path="/admin/products" />
    </main>
  );
}

export default AdminPage;
