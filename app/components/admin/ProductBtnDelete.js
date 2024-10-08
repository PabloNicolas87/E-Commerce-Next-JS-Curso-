"use client";
import { db } from "@/app/config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const ProductBtnDelete = ({ id, onDelete }) => {
  const storage = getStorage();

  const deleteProductImages = async (productId) => {
    const folderRef = ref(storage, `product-images/${productId}`);
    try {
      const fileList = await listAll(folderRef);
      const deletionPromises = fileList.items.map((fileRef) => deleteObject(fileRef));
      await Promise.all(deletionPromises);
    } catch (error) {
      console.error("Error eliminando imágenes:", error);
    }
  };

  const deleteProduct = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Deseas eliminar el producto?",
      text: "Una vez eliminado, no podrás volver atrás.",
      confirmButtonText: "Borrar",
      confirmButtonColor: "#d90429",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "¡Producto Borrado!",
          text: "El producto ha sido borrado exitosamente.",
          iconColor: "#457b9d",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        try {
          await deleteDoc(doc(db, "products", id));
          await deleteProductImages(id);
          if (onDelete) {
            onDelete(id);
          }
        } catch (error) {
          console.error("Error borrando producto:", error);
        }
      }
    });
  };

  return (
    <button onClick={deleteProduct} className="text-red-500 hover:text-red-700">
      <FiTrash2 className="text-red text-xl" />
    </button>
  );
};

export default ProductBtnDelete;
