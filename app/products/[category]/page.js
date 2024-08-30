import React from 'react';
import ProductList from '@/app/components/ProductList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/config/firebase';

const getProducts = async (category) => {
  try {
    const productRef = collection(db, "products");
    let productQuery;

    const upperCaseCategory = category.toUpperCase(); // Normaliza a mayúsculas si es necesario

    if (upperCaseCategory === 'ALL') {
      productQuery = query(productRef);
    } else {
      productQuery = query(productRef, where('category', '==', upperCaseCategory));
    }

    const querySnap = await getDocs(productQuery);
    const docs = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Incluye el id del documento

    return docs;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const Products = async ({ params }) => {
  const { category } = params;
  console.log('Category from params:', category); // Verifica el valor de category

  const products = await getProducts(category);
  console.log('Fetched Products:', products); // Verifica los productos obtenidos

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
