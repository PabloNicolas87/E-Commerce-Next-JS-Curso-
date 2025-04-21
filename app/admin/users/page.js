import React from 'react'
import Link from 'next/link';
import Button from '@/app/components/Button';
import UsersTable from '@/app/components/admin/UsersTable';

const VerUsers = () => {
  return (
    <main className='container my-10 mx-auto flex-grow'>
        <UsersTable></UsersTable>
        <Link href="/admin" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
          <Button className='p-3'>Volver</Button>
        </Link>
    </main>
  )
}

export default VerUsers