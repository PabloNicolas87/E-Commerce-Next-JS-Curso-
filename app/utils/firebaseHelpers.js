import { doc, collection, getDocs, query, where, setDoc, updateDoc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "@/app/config/firebase";

export async function getUniqueCategories() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const categoriesList = querySnapshot.docs.map(doc => doc.data().category);
    const uniqueCategories = [...new Set(categoriesList)];
    return uniqueCategories;
  } catch (error) {
    console.error("Error en la búsqueda de categorías: ", error);
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
    console.error("Error en la búsqueda de productos:", error);
    return [];
  }
}


//-----------------------------------------------------------------------

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

// Obtengo un producto por su ID
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

// Actualización de producto
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


// Obtener todas las categorías desde Firestore
export const getCategories = async () => {
  const categoriesCollection = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesCollection);
  return categoriesSnapshot.docs.map(doc => doc.data().name);
};


// Crear una nueva categoría 
export const createCategory = async (name) => {
  try {
    const categoriesCollection = collection(db, "categories");
    const docRef = await addDoc(categoriesCollection, { name });
    return docRef;
  } catch (error) {
    console.error("Error al agregar la categoría:", error);
    throw error;
  }
};

// Eliminar Categorias
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
