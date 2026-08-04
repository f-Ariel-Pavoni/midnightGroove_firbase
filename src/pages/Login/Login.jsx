import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import ModalEstado from "../../components/ModalEstado/ModalEstado";
import Encabezado from "../../components/Encabezado/Encabezado";

const Login = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [mostrarNotLogged, setMostrarNotLogged] = useState(
    Boolean(location.state?.mensaje),
  );

  const destino = location.state?.from?.pathname || "/dashboard";

  const manejarLogin = (usuario) => {
    if (usuario) {
      navigate(destino);
    } else setMostrarModal(true);
  };

  return (
    <>
      <Encabezado titulo="Login" />
      <FormularioLogin onLogin={manejarLogin} />
      {mostrarNotLogged && (
        <ModalEstado
          tipo="Acceso no valido"
          mensaje={location.state.mensaje}
          onClose={() => setMostrarNotLogged(false)}
        />
      )}
      {mostrarModal && (
        <ModalEstado
          tipo="error"
          mensaje="Usuario o contraseña incorrectos"
          onClose={() => setMostrarModal(false)}
        />
      )}
    </>
  );
};

export default Login;
