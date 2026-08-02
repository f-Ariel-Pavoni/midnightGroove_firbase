import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ModalEstado from "../ModalEstado/ModalEstado";

import "./Navbar.css";

const Navbar = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const { user, logout } = useAuth();

  const handleLogOut = () => {
    console.log("Inicia logOut");
    setMostrarModal(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            MidnightGroove
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">
                  Nosotros
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {mostrarModal && (
        <ModalEstado
          tipo="Alert"
          mensaje="Vas a cerrar la sesión"
          textoAccion="Logout"
          onClose={() => setMostrarModal(false)}
          accion={logout}
        />
      )}
    </>
  );
};

export default Navbar;
