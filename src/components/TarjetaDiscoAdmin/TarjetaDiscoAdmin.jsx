import { FaEdit, FaTrash, FaPowerOff, FaCheckCircle } from "react-icons/fa";

const TarjetaDiscoAdmin = ({
  disco,
  cambiarEstado,
  editarDisco,
  eliminarDisco,
}) => {
  const { firebaseId, titulo, artista, genero, activo } = disco;

  return (
    <div className="card-body">
      <div className="row align-items-center">
        <div className="col-md-2">{titulo}</div>

        <div className="col-md-2">{artista}</div>

        <div className="col-md-2">{genero}</div>

        <div className="col-md-2">{activo ? "Activo" : "Inactivo"} </div>

        <div className="col-md-4 d-flex gap-2 justify-content-end">
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
