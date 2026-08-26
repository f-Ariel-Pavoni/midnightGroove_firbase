import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase/config";

export const login = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence);
  const respuesta = await signInWithEmailAndPassword(auth, email, password);
  return respuesta.user;
};

export const logOut = async () => {
  await signOut(auth);
};

export const escucharSesion = (callback) => {
  return onAuthStateChanged(auth, callback);
};
