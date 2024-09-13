import React, { Suspense } from 'react';
import ProductList from '@/app/components/ProductList';
import Link from 'next/link';
import { getProductsByCategory } from '@/app/utils/firebaseHelpers';
import SimpleSpinner from '@/app/components/spinner/Spinner';

const ProductsPage = async ({ params }) => {
  const { category } = params;

  const products = await getProductsByCategory(category);

  return (
    <Suspense fallback={<SimpleSpinner />}>
      <main className="container mx-auto flex-grow my-10">
        <h1>
          Página de 
          <Link className="font-semibold" href="/products/all"> Productos</Link>
          {category !== 'all' && (
            <> 
              {' / '}
              <Link className="font-semibold capitalize" href={`/products/${category}`}>{category}</Link>
            </>
          )}
        </h1>
        <ProductList 
          category={category}
          products={products || []}
        />
      </main>
    </Suspense>
  );
};

export default ProductsPage;
