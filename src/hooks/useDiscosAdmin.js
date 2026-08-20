import { useEffect, useState } from "react";
import {
  getDiscosAdmin,
  desactivarDisco,
  toggleEstadoDisco,
  eliminarDisco,
  agregarDisco,
  actualizarDisco,
  actualizarPrecioConMerge,
} from "../services/adminServices";

const useDiscosAdmin = () => {
  const [discos, setDiscos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDiscos = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await getDiscosAdmin();
      setDiscos(data);
    } catch (error) {
      console.error("ERROR CARGANDO DISCOS:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const desactivar = async (firebaseId) => {
    setError(null);
    try {
      await desactivarDisco(firebaseId);
      await cargarDiscos();
    } catch (error) {
      console.error("ERROR DESACTIVANDO DISCO:", error);
      setError(error);
    }
  };

  const toggleEstado = async (firebaseId) => {
    setError(null);
    try {
      await toggleEstadoDisco(firebaseId);
      await cargarDiscos();
    } catch (error) {
      console.error("ERROR CAMBIANDO ESTADO:", error);
      setError(error);
    }
  };

  const actualizar = async (firebaseId, disco) => {
    setError(null);
    try {
      await actualizarDisco(firebaseId, disco);
      await cargarDiscos();
    } catch (error) {
      console.error("ERROR ACTUALIZANDO DISCO:", error);
      setError(error);
    }
  };

  const actualizarPrecio = async (firebaseId, precio) => {
    setError(null);
    try {
      await actualizarPrecioConMerge(firebaseId, precio);
      await cargarDiscos();
    } catch (error) {
      console.error("ERROR ACTUALIZANDO PRECIO:", error);
      setError(error);
    }
  };

  const eliminar = async (firebaseId) => {
    setError(null);
    try {
      await eliminarDisco(firebaseId);
      await cargarDiscos();
    } catch (error) {
      console.error("ERROR ELIMINANDO DISCO:", error);
      setError(error);
    }
  };

  const crearDisco = async (disco) => {
    setError(null);
    try {
      await agregarDisco(disco);
      await cargarDiscos();
    } catch (error) {
      console.error("ERROR AGREGANDO DISCO:", error);
      setError(error);
    }
  };

  useEffect(() => {
    cargarDiscos();
  }, []);

  return {
    discos,
    loading,
    error,
    crearDisco,
    desactivar,
    eliminar,
    actualizar,
    actualizarPrecio,
    toggleEstado,
  };
};

export default useDiscosAdmin;
