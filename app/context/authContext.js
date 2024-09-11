'use client'
import { createContext, useContext, useEffect, useState } from "react"
import { auth, provider } from "../config/firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();



export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({
        logged: false,
        email: null,
        uid: null,
    });

    const registerUser = async (values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
    }

    const loginUser = async (values) => {
        await signInWithEmailAndPassword(auth, values.email, values.password)
    }

    const logOutUser = async () => {
        await signOut()
    }

    const googleLogin = async () => {
        await signInWithPopup(auth, provider)
    }
     
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                setUser({
                    logged: true,
                    email: user.email,
                    uid:user.uid
                })
            } 
            else {
                setUser({
                    logged: false,
                    email: null,
                    uid:null
                })
            }
        })
        
    }, [])

    return <AuthContext.Provider value={{user, registerUser, loginUser, logOutUser, googleLogin}}>{children}</AuthContext.Provider>
};


export const useAuthContext = () => useContext(AuthContext);