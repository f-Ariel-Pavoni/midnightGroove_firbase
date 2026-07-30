import { useEffect, useState } from "react";
import {
  getDiscosAdmin,
  desactivarDisco,
  toggleEstadoDisco,
} from "../services/discoService";

const useDiscosAdmin = () => {
  const [discos, setDiscos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const desactivar = async (firebaseId) => {
    try {
      await desactivarDisco(firebaseId);
      await cargarDiscos();
    } catch (error) {
      setError(error);
    }
  };

  const toggleEstado = async (firebaseId) => {
    try {
      await toggleEstadoDisco(firebaseId);
      await cargarDiscos();
    } catch (error) {
      console.error("ERROR CAMBIANDO ESTADO:", error);
      setError(error);
    }
  };

  const cargarDiscos = async () => {
    try {
      const data = await getDiscosAdmin();
      setDiscos(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDiscos();
  }, []);

  return {
    discos,
    loading,
    error,
    desactivar,
    toggleEstado,
  };
};

export default useDiscosAdmin;
