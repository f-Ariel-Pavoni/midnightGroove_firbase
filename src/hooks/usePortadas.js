import { useEffect, useState } from "react";
import { getPortadas } from "../services/adminServices";

const usePortadas = () => {
  const [portadas, setPortadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerPortadas = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await getPortadas();
      setPortadas(data);
    } catch (error) {
      console.error("ERROR CARGANDO DISCOS:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPortadas();
  }, []);

  return {
    portadas,
    loading,
    error,
  };
};

export default usePortadas;
