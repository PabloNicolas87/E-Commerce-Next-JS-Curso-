'use client'
import mockData from '@/data/mockData'
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';

// Obtiene categorías únicas de los datos
function getUniqueCategories(data) {
    const categories = data.map(item => item.category);
    return [...new Set(categories)];
}

const NavigationMenu = ({ ulClassName }) => {
    const categories = getUniqueCategories(mockData);
    const path = usePathname();
    
    return (
        <div className='bg-red-400'>
            <ul className={`${ulClassName}`}>
                {categories.map((category, index) => (
                    <li key={index} className={`text-black font-bold py-4 px-2 ${path === '/products/' + category.toLowerCase() ? 'bg-red-600' : 'no-underline'}`}>
                        <Link href={`/products/${category.toLowerCase()}`}>{category}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavigationMenu;
