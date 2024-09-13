import CreateForm from '@/app/components/admin/CreateForm'
import React from 'react'
import Link from 'next/link';
import Button from '@/app/components/Button';

const CreateProductPage = () => {
  return (
    <main className='container my-10 mx-auto flex-grow'>
      <CreateForm />
      <Link href="/admin/products" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
        <Button className='p-3'>Volver</Button>
      </Link>
    </main>
  )
}

export default CreateProductPage