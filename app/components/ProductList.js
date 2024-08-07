import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({data, category}) => {
  return (
    <div className='flex flex-wrap justify-center items-center'>
        {
            data.map((product, index) =>
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    category={product.category}
                    price={product.price}
                />
            )
        }
    </div>
  )
}

export default ProductList