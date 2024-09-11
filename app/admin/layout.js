'use client'
import React from 'react'
import { useAuthContext } from '../context/authContext'
import LoginPage from './login/LoginPage';

const AdminLayout = ({children}) => {
    const {user} = useAuthContext();
    return (
        <div>
            {user.logged ? children : <LoginPage />}    
        </div>
        
    )
}

export default AdminLayout