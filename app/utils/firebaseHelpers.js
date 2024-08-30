// utils/firebaseHelpers.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

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
