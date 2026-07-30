import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

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

export const getDiscos = async () => {
  try {
    const qry = query(collection(db, "discos"), where("activo", "==", true));

    const snapshot = await getDocs(qry);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  } catch (error) {
    console.error("ERROR FIREBASE:", error);
    throw new Error("Error al cargar discos desde Firestore.");
  }
};

//  funcion que toma discos del local
//  export const getDiscos = async () => {
//   const respuesta = await fetch(`${import.meta.env.BASE_URL}data/discos.json`);
//   if (!respuesta.ok) throw new Error("Error al cargar discos.");

//   return respuesta.json();
// };

export const getDiscoById = async (id) => {
  const discos = await getDiscos();
  return discos.find((disco) => disco.id === Number(id));
};

export const getGeneros = async () => {
  const discos = await getDiscos();
  return [...new Set(discos.map((disco) => disco.genero))];
};

export const desactivarDisco = async (firebaseId) => {
  const discoRef = doc(db, "discos", firebaseId);
  await updateDoc(discoRef, { activo: false });
};

export const toggleEstadoDisco = async (firebaseId) => {
  const discoRef = doc(db, "discos", firebaseId);
  const discoSnap = await getDoc(discoRef);
  if (!discoSnap.exists()) {
    throw new Error("El disco no existe.");
  }
  const nuevoEstado = !discoSnap.data().activo;
  await updateDoc(discoRef, { activo: nuevoEstado });
};
