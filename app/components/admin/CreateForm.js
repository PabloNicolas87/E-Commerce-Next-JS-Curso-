"use client";
import { useState } from "react";
import { uploadImages, createProduct } from "@/app/utils/firebaseHelpers";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const CreateForm = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    inStock: 100,
    price: 0,
    category: "",
    images: [], // Usamos un array para múltiples imágenes
  });

  const [files, setFiles] = useState([]); // Para almacenar las imágenes seleccionadas
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el estado del botón de envío

  // Función de alerta de éxito
  const showSuccessAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      iconColor: "#457b9d",
      title: "Product created!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Maneja la selección de archivos
  const handleImageChange = (e) => {
    setFiles(Array.from(e.target.files)); // Almacena los archivos en el estado `files`
  };

  // Maneja la creación del producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.title.length > 20) {
      Swal.fire({
        icon: "warning",
        title: "Name Limit Exceeded",
        text: "The name cannot exceed 20 characters.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    setIsSubmitting(true); // Desactiva el botón de envío mientras se realiza la operación

    const productId = uuidv4(); // Generar un ID único para el producto

    try {
      // Subir imágenes a Firebase Storage
      const imageUrls = await uploadImages(productId, files);
      
      // Crear el producto en Firestore con las URLs de las imágenes
      await createProduct(productId, { ...values, images: imageUrls });

      // Mostrar alerta de éxito
      showSuccessAlert();

      // Resetear el formulario y estado después de crear el producto
      setValues({
        title: "",
        description: "",
        inStock: 100,
        price: 0,
        category: "",
        images: [],
      });
      setFiles([]); // Limpiar los archivos seleccionados
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error creating the product. Please try again.",
      });
    } finally {
      setIsSubmitting(false); // Reactivar el botón de envío
    }
  };

  return (
    <div className="my-16 p-8 mx-3 sm:mx-20 lg:mx-40 xl:mx-52 2xl:mx-96 select-none bg-white rounded">
      <h2 className="text-cyan font-semibold text-2xl pb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="px-20">
        <label className="text-black">Name: </label>
        <input
          type="text"
          value={values.title}
          required
          className="p-2 rounded w-full border border-cyan block mb-4"
          name="title"
          onChange={handleChange}
        />

        <label className="text-black">Images: </label>
        <input
          type="file"
          required
          className="p-2 rounded w-full border border-cyan block mb-4"
          name="images"
          multiple
          onChange={handleImageChange}
        />

        <label className="text-black">Category: </label>
        <select
          className="p-2 rounded w-full border border-cyan block mb-4"
          name="category"
          required
          onChange={handleChange}
          value={values.category}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="monitors">Monitors</option>
          <option value="keyboards">Keyboards</option>
          <option value="mouses">Mouses</option>
        </select>

        <label className="text-black">Price: </label>
        <input
          type="number"
          value={values.price}
          required
          className="p-2 rounded w-full border border-cyan block mb-4"
          name="price"
          onChange={handleChange}
        />

        <label className="text-black">Stock: </label>
        <input
          type="number"
          value={values.inStock}
          required
          className="p-2 rounded w-full border border-cyan block mb-4"
          name="inStock"
          onChange={handleChange}
        />

        <label className="text-black">Description: </label>
        <input
          type="text"
          value={values.description}
          required
          className="resize-none h-24 p-2 rounded w-full border border-cyan block mb-4"
          name="description"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-cyan-500 rounded-md py-3 px-6 sm:px-10 text-white shadow-md"
          disabled={isSubmitting} // Desactiva el botón mientras se está procesando
        >
          {isSubmitting ? "Creating..." : "Create"} {/* Cambia el texto durante la creación */}
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
