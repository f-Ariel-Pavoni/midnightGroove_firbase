import { useState, useMemo } from "react";
import Modal from "../../components/Modal/Modal";
import Encabezado from "../../components/Encabezado/Encabezado";
import Buscador from "../../components/Buscador/Buscador";
import FormularioUsuario from "../../components/FormularioUsuario/FormularioUsuario";
import useUsuarios from "../../hooks/useUsuarios";
import TarjetaUsuarioAdmin from "../../components/TarjetaUsuarioAdmin/TarjetaUsuarioAdmin";
import ListaUsuarios from "../../components/ListaUsuarios/ListaUsuarios";

const AdministarUsuarios = () => {
  const [busqueda, setBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState(null);
  const [ctaActivo, setCtaActivo] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const { crearUsuario, usuarios, loading, error } = useUsuarios();

  const handleNuevoUsuario = () => {
    setMostrarFormulario(true);
    console.log("Vas a agregar un usuario");
  };

  const handleCrearUsuario = async (data) => {
    try {
      await crearUsuario(data);
      console.log("Usuario creado correctamente");
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const editarUsuario = (usuario) => {
    console.log("EDITAR USUARIO:", usuario);
  };

  const cambiarEstado = (usuario) => {
    console.log("CAMBIAR ESTADO:", usuario);
  };

  const eliminarUsuario = (usuario) => {
    console.log("ELIMINAR USUARIO:", usuario);
  };

  return (
    <>
      <Encabezado
        titulo="Administrar Usuarios"
        bajada="Administra los usuarios del sitio."
      />
      <div className="row mb-3">
        <div className="col-auto">
          <button className="btn btn-dark" onClick={handleNuevoUsuario}>
            + Agregar usuario
          </button>
        </div>

        <div className="col">
          <Buscador
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            placeholder="Buscar usuario..."
          />
        </div>
      </div>
      {loading && <p>Cargando usuarios...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading && !error && (
        <ListaUsuarios
          usuarios={usuarios}
          layout="list"
          renderCard={(usuario) => (
            <TarjetaUsuarioAdmin
              usuario={usuario}
              editarUsuario={editarUsuario}
              cambiarEstado={cambiarEstado}
              eliminarUsuario={eliminarUsuario}
            />
          )}
        />
      )}
      {mostrarFormulario && (
        <Modal
          onClose={() => setMostrarFormulario(false)}
          titulo={"Nuevo usuario"}
        >
          <FormularioUsuario
            onClose={() => setMostrarFormulario(false)}
            onSubmit={handleCrearUsuario}
            ctaActivo={ctaActivo}
          />
        </Modal>
      )}
    </>
  );
};

export default AdministarUsuarios;
