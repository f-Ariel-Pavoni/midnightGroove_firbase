import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";

import { auth, db } from "../firebase/config";

export const crearUsuario = async ({
  nombre,
  apellido,
  email,
  password,
  rol,
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const { uid } = userCredential.user;

    const usuarioRef = doc(db, "usuarios", uid);

    await setDoc(usuarioRef, {
      nombre,
      apellido,
      email,
      rol,
      activo: true,
    });

    return {
      uid,
      nombre,
      apellido,
      email,
      rol,
    };
  } catch (error) {
    console.error("ERROR CREANDO USUARIO:", error);
    throw error;
  }
};

export const suscribirUsuarios = (callback, onError) => {
  try {
    const usuariosRef = collection(db, "usuarios");

    return onSnapshot(
      usuariosRef,
      (snapshot) => {
        const usuarios = snapshot.docs.map((doc) => ({
          firebaseId: doc.id,
          ...doc.data(),
        }));

        callback(usuarios);
      },
      (error) => {
        console.error("ERROR FIREBASE:", error);
        onError?.(new Error("Error al cargar usuarios desde Firestore."));
      },
    );
  } catch (error) {
    console.error("ERROR FIREBASE:", error);
    onError?.(new Error("Error al cargar usuarios desde Firestore."));
    return () => {};
  }
};
