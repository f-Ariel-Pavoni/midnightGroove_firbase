import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/config";

export const registrarAuditoria = async ({
  accion,
  coleccion,
  documentoId,
  datos = null,
}) => {
  try {
    const usuario = auth.currentUser;
    console.log(usuario);
    await addDoc(collection(db, "audit"), {
      accion,
      coleccion,
      documentoId,
      usuario: usuario?.email ?? "desconocido",
      datos,
      fecha: serverTimestamp(),
    });
  } catch (error) {
    console.error("ERROR REGISTRANDO AUDITORIA:", error);
  }
};
