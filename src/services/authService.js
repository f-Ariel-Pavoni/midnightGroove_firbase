import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

export const login = async (email, password) => {
  const respuesta = await signInWithEmailAndPassword(auth, email, password);
  return respuesta.user;
};

export const logOut = async () => {
  await signOut(auth);
};

export const escucharSesion = (callback) => {
  onAuthStateChanged(auth, callback);
};
