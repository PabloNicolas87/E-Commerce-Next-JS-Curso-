import React from 'react';
import ProductList from '@/app/components/ProductList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/config/firebase';

const getProducts = async (category) => {
  try {
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
    <main className="flex-grow p-3">
      <h1>Página de Productos {category}</h1>
      <ProductList 
        category={category}
        products={products || []}
      />
    </main> 
  );
};

export default Products;
