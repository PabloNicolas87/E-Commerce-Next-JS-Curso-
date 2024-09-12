import { doc, collection, getDocs, query, where, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
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

// Carga de imagenes al storage
export const uploadImages = async (productId, files) => {
  const imageUrls = [];
  files.sort((a, b) => a.name.localeCompare(b.name));

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imageNumber = String(i + 1).padStart(2, "0");
    const imageName = `${productId}${imageNumber}`;

    const storageRef = ref(storage, `/product-images/${productId}/${imageName}`);
    const fileSnapshot = await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(fileSnapshot.ref);
    imageUrls.push(fileURL);
  }

  return imageUrls;
};

//Creacion de nuevo producto
export const createProduct = async (id, values) => {
  const price = parseFloat(values.price);
  const inStock = parseInt(values.inStock);

  const docRef = doc(db, "products", id);

  return setDoc(docRef, {
    ...values,
    id,
    price,
    inStock,
    images: values.images,
  });
};