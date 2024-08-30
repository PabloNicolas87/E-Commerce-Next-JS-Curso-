import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUniqueCategories } from '../utils/firebaseHelpers';

const MenuList = ({ open, handleClose }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const uniqueCategories = await getUniqueCategories();
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  return (
    <div
      className={`${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      } transition-opacity z-40 fixed inset-0 bg-black/50 flex justify-end`}
    >
      <aside
        className={`${
          open ? 'translate-x-0' : 'translate-x-full'
        } transition-transform w-48 bg-zinc-800`}
      >
        <div onClick={handleClose} className='font-bold text-right p-4 cursor-pointer'>
          x
        </div>
        <nav className='flex flex-col mt-4 gap-3 px-3'>
          <Link  
            href="/products/all" 
            className='font-bold p-2' 
            onClick={(e) => {e.stopPropagation(); handleClose();}}>
            Productos
          </Link>
          <div className='relative'>
            <button 
              className='font-bold p-2' 
              onClick={(e) => {e.stopPropagation(); setDropdownOpen(!dropdownOpen);}}>
              Categorías
            </button>
            {dropdownOpen && (
              <ul className='absolute bg-zinc-600 text-black mt-2 w-full shadow-lg'>
                {categories.map((category, index) => (
                  <li key={index} className='p-2 hover:bg-zinc-800 hover:text-white'>
                    <Link 
                      href={`/products/${category.toLowerCase().replace(/ /g, '-')}`} 
                      className='block' 
                      onClick={(e) => {e.stopPropagation(); handleClose(); setDropdownOpen(false);}}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default MenuList;
