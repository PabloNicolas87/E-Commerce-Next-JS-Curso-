'use client';
import { useState, useEffect } from "react";
import { uploadImages, createProduct, updateProduct, getCategories } from "@/app/utils/firebaseHelpers";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from 'next/navigation';

const ProductCreateForm = ({ product }) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    inStock: 100,
    price: 0,
    category: "",
    images: [],
  });

  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesFromFirestore = await getCategories();
      setCategories(categoriesFromFirestore);
    };
    fetchCategories();

    if (product) {
      setValues({
        title: product.title || "",
        description: product.description || "",
        inStock: product.inStock || 100,
        price: product.price || 0,
        category: product.category || "",
        images: product.images || [],
      });
      setIsEditing(true);
    }
  }, [product]);

  const showSuccessAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      iconColor: "#457b9d",
      title: isEditing ? "Producto Actualizado!" : "Producto Creado!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      router.push('/admin/products');
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.title.length > 40) {
      Swal.fire({
        icon: "warning",
        title: "Limite excedido",
        text: "El nombre no puede exceder los 40 caracteres.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrls = values.images;
      if (files.length > 0) {
        imageUrls = await uploadImages(uuidv4(), files);
      }
      
      if (isEditing) {
        await updateProduct(product.id, { ...values, images: imageUrls });
      } else {
        const productId = uuidv4();
        await createProduct(productId, { ...values, images: imageUrls });
      }

      showSuccessAlert();

      setValues({
        title: "",
        description: "",
        inStock: 100,
        price: 0,
        category: "",
        images: [],
      });
      setFiles([]);
    } catch (error) {
      console.error("Error creando producto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al crear el producto. Intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-16 mx-3 select-none rounded">
      <h2 className="text-cyan font-semibold text-2xl pb-4">
        {isEditing ? "Editar Producto" : "Crear Producto"}
      </h2>
      <form onSubmit={handleSubmit} className="px-20">
        <label className="text-black">Nombre: </label>
        <input
          type="text"
          value={values.title}
          required
          className="p-2 rounded w-full border border-cyan block mb-4"
          name="title"
          onChange={handleChange}
        />

        <label className="text-black">Imagenes: </label>
        <input
          type="file"
          className="p-2 rounded w-full border border-cyan block mb-4"
          name="images"
          multiple
          onChange={handleImageChange}
        />

        <label className="text-black">Categoría: </label>
        <select
          className="p-2 rounded w-full border border-cyan block mb-4"
          name="category"
          required
          onChange={handleChange}
          value={values.category}
        >
          <option value="" disabled>
            Selecciona la Categoría
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label className="text-black">Precio: </label>
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

        <label className="text-black">Descripción: </label>
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
          disabled={isSubmitting}
        >
          {isSubmitting ? (isEditing ? "Actualizando..." : "Creando...") : (isEditing ? "Actualizar" : "Crear")}
        </button>
      </form>
    </div>
  );
};

export default ProductCreateForm;
