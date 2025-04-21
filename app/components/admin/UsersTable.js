'use client';
import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '@/app/utils/firebaseHelpers'; 
import SimpleSpinner from '../spinner/Spinner';
//import UsersBtnDelete from './UsersBtnDelete';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /*const handleDelete = async (uid) => {
    try {
      await deleteUser(uid);
      setUsers(users.filter((user) => user.uid !== uid));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };*/

  if (loading) {
    return <SimpleSpinner />;
  }

  return (
    <div className="overflow-x-auto my-8">
      <h2 className="text-2xl font-semibold my-4">Lista de Usuarios</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-3 px-4">UID</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid} className="border-t">
              <td className="py-3 px-4">{user.uid}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4 text-center">
                {/*<UsersBtnDelete uid={user.uid} onDelete={handleDelete} />*/}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
