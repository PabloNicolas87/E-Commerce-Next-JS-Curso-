'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getUniqueCategories } from '../utils/firebaseHelpers';

const NavigationMenu = ({ ulClassName }) => {
  const [categories, setCategories] = useState([]);
  const path = usePathname();
  const normalizedPath = path.replace('/products/', '').toLowerCase();

  useEffect(() => {
    const fetchCategories = async () => {
      const uniqueCategories = await getUniqueCategories();
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  return (
    <div className='bg-zinc-600'>
      <ul className={`${ulClassName}`}>
        {categories.map((category, index) => {
          const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
          const isActive = normalizedPath === categorySlug;

          return (
            <li
              key={index}
              className={`font-bold py-4 px-2 ${isActive ? 'bg-zinc-800 text-white' : 'text-black'}`}
            >
              <Link href={`/products/${categorySlug}`}>{category}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavigationMenu;
