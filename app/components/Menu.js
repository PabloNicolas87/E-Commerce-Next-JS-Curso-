'use client'
import React, { useState } from 'react';
import MenuList from './MenuList';
import Image from 'next/image';

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Image src='/hamb.webp' alt='menu-logo' height={40} width={40} onClick={handleOpen} />
      <MenuList handleClose={handleClose} open={open} />
    </div>
  );
};

export default Menu;
