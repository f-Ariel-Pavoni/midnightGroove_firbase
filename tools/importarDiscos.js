import "dotenv/config";
import { readFile } from "fs/promises";
import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

//levanta los argumentos de ejecucion por consola -> node tools/importarDiscos.js --reset
const reset = process.argv.includes("--reset");

//creo una interfase para obtener datos desde teclado
const rl = createInterface({ input, output });

const borrarDiscos = async () => {
  const snapshot = await getDocs(collection(db, "discos"));
  for (const docu of snapshot.docs) {
    await deleteDoc(doc(db, "discos", docu.id));
  }
  console.log("Coleccion de discos fue eliminada");
};

const cargarDiscos = async (discosCargar) => {
  for (const disco of discosCargar) {
    const ref = await addDoc(collection(db, "discos"), disco);
    console.log(`El disco ${disco.titulo} fue subido con referencia ${ref.id}`);
  }
};

try {
  const usr = await rl.question("Usuario: ");
  const pass = await rl.question("Password: ");

  await signInWithEmailAndPassword(auth, usr, pass);
  console.log("Autenticado correctamente");

  const contenido = await readFile("./public/data/discos.json", "utf8");
  const discos = JSON.parse(contenido);

  console.log(`Modo Reset: ${reset}`);

  // si el modo es reset borra la colleccion
  // otro caso agrega sin repetir ids (del dato)

  if (reset) {
    await borrarDiscos();
    await cargarDiscos(discos);
  } else {
    const snapshot = await getDocs(collection(db, "discos"));
    const idsExistentes = snapshot.docs.map((doc) => doc.data().id);
    const discosNuevos = discos.filter(
      (disco) => !idsExistentes.includes(disco.id),
    );
    await cargarDiscos(discosNuevos);
  }
} catch (error) {
  console.log("ERROR: ", error.message);
} finally {
  rl.close();
  await signOut(auth);
  console.log("Conexión terminada");
}
