import { useEffect, useState } from "react";
import {
  desactivarDisco,
  toggleEstadoDisco,
  eliminarDisco,
  agregarDisco,
  actualizarDisco,
  actualizarPrecioConMerge,
  escucharDiscosAdmin,
} from "../services/adminServices";

const useDiscosAdmin = () => {
  const [discos, setDiscos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const desactivar = async (firebaseId) => {
    setError(null);
    try {
      await desactivarDisco(firebaseId);
    } catch (error) {
      console.error("ERROR DESACTIVANDO DISCO:", error);
      setError(error);
    }
  };

  const toggleEstado = async (firebaseId) => {
    setError(null);
    try {
      await toggleEstadoDisco(firebaseId);
    } catch (error) {
      console.error("ERROR CAMBIANDO ESTADO:", error);
      setError(error);
    }
  };

  const actualizar = async (firebaseId, disco) => {
    setError(null);
    try {
      await actualizarDisco(firebaseId, disco);
    } catch (error) {
      console.error("ERROR ACTUALIZANDO DISCO:", error);
      setError(error);
    }
  };

  const actualizarPrecio = async (firebaseId, precio) => {
    setError(null);
    try {
      await actualizarPrecioConMerge(firebaseId, precio);
    } catch (error) {
      console.error("ERROR ACTUALIZANDO PRECIO:", error);
      setError(error);
    }
  };

  const eliminar = async (firebaseId) => {
    setError(null);
    try {
      await eliminarDisco(firebaseId);
    } catch (error) {
      console.error("ERROR ELIMINANDO DISCO:", error);
      setError(error);
    }
  };

  const crearDisco = async (disco) => {
    setError(null);
    try {
      await agregarDisco(disco);
    } catch (error) {
      console.error("ERROR AGREGANDO DISCO:", error);
      setError(error);
    }
  };

  useEffect(() => {
    const cancelar = escucharDiscosAdmin((data) => {
      setDiscos(data);
      setLoading(false);
    });

    return cancelar;
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
