import React from 'react'
import Link from 'next/link'
import Button from '@/app/components/Button'
import BannersTable from '@/app/components/admin/BannersTable'

const ListBanners = () => {
    return (
        <main className='container my-10 mx-auto flex-grow'>
          <BannersTable></BannersTable>
          <Link href="/admin/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
            <Button className='p-3'>Volver</Button>
          </Link>
        </main>
      )
}

export default ListBanners