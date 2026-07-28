import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const getDiscos = async () => {
  try {
    const snapshot = await getDocs(collection(db, "discos"));
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
