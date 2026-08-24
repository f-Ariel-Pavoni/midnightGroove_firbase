import { FaEdit, FaTrash, FaPowerOff, FaCheckCircle } from "react-icons/fa";

const TarjetaUsuarioAdmin = ({
  usuario,
  editarUsuario,
  cambiarEstado,
  eliminarUsuario,
}) => {
  const { firebaseId, nombre, apellido, email, rol, activo } = usuario;

  return (
    <div className="card-body">
      <div className="row align-items-center">
        {/* Datos del usuario */}
        <div className="col-md-9">
          <div className="row align-items-center">
            <div className="col-md-3">{nombre}</div>
            <div className="col-md-3">{apellido}</div>
            <div className="col-md-3">{email}</div>
            <div className="col-md-2">{rol}</div>
            <div className="col-md-1">{activo ? "Activo" : "Inactivo"}</div>
          </div>
        </div>

        {/* Acciones */}
        <div className="col-md-3 d-flex gap-2 justify-content-end">
          <button
            aria-label="Editar usuario"
            title="Editar usuario"
            className="btn btn-success"
            onClick={() => editarUsuario(usuario)}
          >
            <FaEdit />
          </button>

          <button
            aria-label={activo ? "Desactivar usuario" : "Activar usuario"}
            title={activo ? "Desactivar usuario" : "Activar usuario"}
            className="btn btn-warning"
            onClick={() => cambiarEstado(usuario)}
          >
            {activo ? <FaPowerOff /> : <FaCheckCircle />}
          </button>

          <button
            aria-label="Eliminar usuario"
            title="Eliminar usuario"
            className="btn btn-danger"
            onClick={() => eliminarUsuario(usuario)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaUsuarioAdmin;
