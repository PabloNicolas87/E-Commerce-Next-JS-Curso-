import { getProductById } from '@/app/utils/firebaseHelpers';
import React from 'react';
import CreateForm from '@/app/components/admin/CreateForm';
import Link from 'next/link';
import Button from '@/app/components/Button';

const CreateProductPage = async ({ params }) => {
  const { id } = params;

  const product = await getProductById(id);

  return (
    <main className='container my-10 mx-auto flex-grow'>
    <CreateForm product={product} />
    <Link href="/admin/products" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
      <Button className='p-3'>Volver</Button>
    </Link>
  </main>
  );
};

export default CreateProductPage;
