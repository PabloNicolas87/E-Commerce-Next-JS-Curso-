'use client';
import React, { useState, useEffect, useRef } from 'react';
import MenuList from './MenuList';
import Link from 'next/link';
import { CiUser, CiShoppingCart, CiMenuBurger } from "react-icons/ci";
import { useAuthContext } from '../context/authContext';
import { useRouter } from 'next/navigation';

const Menu = () => {
  const { user, logOutUser } = useAuthContext();
  const [openMenuList, setOpenMenuList] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleOpenMenuList = () => setOpenMenuList(true);
  const handleCloseMenuList = () => setOpenMenuList(false);
  const handleUserDropdown = () => setOpenUserDropdown(prev => !prev);

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

  return (
    <div>
      <div className='flex relative'>
        <div className="relative">
          {user.logged ? (
            <>
              <CiUser
                size={40}
                color="white"
                className="cursor-pointer"
                onClick={handleUserDropdown}
              />
              {openUserDropdown && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                  <Link href="/user" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpenUserDropdown(false)}>
                    Mi Perfil
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpenUserDropdown(false)}>
                      Mi Tablero
                    </Link>
                  )}
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setOpenUserDropdown(false)}>
                    Mis Compras
                  </Link>
                  <button
                    onClick={async () => {
                      try {
                        await logOutUser();
                        setOpenUserDropdown(false);
                        router.push('/login/PageLogin');
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
            <Link href="/login/PageLogin" className="block px-4 py-3 text-sm text-white" onClick={() => setOpenUserDropdown(false)}>
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
