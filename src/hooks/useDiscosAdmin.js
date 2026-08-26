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
  const [operacion, setOperacion] = useState(null);

  const desactivar = async (firebaseId) => {
    setError(null);
    setOperacion("desactivar");
    try {
      await desactivarDisco(firebaseId);
    } catch (error) {
      console.error("ERROR DESACTIVANDO DISCO:", error);
      setError(error);
      throw error;
    } finally {
      setOperacion(null);
    }
  };

  const toggleEstado = async (firebaseId) => {
    setError(null);
    setOperacion("toggleEstado");
    try {
      await toggleEstadoDisco(firebaseId);
    } catch (error) {
      console.error("ERROR CAMBIANDO ESTADO:", error);
      setError(error);
      throw error;
    } finally {
      setOperacion(null);
    }
  };

  const actualizar = async (firebaseId, disco) => {
    setError(null);
    setOperacion("actualizar");
    try {
      await actualizarDisco(firebaseId, disco);
    } catch (error) {
      console.error("ERROR ACTUALIZANDO DISCO:", error);
      setError(error);
      throw error;
    } finally {
      setOperacion(null);
    }
  };

  const actualizarPrecio = async (firebaseId, precio) => {
    setError(null);
    setOperacion("actualizarPrecio");
    try {
      await actualizarPrecioConMerge(firebaseId, precio);
    } catch (error) {
      console.error("ERROR ACTUALIZANDO PRECIO:", error);
      setError(error);
      throw error;
    } finally {
      setOperacion(null);
    }
  };

  const eliminar = async (firebaseId) => {
    setError(null);
    setOperacion("eliminar");
    try {
      await eliminarDisco(firebaseId);
    } catch (error) {
      console.error("ERROR ELIMINANDO DISCO:", error);
      setError(error);
      throw error;
    } finally {
      setOperacion(null);
    }
  };

  const crearDisco = async (disco) => {
    setError(null);
    setOperacion("crearDisco");

    try {
      await agregarDisco(disco);
    } catch (error) {
      console.error("ERROR AGREGANDO DISCO:", error);
      setError(error);
      throw error;
    } finally {
      setOperacion(null);
    }
  };

  useEffect(() => {
    const cancelar = escucharDiscosAdmin(
      (data) => {
        setDiscos(data);
        setLoading(false);
      },
      (error) => {
        console.error("ERROR CARGANDO DISCOS:", error);
        setError(error);
        setLoading(false);
      },
    );

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
    operacion,
  };
};

export default useDiscosAdmin;
