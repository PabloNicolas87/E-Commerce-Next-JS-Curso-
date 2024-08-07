import React from 'react'
import ProductList from '../components/ProductList'
import mockData from '@/data/mockData'

const Products = () => {
  return (
    <main className="flex-grow p-3">
        <h1>Página de Productos</h1>
        <ProductList 
            category={'all'}
            data={mockData}
        />
    </main> 
  )
}

export default Products