import { doc, collection, getDocs, query, where, setDoc, updateDoc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "@/app/config/firebase";

// Filtrar Productos por Categorias
export async function getProductsByCategory(category) {
  try {
    const productRef = collection(db, "products");
    let productQuery;
    const normalizedCategory = category.replace(/\s+/g, '-').toLowerCase();

    if (normalizedCategory === 'all') {
      productQuery = query(productRef);
    } else {
      productQuery = query(productRef, where('category', '==', normalizedCategory));
    }

    const querySnap = await getDocs(productQuery);
    const docs = querySnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return docs;
  } catch (error) {
    console.error("Error en la búsqueda de productos:", error);
    return [];
  }
}

//-----------------------------------------------------------------------//

// Guarda imágenes de Producto en Storage
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

//Crear Producto
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

// Leer Producto
export const getProductById = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return productSnap.data();
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};

// Actualizar Producto
export const updateProduct = async (id, values) => {
  const price = parseFloat(values.price);
  const inStock = parseInt(values.inStock);
  const docRef = doc(db, "products", id);

  return updateDoc(docRef, {
    ...values,
    price,
    inStock,
    images: values.images,
  });
};

//-----------------------------------------------------------------------//

// Leer Categorías
export const getCategories = async () => {
  const categoriesCollection = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesCollection);
  return categoriesSnapshot.docs.map(doc => doc.data().name);
};


// Crear Categorías
export const createCategory = async (name) => {
  try {
    const categoriesCollection = collection(db, "categories");
    const normalizedCategory = name.replace(/\s+/g, '-').toLowerCase();
    const docRef = await addDoc(categoriesCollection, { name: normalizedCategory });
    return docRef;
  } catch (error) {
    console.error("Error al agregar la categoría:", error);
    throw error;
  }
};


// Eliminar Categorías
export const deleteCategoryByName = async (name) => {
  try {
    const categoriesCollection = collection(db, "categories");
    const q = query(categoriesCollection, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const categoryDoc = querySnapshot.docs[0].ref; 
      await deleteDoc(categoryDoc); 
    }
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    throw error;
  }
};
