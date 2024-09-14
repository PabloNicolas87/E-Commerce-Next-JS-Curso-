'use client'
import React, { useState } from 'react';
import { createCategory } from '@/app/utils/firebaseHelpers';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; // Importa useRouter

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Inicializa useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categoryName.trim() === '') {
      Swal.fire('Error', 'El nombre de la categoría no puede estar vacío', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      await createCategory(categoryName);
      Swal.fire('Éxito', 'Categoría guardada correctamente', 'success').then(() => {
        router.push('/admin/categories');
      });
      setCategoryName('');
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al guardar la categoría', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-16 rounded">
      <h2 className="text-cyan font-semibold text-2xl pb-4">Agregar Categoría</h2>
      <form onSubmit={handleSubmit} className="px-20">
        <label className="text-black">Nombre de la Categoría: </label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="p-2 rounded w-full border border-cyan block mb-4"
          placeholder="Nombre de la categoría"
        />
        <button
          type="submit"
          className="bg-cyan-500 rounded-md py-3 px-6 sm:px-10 text-white shadow-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Categoría'}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
