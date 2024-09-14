import React from 'react'
import Link from 'next/link';
import Button from '@/app/components/Button';
import CategoriesCreateForm from '@/app/components/admin/CategoriesCreateForm';

const CreateCategoryPage = () => {
  return (
    <main className='container my-10 mx-auto flex-grow'>
      <CategoriesCreateForm />
      <Link href="/admin/categories" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
        <Button className='p-3'>Volver</Button>
      </Link>
    </main>
  )
}

export default CreateCategoryPage