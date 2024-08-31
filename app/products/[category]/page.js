import React from 'react';
import ProductList from '@/app/components/ProductList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/config/firebase';
import Link from 'next/link';

const getProducts = async (category) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const productRef = collection(db, "products");
    let productQuery;

    const lowerCaseCategory = category.toLowerCase();

    if (lowerCaseCategory === 'all') {
      productQuery = query(productRef);
    } else {
      productQuery = query(productRef, where('category', '==', lowerCaseCategory));
    }

    const querySnap = await getDocs(productQuery);
    const docs = querySnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return docs;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};




const Products = async ({ params }) => {
  const { category } = params;

  const products = await getProducts(category);

  return (
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
  );
};

export default Products;
