import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

import { registrarAuditoria } from "./auditService";

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

// Actualizar disco
export const actualizarDisco = async (firebaseId, disco) => {
  const discoRef = doc(db, "discos", firebaseId);

  await updateDoc(discoRef, disco);
};

// Elimina fisicamente un disco
export const eliminarDisco = async (firebaseId) => {
  let auditoria = {
    accion: "DELETE",
    coleccion: "discos",
    estado: "ERROR",
    documentoId: firebaseId,
  };
  try {
    const discoRef = doc(db, "discos", firebaseId);
    await deleteDoc(discoRef);
    auditoria = {
      ...auditoria,
      estado: "SUCCESS",
    };
  } catch (error) {
    auditoria.error = error.message;
    throw error;
  } finally {
    await registrarAuditoria(auditoria);
  }
};

export const agregarDisco = async (disco) => {
  let auditoria = {
    accion: "CREATE",
    coleccion: "discos",
    estado: "ERROR",
  };

  try {
    const snapshot = await getDocs(collection(db, "discos"));
    const ids = snapshot.docs.map((doc) => doc.data().id);
    const nuevoId = Math.max(...ids, 0) + 1;

    const nuevoDisco = {
      ...disco,
      id: nuevoId,
      activo: true,
      tracklist:
        disco.tracklist.map((tema, index) => ({
          numero: index + 1,
          titulo: tema.titulo,
        })) ?? [],
    };

    const ref = await addDoc(collection(db, "discos"), nuevoDisco);
    console.log(`El disco ${disco.titulo} fue subido con referencia ${ref.id}`);

    auditoria = {
      ...auditoria,
      estado: "SUCCESS",
      documentoId: ref.id,
      datos: nuevoDisco,
    };
  } catch (error) {
    auditoria.error = error.message;
    throw error;
  } finally {
    await registrarAuditoria(auditoria);
  }
};

// Portadas

export const getPortadas = async () => {
  try {
    const snapshot = await getDocs(collection(db, "portadas"));

    return snapshot.docs.map((doc) => ({
      firebaseId: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("ERROR FIREBASE:", error);
    throw new Error("Error al obtener portadas Firestore.");
  }
};
