import { useEffect, useState } from "react";

import { escucharDiscos } from "../services/discoService";

const useDiscos = () => {
  const [discos, setDiscos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cancelar = escucharDiscos((data) => {
      setDiscos(data);
      setLoading(false);
    });

    return cancelar;
  }, []);

  return {
    discos,
    loading,
    error,
  };
};

export default useDiscos;
