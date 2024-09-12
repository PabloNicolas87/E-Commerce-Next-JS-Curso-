"use client";
import { db } from "@/app/config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const DeleteProductBtn = ({ id }) => {
  const storage = getStorage();

  const deleteProductImages = async (productId) => {
    const folderRef = ref(storage, `product-images/${productId}`);
    try {
      const fileList = await listAll(folderRef);
      const deletionPromises = fileList.items.map((fileRef) => deleteObject(fileRef));
      console.log(`All images in folder 'product-images/${productId}' deleted successfully.`);
    } catch (error) {
      console.error("Error deleting product images:", error);
    }
  };

  const deleteProduct = () => {
    Swal.fire({
      icon: "warning",
      title: "Do you want to delete this product?",
      text: "Once deleted, you won't be able to recover this product.",
      confirmButtonText: "Delete",
      confirmButtonColor: "#d90429",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The product has been deleted successfully",
          iconColor: "#457b9d",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        try {
          await deleteDoc(doc(db, "products", id));
          await deleteProductImages(id);
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    });
  };

  return (
    <button onClick={deleteProduct}>
      <FiTrash2 className="text-red text-xl" />
    </button>
  );
};

export default DeleteProductBtn;
