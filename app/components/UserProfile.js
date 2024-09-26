'use client';
import React, { useState } from 'react';
import { useAuthContext } from '../context/authContext';
import Image from 'next/image';
import EditProfile from '../user/editData/page';
import Button from './Button';
import ChangePasswordModal from '../user/editPass/page';


const UserProfile = () => {
    const { user, updateUser } = useAuthContext();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  
    if (!user || !user.logged) return null;
  
    const openEditModal = () => {
      setIsEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setIsEditModalOpen(false);
    };
  
    const openChangePasswordModal = () => {
      setIsChangePasswordOpen(true);
    };
  
    const closeChangePasswordModal = () => {
      setIsChangePasswordOpen(false);
    };
  
    return (
        <div className="overflow-x-auto my-8">
            <div className="flex justify-between items-center py-3">
                <h2 className="text-2xl font-semibold my-4">Perfil de Usuario</h2>
                <Image 
                    src={user.photoURL || "/default-avatar.png"} 
                    alt="Foto de Perfil" 
                    width={100} 
                    height={100}
                    layout="intrinsic"
                    priority
                    className="w-30 h-30 rounded-full object-cover border-2 border-gray-300"
                />
            </div>

            <table className="w-full bg-white shadow-md rounded-lg text-left">
                <tbody>
                    <tr>
                        <th className="py-3 px-4 text-right font-semibold">Nombre:</th>
                        <td className="py-3 px-4">{user.name}</td>
                    </tr>
                    <tr>
                        <th className="py-3 px-4 text-right font-semibold">Apellido:</th>
                        <td className="py-3 px-4">{user.surname}</td>
                    </tr>
                    <tr>
                        <th className="py-3 px-4 text-right font-semibold">UID:</th>
                        <td className="py-3 px-4">{user.uid}</td>
                    </tr>
                    <tr>
                        <th className="py-3 px-4 text-right font-semibold">Email:</th>
                        <td className="py-3 px-4">{user.email}</td>
                    </tr>
                    <tr>
                        <th className="py-3 px-4 text-right font-semibold">Rol:</th>
                        <td className="py-3 px-4">{user.role}</td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-6 text-center">
                <Button className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300 ml-4"
                onClick={openChangePasswordModal}
                >
                Cambiar Contraseña
                </Button>
                <Button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300" onClick={openEditModal}>Editar Perfil</Button>
            </div>

            {isEditModalOpen && (
        <EditProfile onClose={closeEditModal} updateUser={updateUser} />
      )}

      {isChangePasswordOpen && (
        <ChangePasswordModal onClose={closeChangePasswordModal} />
      )}
        </div>
    );
};

export default UserProfile;
