import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { storage } from "@/app/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "@/app/context/authContext";
import { db } from "@/app/config/firebase";
import Button from "@/app/components/Button";

const EditProfile = ({ onClose }) => {
  const { user, updateUser } = useAuthContext();
  const [values, setValues] = useState({
    name: user.name,
    surname: user.surname,
    photoURL: user.photoURL,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `profile-images/${user.uid}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        setValues((prev) => ({
          ...prev,
          photoURL: downloadURL,
        }));
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        name: values.name,
        surname: values.surname,
        photoURL: values.photoURL,
      });

      updateUser({
        name: values.name,
        surname: values.surname,
        photoURL: values.photoURL,
      });

      setSuccess("Perfil actualizado exitosamente.");
      onClose();
    } catch (error) {
      setError("Error al actualizar el perfil: " + error.message);
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4">Editar Perfil</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="p-2 border rounded-lg mb-4"
          />
          <input
            type="text"
            name="surname"
            value={values.surname}
            onChange={handleChange}
            placeholder="Apellido"
            className="p-2 border rounded-lg mb-4"
          />
          <input
            type="file"
            name="photoFile"
            onChange={handleFileChange}
            className="p-2 border rounded-lg mb-4"
            accept="image/*"
          />

          <div className="flex justify-between py-5">
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              Actualizar Perfil
            </Button>
            <Button onClick={onClose} className="bg-gray-300 py-2 px-4 rounded-lg">
              Cancelar
            </Button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;