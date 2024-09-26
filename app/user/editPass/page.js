import React, { useState, useEffect } from 'react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Button from "@/app/components/Button";

const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);

  const currentUser = getAuth().currentUser;

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setIsPasswordLogin(user.providerData.some((provider) => provider.providerId === 'password'));
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const credential = isPasswordLogin
        ? EmailAuthProvider.credential(currentUser.email, currentPassword)
        : null;

      if (isPasswordLogin && credential) {
        await reauthenticateWithCredential(currentUser, credential);
      }

      await updatePassword(currentUser, newPassword);

      setSuccess('Contraseña actualizada exitosamente!');
      onClose();
    } catch (error) {
      setError('Error al actualizar la contraseña: ' + error.message);
      console.error('Error al actualizar la contraseña:', error);
    } finally {
      setCurrentPassword('');
      setNewPassword('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4">Cambiar Contraseña</h3>
        <form onSubmit={handleSubmit}>
          {isPasswordLogin && (
            <input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Contraseña actual"
              className="p-2 border rounded-lg mb-4"
            />
          )}
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva Contraseña"
            className="p-2 border rounded-lg mb-4"
          />
          <div className="flex justify-between py-5">
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              Actualizar Contraseña
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

export default ChangePasswordModal;