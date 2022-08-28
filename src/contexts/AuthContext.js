import React, { useContext, useEffect, useState } from 'react'
import { auth } from "../firebase"
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    signOut, 
    signInWithPopup
} from "firebase/auth";

const AuthContext = React.createContext()

// using the customize hook to access our auth context
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    
    const[currentUser, setCurrentUser] = useState()
    const[loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider()
    
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function loginWithGoogle() {
        return signInWithPopup(auth, provider)
    }

    function logout() {
        signOut(auth)
    }

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        // 1. By defalut we're loading and as soon as we get this useEffect runs
        // That means it did the verification to see if there is a user, then we can 
        // set the loading to false.
        // 2. We don't want this to be inside of our render
        // we only want to run this when we mount our component => it only runs once
        // 3. We also want to make sure to unsubscribe from this whenever we're done
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe // return a function from effect => to do clean up, unsubscribe the data 
    }, [])

    // the value is going to contain all of our information that we want to provide with our authentication
    const value = {
        currentUser,
        login, loginWithGoogle,
        logout,
        signup,
        resetPassword
    }

    // if we are not loading then we render out the children
    // which means we don't render any of our application until 
    // we have our current user being set for the very first time
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
