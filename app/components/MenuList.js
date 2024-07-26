import React from 'react';

const MenuList = ({ open, handleClose }) => {
  return (
    <div
      className={`${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      } transition-opacity fixed inset-0 bg-black/50 flex justify-end`}
    >
      <aside
        className={`${
          open ? 'translate-x-0' : 'translate-x-full'
        } transition-transform w-48 bg-gray-500`}
      >
        <div onClick={handleClose} className='text-white text-right p-4 cursor-pointer'>
          x
        </div>
        <nav className='flex flex-col mt-4 gap-3 px-3'>
          <a href="#" className='text-white p-2'>
            Enlace 1
          </a>
          <a href="#" className='text-white p-2'>
            Enlace 2
          </a>
          <a href="#" className='text-white p-2'>
            Enlace 3
          </a>
        </nav>
      </aside>
    </div>
  );
};

export default MenuList;
