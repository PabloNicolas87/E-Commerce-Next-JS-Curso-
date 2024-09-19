'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import MenuList from './MenuList';
import Link from 'next/link';
import { CiShoppingCart, CiMenuBurger } from "react-icons/ci";
import { useAuthContext } from '../context/authContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Menu = () => {
  const { user, logOutUser } = useAuthContext();
  const [openMenuList, setOpenMenuList] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleOpenMenuList = useCallback(() => setOpenMenuList(true), []);
  const handleCloseMenuList = useCallback(() => setOpenMenuList(false), []);
  const handleUserDropdown = useCallback(() => setOpenUserDropdown(prev => !prev), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("User state has changed:", user);
  }, [user]); // Log when user state changes

  return (
    <div>
      <div className='flex relative'>
        <div className="relative">
          {user.logged ? (
            <>  
              <Image 
                    src={user.photoURL}
                    alt={"Foto de Perfil"} 
                    width={40} 
                    height={40}
                    layout="intrinsic"
                    priority
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                    onClick={handleUserDropdown}
                />
              {openUserDropdown && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                  <Link href="/user" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpenUserDropdown(false)}>
                    Mi Perfil
                  </Link>
                  {user.role === 'admin' ? null : (
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpenUserDropdown(false)}>
                      Mis Compras
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpenUserDropdown(false)}>
                      Mi Tablero
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      try {
                        await logOutUser();
                        setOpenUserDropdown(false);
                        router.push('/login');
                      } catch (error) {
                        console.error('Error al cerrar sesión:', error);
                      }
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/login" className="block px-4 py-3 text-sm text-white" onClick={() => setOpenUserDropdown(false)}>
              Iniciar Sesión
            </Link>
          )}
        </div>

        <Link href="/cart">
          <CiShoppingCart size={40} color="white" />
        </Link>

        <CiMenuBurger
          size={40}
          color="white"
          className="cursor-pointer ms-8"
          onClick={handleOpenMenuList}
        />
      </div>
      <MenuList handleClose={handleCloseMenuList} open={openMenuList} />
    </div>
  );
};

export default Menu;

