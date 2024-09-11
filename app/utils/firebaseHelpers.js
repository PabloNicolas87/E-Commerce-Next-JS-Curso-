import { doc, getDoc, collection, getDocs, query, where, setDoc } from "firebase/firestore";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "@/app/config/firebase";
import { v4 as uuidv4 } from "uuid";

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






export const uploadImages = async (productId, files) => {
  const imageUrls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imageNumber = String(i + 1).padStart(2, "0"); // Genera "01", "02", "03", etc.
    const imageName = `${productId}${imageNumber}`; // Nombre de la imagen, ejemplo: id+01

    const storageRef = ref(storage, `/product-images/${productId}/${imageName}`); // Crear la referencia en Storage

    const fileSnapshot = await uploadBytes(storageRef, file); // Sube cada archivo
    const fileURL = await getDownloadURL(fileSnapshot.ref); // Obtiene la URL de cada imagen subida
    imageUrls.push(fileURL); // Agrega la URL al array de URLs
  }

  return imageUrls; // Devuelve las URLs de las imágenes
};

// Función para crear el producto en Firestore
export const createProduct = async (id, values) => {
  const price = parseFloat(values.price);
  const inStock = parseInt(values.inStock);

  const docRef = doc(db, "products", id); // Usamos el mismo ID para Firestore y Storage

  return setDoc(docRef, {
    ...values,
    id,
    price,
    inStock,
    images: values.images, // Guarda la lista de URLs de las imágenes
  });
};