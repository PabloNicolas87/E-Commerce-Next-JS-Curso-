'use client';
import React, { useState, useEffect } from 'react';
import { getBanners } from '@/app/utils/firebaseHelpers';
import SimpleSpinner from '../spinner/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import BannersBtnDelete from './BannersBtnDelete';

const BannersTable = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);

      try {
        const bannerURLs = await getBanners();
        setBanners(bannerURLs);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleDelete = (url) => {
    setBanners(banners.filter((banner) => banner !== url));
  };

  if (loading) {
    return <SimpleSpinner />;
  }

  return (
    <div className="overflow-x-auto my-8">
      <div className="space-x-2 flex justify-end">
        <Link
          href="categories/create"
          className="bg-cyan-500 py-2 px-2 lg:px-6 sm:px-10 rounded-md text-white shadow-md flex items-center justify-center"
        >
          Añadir Banner
        </Link>
      </div>
      <h2 className="text-2xl font-semibold my-4">Banners List</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((bannerURL, index) => (
            <tr key={index} className="border-t">
              <td className="py-3 px-4">
                <Image 
                  src={bannerURL} 
                  alt={`Banner ${index}`} 
                  width={200} 
                  height={100}
                  layout="intrinsic"
                  priority
                />
              </td>
              <td className="py-3 px-4 text-center">
                <BannersBtnDelete bannerUrl={bannerURL} onDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannersTable;

