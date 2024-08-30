'use client'
import React, { useState } from 'react';
import MenuList from './MenuList';
import Image from 'next/image';
import Link from 'next/link';
import { CiUser, CiShoppingCart, CiMenuBurger } from "react-icons/ci";




const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className='flex'>
        <Link href="/user">
            <CiUser size={40} color="white"/>
        </Link>

        <Link href="/cart">
            <CiShoppingCart size={40} color="white"/>
        </Link>

        <CiMenuBurger size={40} color="white" className="cursor-pointer mx-8" onClick={handleOpen} />
  
      </div>
      

      <MenuList handleClose={handleClose} open={open} />
    </div>
  );
};

export default Menu;
