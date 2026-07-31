import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const discosRef = collection(db, "discos");

// Trae todos los discos que estan activos
export const getDiscos = async () => {
  try {
    const qry = query(discosRef, where("activo", "==", true));

    const snapshot = await getDocs(qry);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  } catch (error) {
    console.error("ERROR FIREBASE:", error);
    throw new Error("Error al cargar discos desde Firestore.");
  }
};

// Trae el primer disco por id (se espera id unico)
export const getDiscoById = async (id) => {
  const qry = query(
    discosRef,
    where("id", "==", Number(id)),
    where("activo", "==", true),
  );
  const snapshot = await getDocs(qry);

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};

// Devuelve un array de generos extraido de la lista de discos.
export const getGeneros = async () => {
  const discos = await getDiscos();
  return [...new Set(discos.map((disco) => disco.genero))];
};
