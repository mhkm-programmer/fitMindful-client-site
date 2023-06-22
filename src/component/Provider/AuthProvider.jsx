import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { app } from "../../firebase/firebase.config";
import axios from "axios";

// Create a context to hold the authentication information
export const AuthContext = createContext(null);

// Get the authentication instance from Firebase
const auth = getAuth(app);

// Define the AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the current user
  const [loading, setLoading] = useState(true); // State to indicate if the authentication is loading

  const googleProvider = new GoogleAuthProvider(); // Create a GoogleAuthProvider instance

  // Function to create a user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to sign in a user with email and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to sign in a user with Google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Function to log out the current user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Function to update the user's profile (name and photo)
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // useEffect hook to listen for changes in the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state with the current user

      // get and set token
      if (currentUser) {
        axios
          .post("https://summer-camp-server-side-kabircodefolio.vercel.app/jwt", { email: currentUser.email })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token); // Store the token in local storage
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token"); // Remove the token from local storage
       
      }
    });

    // Return a cleanup function to unsubscribe from the onAuthStateChanged event
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  // Provide the authentication context value to the children components
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
