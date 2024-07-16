import { createContext, useEffect, useState } from "react";
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
import { app } from "../firebase.config";
// import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { json } from "react-router-dom";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
     null
    );


  const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();






  const authInfo = {
    user,
    setUser,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
