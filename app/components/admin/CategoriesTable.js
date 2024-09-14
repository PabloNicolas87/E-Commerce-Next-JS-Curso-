'use client';
import React, { useState, useEffect } from 'react';
import { getCategories } from '@/app/utils/firebaseHelpers';
import DeleteCategoryBtn from './DeleteCategoryBtn';
import Link from 'next/link';

// Función para capitalizar la primera letra de una cadena
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const categoriesFromFirestore = await getCategories();
      setCategories(categoriesFromFirestore);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleDelete = async (name) => {
    setCategories(categories.filter((category) => category !== name));
  };

  if (loading) {
    return <p>Cargando categorías...</p>;
  }

  return (
    <div className="overflow-x-auto my-8">
      <div className="space-x-2 flex justify-end">
        <Link
          href="categories/create"
          className="bg-cyan-500 py-2 px-2 lg:px-6 sm:px-10 rounded-md text-white shadow-md flex items-center justify-center"
        >
          Añadir Categoría
        </Link>
      </div>
      <h2 className="text-2xl font-semibold my-4">Categorías</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-4">{capitalizeFirstLetter(category)}</td>
                <td className="py-3 px-4 text-center">
                  <DeleteCategoryBtn name={category} onDelete={handleDelete} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No hay categorías disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
