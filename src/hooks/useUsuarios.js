import { useEffect, useState } from "react";

import {
  crearUsuario as crearUsuarioService,
  suscribirUsuarios,
} from "../services/usuarioService";

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = suscribirUsuarios(
      (usuarios) => {
        setUsuarios(usuarios);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const crearUsuario = async (data) => {
    try {
      setError(null);
      await crearUsuarioService(data);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return {
    crearUsuario,
    usuarios,
    loading,
    error,
  };
};

export default useUsuarios;
