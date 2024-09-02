import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/config/firebase";

// Listado de categorías
export async function getUniqueCategories() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const categoriesList = querySnapshot.docs.map(doc => doc.data().category);
    const uniqueCategories = [...new Set(categoriesList)];
    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
}

// Producto por ID
export async function getProductById(id) {
  try {
    if (!id) return null;

    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return productSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Imágenes de producto por ID
export async function fetchProductImages(id) {
  try {
    const imagesRef = ref(storage, `product-images/${id}`);
    const { items } = await listAll(imagesRef);
    const urls = await Promise.all(items.map(item => getDownloadURL(item)));
    return urls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

// Productos por categoría filtrados
export async function getProductsByCategory(category) {
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
      id: doc.id,
      ...doc.data()
    }));

    return docs;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
