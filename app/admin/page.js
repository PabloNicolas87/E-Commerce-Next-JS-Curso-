import React from 'react';
import { FaBoxOpen, FaTags, FaFileAlt, FaSlidersH, FaTasks, FaUser } from 'react-icons/fa';
import AdminCard from '../components/AdminCard';
import Link from 'next/link';
import Button from '../components/Button';

export const metadata = {
  title: 'E-commerce | Mi Panel Admin',
  description: 'Este es mi Panel de Admin',
  keywords: ['panel', 'admin', 'e-commerce']
}

const AdminPage = () => {
  return (
        <main className='container my-10 mx-auto flex-grow'>
            <AdminCard name="Usuarios" icon={<FaUser />} path="/admin/users" />
            <AdminCard name="Ordenes Realizadas" icon={<FaTasks />} path="/admin/orders" />
            <AdminCard name="Categorías" icon={<FaTags />} path="/admin/categories" />
            <AdminCard name="Productos" icon={<FaBoxOpen />} path="/admin/products" />
            <AdminCard name="Banners" icon={<FaFileAlt />} path="/admin/banners" />
            <AdminCard name="Sliders" icon={<FaSlidersH />} path="/admin/sliders" />
            <Link href="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
                <Button className='p-3'>Salir</Button>
            </Link>
        </main>    
  );
}

export default AdminPage;
