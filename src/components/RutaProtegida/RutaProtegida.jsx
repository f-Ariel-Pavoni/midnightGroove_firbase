import { Navigate, useLocation, Outlet } from "react-router-dom";

const RutaProtegida = ({ children }) => {
  const usuario = localStorage.getItem("usuario");
  const location = useLocation();

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          mensaje: "Debes iniciar sesión para acceder al dashboard",
        }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default RutaProtegida;
