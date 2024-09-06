import React from 'react'
import ProductsTable from '../components/admin/ProductsTable'

const AdminPage = () => {
  return (
    <main className='container my-10 mx-auto flex-grow'>
        <ProductsTable></ProductsTable>
    </main>
  )
}

export default AdminPage