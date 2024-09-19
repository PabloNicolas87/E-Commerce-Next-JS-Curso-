'use client'
import React from 'react';
import { useAuthContext } from '../context/authContext';
import Image from 'next/image';

const UserProfile = () => {
    const { user } = useAuthContext();

    if (!user || !user.logged) return null;

    return (
        <div className="overflow-x-auto my-8">
            <div className='flex justify-between items-center py-3'>
                <h2 className="text-2xl font-semibold my-4">Perfil de Usuario</h2>
                <Image 
                    src={user.photoURL || "/default-avatar.png"} 
                    alt={"Foto de Perfil"} 
                    width={100} 
                    height={100}
                    layout="intrinsic"
                    priority
                    className="w-30 h-30 rounded-full object-cover border-2 border-gray-300"
                />    
            </div>
            
            <table className="w-full bg-white shadow-md rounded-lg">
                <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="py-3 px-4 text-center">Nombre</th>
                    <th className="py-3 px-4 text-center">Apellido</th>
                    <th className="py-3 px-4 text-center">UID</th>
                    <th className="py-3 px-4 text-center">Email</th>
                    <th className="py-3 px-4 text-center">Rol</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.surname}</td>
                        <td className="py-3 px-4">{user.uid}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.role}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserProfile;
