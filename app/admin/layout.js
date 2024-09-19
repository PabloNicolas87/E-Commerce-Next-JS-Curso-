'use client';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import LoginPage from '../login/page';
import NotFound from '../not-found';

const AdminLayout = ({ children }) => {
    const { user } = useAuthContext();

    


    if (!user.logged) {
        return <LoginPage />;
    } else if (user.role !== 'admin') {
        return <NotFound />;
    }

    return <div>{children}</div>;
};

export default AdminLayout;
