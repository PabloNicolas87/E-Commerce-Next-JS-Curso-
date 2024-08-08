'use client'
import mockData from '@/data/mockData'
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';

function getUniqueCategories(data) {
    const categories = data.map(item => item.category);
    return [...new Set(categories)];
}

const NavigationMenu = ({ ulClassName }) => {
    const categories = getUniqueCategories(mockData);
    const path = usePathname();
    const normalizedPath = path.replace('/products/', '').toLowerCase();

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

