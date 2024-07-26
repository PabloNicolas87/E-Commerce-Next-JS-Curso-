import React from 'react';
import Menu from './Menu';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='w-full bg-red-600'>
      <div className='container m-auto py-2 flex justify-between items-center'>
        <Image src='/logo.png' alt='logo' height={50} width={150} />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
