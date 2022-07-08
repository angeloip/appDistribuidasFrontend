import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/api";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  /* const [usuario, setUsuario] = useState(null); */
  const [beUser, setBeUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(0);

  const saveToken = (newToken) => {
    setToken(`Bearer ${newToken}`);
  };

  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUserJSON) {
      setBeUser(loggedUserJSON);
      /*  setToken("Bearer " + loggedUserJSON.token); */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedUser", JSON.stringify(beUser));
  }, [beUser]);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/"
    });
  };

  const confirmResetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };

  const verifyObbCode = (oobCode) => {
    return verifyPasswordResetCode(auth, oobCode);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        /* setUsuario(currentUser); */
      } else {
        /* setUsuario(null); */
        setBeUser(null);
      }
      setLoadingUser(false);
    });
  }, []);

  const value = {
    userRole: [userRole, setUserRole],
    loadingUser: [loadingUser, setLoadingUser],
    /*  usuario: [usuario, setUsuario], */
    beUser: [beUser, setBeUser],
    token: [token, setToken],
    saveToken: saveToken,
    signUp: signUp,
    logIn: logIn,
    logOut: logOut,
    loginWithGoogle: loginWithGoogle,
    resetPassword: resetPassword,
    confirmResetPassword: confirmResetPassword,
    verifyObbCode: verifyObbCode
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
