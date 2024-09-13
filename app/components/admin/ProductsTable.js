"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import DeleteProductBtn from "./DeleteProductBtn";
import { getProductsByCategory } from "@/app/utils/firebaseHelpers";
import ProductImageCard from "../ProductImageCard";

const ProductsTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = await getProductsByCategory("all");
      setItems(products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="overflow-x-auto my-8">
      <div className="space-x-2 flex justify-end">
        <Link
          href="products/create"
          className="bg-cyan-500 py-2 px-2 lg:px-6 sm:px-10 rounded-md text-white shadow-md flex items-center justify-center"
        >
          Añadir Producto
        </Link>
        <Link
          href="products/orders"
          className="bg-cyan-500 py-2 px-2 lg:px-6 sm:px-10 rounded-md text-white shadow-md flex items-center justify-center"
        >
          Orders
        </Link>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Productos</h2>
      <table className="w-full mt-5 rounded-md bg-white text-xs lg:text-sm text-left text-gray ">
        <thead className="text-base text-gray uppercase ">
          <tr className="bg-gray-200 text-left">
            <th scope="col" className="py-3 px-4">
              Nombre
            </th>
            <th className="py-3 px-4 text-center">
              Precio
            </th>
            <th className="py-3 px-4 text-center">
              Stock
            </th>
            <th className="py-3 px-4 text-center">
              Tipo
            </th>
            <th className="py-3 px-4 text-center">
              Imágen
            </th>
            <th className="py-3 px-4 text-center">
              Id
            </th>
            <th className="py-3 px-4">
              Descripción
            </th>
            <th className="py-3 px-4 text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-4 truncate">{item.title}</td>
                <td className="py-3 px-4 text-center">$ {item.price}</td>
                <td className="py-3 px-4 text-center">{item.inStock}</td>
                <td className="py-3 px-4 text-center">{item.category}</td>
                <td className="py-3 px-4 text-center">
                  <ProductImageCard
                    imageUrls={item.images}
                    width={60}
                    height={60}
                  />
                </td>
                <td className="py-3 px-4 text-center">{item.id}</td>
                <td className="py-3 px-4 truncate max-w-prose">{item.description}</td>
                <td className="flex space-x-3 justify-center">
                  <Link href={`products/edit/${item.id}`}>
                    <FaRegEdit className="text-gray text-xl " />
                  </Link>
                  <DeleteProductBtn id={item.id} onDelete={handleDelete} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
