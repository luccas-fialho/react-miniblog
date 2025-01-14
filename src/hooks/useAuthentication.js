import { auth } from "../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      /* let systemError;

      if (error.message.includes("password")) {
        systemError = "Erro com a senha!"
      } */

      let errorMessage = error.message.split(":")[1].split("(")[0].trim();

      setLoading(false);

      setError(errorMessage);
    }
  };

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
      return true;
    } catch (error) {
      let errorMessage;

      if (error.message.includes("invalid-credential")) {
        errorMessage = "Incorrect email or password!";
      } else {
        errorMessage = "An error has occurred, try again later.";
      }

      setLoading(false);
      setError(errorMessage);
      return false;
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
