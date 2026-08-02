import { useState, useEffect } from "react";
import {
  login as loginService,
  escucharSesion,
  logOut as logOutService,
} from "../services/authService";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    setError(null);
    try {
      const usr = await loginService(email, password);
      setUser(usr);
      return usr;
    } catch (error) {
      console.error("ERROR:", error);
      setError(error);
      return null;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await logOutService();
      setUser(null);
    } catch (error) {
      console.error("ERROR:", error);
      setError(error);
    }
  };

  useEffect(() => {
    escucharSesion((usuario) => {
      setUser(usuario);
      setLoading(false);
    });
  }, []);

  return {
    user,
    error,
    loading,
    login,
    logout,
  };
};

export default useAuth;
