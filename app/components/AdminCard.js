'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Para redirigir al hacer clic

const AdminCard = ({ name, icon, path }) => {
  const router = useRouter();

  // Manejar el click y redirigir a la ruta especificada
  const handleClick = () => {
    router.push(path);
  };

  return (
    <div 
      onClick={handleClick} 
      className="cursor-pointer bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-100 transition-all duration-300 my-5"
    >
      {/* Icono pasado por props */}
      <div className="text-4xl text-cyan-500">
        {icon}
      </div>
      <span className="text-xl font-semibold text-gray-700">{name}</span>
    </div>
  );
};

export default AdminCard;
