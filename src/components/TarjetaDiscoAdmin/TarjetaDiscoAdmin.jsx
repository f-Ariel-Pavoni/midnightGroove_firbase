import {
  FaEdit,
  FaTrash,
  FaPowerOff,
  FaCheckCircle,
  FaPen,
} from "react-icons/fa";

const TarjetaDiscoAdmin = ({
  disco,
  cambiarEstado,
  editarDisco,
  eliminarDisco,
  actualizarPrecio,
}) => {
  const { firebaseId, titulo, artista, genero, precio, activo } = disco;

  return (
    <div className="card-body">
      <div className="row align-items-center">
        {/* Datos del disco */}
        <div className="col-md-9">
          <div className="row align-items-center">
            <div className="col-md-3">{titulo}</div>
            <div className="col-md-3">{artista}</div>
            <div className="col-md-2">{genero}</div>

            <div className="col-md-2 d-flex align-items-center justify-content-end gap-2">
              <span>{precio}</span>
              <button
                type="button"
                aria-label="Editar precio"
                title="Editar precio"
                className="btn btn-sm btn-link p-0"
                onClick={() => actualizarPrecio(disco)}
              >
                <FaPen />
              </button>
            </div>

            <div className="col-md-2">{activo ? "Activo" : "Inactivo"}</div>
          </div>
        </div>

        {/* Acciones */}
        <div className="col-md-3 d-flex gap-2 justify-content-end">
          <button
            aria-label="Editar disco"
            title="Editar disco"
            className="btn btn-success"
            onClick={() => editarDisco(disco)}
          >
            <FaEdit />
          </button>

          <button
            aria-label={activo ? "Desactivar disco" : "Activar disco"}
            title={activo ? "Desactivar disco" : "Activar disco"}
            className="btn btn-warning"
            onClick={() => cambiarEstado(disco)}
          >
            {activo ? <FaPowerOff /> : <FaCheckCircle />}
          </button>

          <button
            aria-label="Eliminar disco"
            title="Eliminar disco"
            className="btn btn-danger"
            onClick={() => eliminarDisco(disco)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaDiscoAdmin;
