import React from 'react';
import Menu from './Menu';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='w-full bg-zinc-800'>
      <div className='container m-auto py-1 flex justify-between items-center'>
        <Link href="/" className='cursor-pointer'>
          <Image src='/logo.webp' alt='logo' height={100} width={100} priority  />
        </Link>
        
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
