'use client';
import React from 'react';
import { useAuthContext } from '../context/authContext';
import LoginPage from '../login/Page';
import { useRouter } from 'next/navigation';

const AdminLayout = ({ children }) => {
    const { user } = useAuthContext();

    if (!user.logged || user.role !== 'admin') {
        return <LoginPage />;
    }

    return <div>{children}</div>;
};

export default AdminLayout;
