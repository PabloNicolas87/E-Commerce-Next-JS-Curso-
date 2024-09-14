'use client';
import React from 'react';
import { deleteCategoryByName } from '@/app/utils/firebaseHelpers';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CategoriesBtnDelete = ({ name, onDelete }) => {
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás la categoría "${name}". Esto no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCategoryByName(name);
        onDelete(name);
        Swal.fire('Eliminado', `La categoría "${name}" ha sido eliminada.`, 'success');
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al eliminar la categoría.', 'error');
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      <FaTrashAlt />
    </button>
  );
};

export default CategoriesBtnDelete;
