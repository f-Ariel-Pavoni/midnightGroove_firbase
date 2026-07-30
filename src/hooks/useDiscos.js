import { useEffect, useState } from "react";
import { getDiscos } from "../services/discoService";

const useDiscos = () => {
  const [discos, setDiscos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDiscos = async () => {
      try {
        const data = await getDiscos();
        setDiscos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    cargarDiscos();
  }, []);

  return {
    discos,
    loading,
    error,
  };
};

export default useDiscos;
