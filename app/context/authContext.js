'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { auth, provider, db } from "../config/firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        logged: false,
        email: null,
        uid: null,
        role: null,
        name: null,
        surname: null,
        photoURL: null
    });

    const router = useRouter();
    const defaultPhotoURL = "https://firebasestorage.googleapis.com/v0/b/ecommercenextjs-88f1e.appspot.com/o/profile-images%2Fuser.webp?alt=media&token=5f8f0b9d-87bb-45cc-ac89-88931025bf3a";

    const checkUserInFirestore = async (uid, email, name, surname) => {
        try {
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);
        
            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    name: name,
                    surname: surname,
                    email: email,
                    role: "user",
                    compras: [],
                    createdAt: new Date(),
                    photoURL: defaultPhotoURL,
                });
                setUser({
                    logged: true,
                    email: email,
                    uid: uid,
                    role: "user",
                    name: name,
                    surname: surname,
                    photoURL: defaultPhotoURL,
                });
            } else {
                const userData = userDoc.data();
                setUser({
                    logged: true,
                    email: userData.email,
                    uid: uid,
                    role: userData.role,
                    name: userData.name,
                    surname: userData.surname,
                    photoURL: userData.photoURL || defaultPhotoURL,
                });
            }
        } catch (error) {
            console.error('Error al verificar el usuario en Firestore:', error);
        }
    };

    const registerUser = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const { uid, email } = userCredential.user;

            await checkUserInFirestore(uid, email, values.name, values.surname);
            if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const loginUser = async (values) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const { uid, email } = userCredential.user;

            await checkUserInFirestore(uid, email, values.name, values.surname);

            if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            const fullName = user.displayName || "Google User";
            const nameParts = fullName.split(" ");
            const name = nameParts[0] || "Google";
            const surname = nameParts.slice(1).join(" ") || "User";
            const photoURL = user.photoURL || "";
    
            const userDocRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDocRef);
    
            if (!docSnap.exists()) {
                await setDoc(userDocRef, {
                    name: name,
                    surname: surname,
                    email: user.email,
                    role: "user",
                    compras: [],
                    photoURL: photoURL || defaultPhotoURL
                });
            }
    
            const userData = (await getDoc(userDocRef)).data();
    
            setUser({
                logged: true,
                email: user.email,
                uid: user.uid,
                role: userData.role || "user",
                name: userData.name || name,
                surname: userData.surname || surname,
                photoURL: userData.photoURL || defaultPhotoURL,
            });
    
            if (userData.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }
    };

    const logOutUser = async () => {
        try {
            await signOut(auth);
            setUser({
                logged: false,
                email: null,
                uid: null,
                role: null,
                name: null,
                surname: null,
                photoURL: null
            });
            router.push('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const updateUser = (updatedUser) => {
        setUser(prevUser => ({
            ...prevUser,
            ...updatedUser,
        }));
    };

    const updateUserPassword = async (currentPassword, newPassword) => {
        try {
            const currentUser = auth.currentUser;
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            
            await reauthenticateWithCredential(currentUser, credential);
            
            await updatePassword(currentUser, newPassword);
            alert("Contraseña actualizada correctamente.");
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            if (error.code === 'auth/wrong-password') {
                alert("La contraseña actual no es correcta.");
            } else if (error.code === 'auth/requires-recent-login') {
                alert("Por favor, inicia sesión nuevamente.");
            } else {
                alert("Hubo un error al actualizar la contraseña.");
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                await checkUserInFirestore(authUser.uid, authUser.email, "Unknown", "Unknown");
            } else {
                setUser({
                    logged: false,
                    email: null,
                    uid: null,
                    role: null,
                    name: null,
                    surname: null,
                    photoURL: null
                });
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, registerUser, loginUser, logOutUser, googleLogin, updateUser, updateUserPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
