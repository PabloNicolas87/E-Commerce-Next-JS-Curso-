'use client';
import React from 'react';
import { deleteBanner } from '@/app/utils/firebaseHelpers'; // Importa la función para eliminar banners
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const BannersBtnDelete = ({ bannerUrl, onDelete }) => {
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás este banner. Esto no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteBanner(bannerUrl); // Llamar a la función para eliminar el banner
        onDelete(bannerUrl); // Actualiza el estado en el componente padre para eliminar la URL
        Swal.fire('Eliminado', 'El banner ha sido eliminado.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al eliminar el banner.', 'error');
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      <FaTrashAlt />
    </button>
  );
};

export default BannersBtnDelete;
