'use client'
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';
const AuthContext = createContext({
    user: null,
    setUser: () => { },
    signUp: async () => { },
    signIn: async () => { },
    signInWithGitHub: async () => { },
    signInWithGoogle: async () => { },
    signInWithFacebook: async () => { },
    signInWithTwitter: async () => { },
    logout: async () => { },
    error: null,
    loading: false,
});

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const navigate = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
                navigate.push('/');
            } else {
                setUser(null);
                setLoading(true);
                navigate.push('/login');

            }
            setInitialLoading(false);
        });
    }, [auth]);

    const signUp = async (email, password, username) => {
        setLoading(true);

        try {
            // Encrypt the password


            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                providerId: 'email&password',
                username: username,
                // Add more fields as needed
            });

            await updateProfile(userCredential.user, { displayName: username });
            setUser(userCredential.user);
            toast.success("Welcome");
            navigate.push('/');
        } catch (error) {
            // console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            toast.success("Welcome");
            navigate.push('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGitHub = async () => {
        setLoading(true);
        const provider = new GithubAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const userDocRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                providerId: 'github',
                username: userCredential.user.displayName,
                // Add more fields as needed
            });
            setUser(userCredential.user);
            toast.success("Welcome");
            navigate.push('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const userDocRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                providerId: 'google',
                username: userCredential.user.displayName,
                // Add more fields as needed
            });
            setUser(userCredential.user);
            toast.success("Welcome");
            navigate.push('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const signInWithFacebook = async () => {
        setLoading(true);
        const provider = new FacebookAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const userDocRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                providerId: 'facebook',
                username: userCredential.user.displayName,
                // Add more fields as needed
            });
            setUser(userCredential.user);
            toast.success("Welcome");
            navigate.push('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const signInWithTwitter = async () => {
        setLoading(true);
        const provider = new TwitterAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const userDocRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                providerId: 'twitter',
                username: userCredential.user.displayName,
                // Add more fields as needed
            });
            setUser(userCredential.user);
            toast.success("Welcome");
            navigate.push('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        setLoading(true);
        try {
            toast.success(`logout successfull! ,Thanks for visiting the site ${user.displayName}`);
            await signOut(auth);
            setUser(null);
            navigate.push('/login');
        } catch (error) {
            toast.error(`${error.message}`, {
            });
        } finally {
            setLoading(false);
        }
    };

    const memoedValue = useMemo(() => ({
        user,
        setUser,
        signUp,
        signIn,
        signInWithGitHub,
        signInWithGoogle,
        signInWithFacebook,
        signInWithTwitter,
        loading,
        logout,
        error,
    }), [user, loading]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}


