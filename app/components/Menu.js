'use client'
import React, { useState } from 'react';
import MenuList from './MenuList';
import Image from 'next/image';
import Link from 'next/link';

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className='flex'>
        <Link href="/user">
          <Image src='/user.png' alt='user-logo' className="cursor-pointer mx-1" height={40} width={40} />
        </Link>
        <Link href="/cart">
          <Image src='/cart.png' alt='cart-logo' className="cursor-pointer mx-1" height={40} width={40} />
        </Link>
        <Image src='/hamb.webp' alt='menu-logo' className="cursor-pointer mx-8" height={40} width={40} onClick={handleOpen} />  
      </div>
      

      <MenuList handleClose={handleClose} open={open} />
    </div>
  );
};

export default Menu;
