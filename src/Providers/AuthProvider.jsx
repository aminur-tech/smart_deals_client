import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    // Create user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (updateUser) => {
        return updateProfile(auth.currentUser, updateUser)
    }

    // sign in google
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // logOut
    const logOut = () => {
        return signOut(auth)
    }
    //forget password
    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    // Track the current logged-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const token = await currentUser.getIdToken()
                setUser({ ...currentUser, accessToken: token });
            }
            else {
                setUser(null);
            }
            // ✅ Corrected (was setUser(user))
            setLoading()
        });
        return () => unsubscribe();

        // // optional 
        // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        //     setUser(currentUser)
        //     setLoading()
        //     if (currentUser) {
        //         const logged = { email: currentUser.email }
        //         fetch('http://localhost:3000/getToken', {
        //             method: 'POST',
        //             headers: {
        //                 "content-type": "application/json"
        //             },
        //             body: JSON.stringify(logged)
        //         })
        //             .then(res => res.json())
        //             .then(data => {console.log(data)
        //             localStorage.setItem('token', data.token)})
        //     }
        // })
        // return () => unsubscribe()
    }, []);

    const userInfo = {
        user,
        setUser,
        createUser,
        logOut,
        signInUser,
        loading,
        setLoading,
        updateUser,
        googleSignIn,
        forgetPassword,
    };

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
