'use client';
import React, { useState } from 'react';
import { deleteUser } from '@/app/utils/firebaseHelpers'; 
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UsersBtnDelete = ({ uid, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteUser(uid);
      onDelete(uid); // Actualiza el estado en el componente padre
      Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      <FaTrashAlt />
    </button>
  );
};


export default UsersBtnDelete;
