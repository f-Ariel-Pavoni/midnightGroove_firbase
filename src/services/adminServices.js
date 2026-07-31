import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

// Obtener discos con todos los estados

export const getDiscosAdmin = async () => {
  try {
    const snapshot = await getDocs(collection(db, "discos"));
    return snapshot.docs.map((doc) => ({
      firebaseId: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("ERROR FIREBASE:", error);
    throw new Error("Error al cargar discos desde Firestore.");
  }
};

// Desactiva disco
export const desactivarDisco = async (firebaseId) => {
  const discoRef = doc(db, "discos", firebaseId);
  await updateDoc(discoRef, { activo: false });
};

// Cambiar estado de un disco
export const toggleEstadoDisco = async (firebaseId) => {
  const discoRef = doc(db, "discos", firebaseId);
  const discoSnap = await getDoc(discoRef);
  if (!discoSnap.exists()) {
    throw new Error("El disco no existe.");
  }
  const nuevoEstado = !discoSnap.data().activo;
  await updateDoc(discoRef, { activo: nuevoEstado });
};

// Elimina fisicamente un disco
export const eliminarDisco = async (firebaseId) => {
  const discoRef = doc(db, "discos", firebaseId);
  await deleteDoc(discoRef);
};
