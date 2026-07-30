const TarjetaDiscoAdmin = ({ disco, cambiarEstado, editarDisco }) => {
  const { firebaseId, id, titulo, artista, genero, activo } = disco;

  return (
    <div className="card-body">
      <div className="row align-items-center">
        <div className="col-md-2">{titulo}</div>

        <div className="col-md-2">{artista}</div>

        <div className="col-md-2">{genero}</div>

        <div className="col-md-2">{activo ? "Activo" : "Inactivo"} </div>

        <div className="col-md-4 d-flex gap-2 justify-content-end">
          <button
            className="btn btn-success btn-sm"
            onClick={() => editarDisco(firebaseId)}
          >
            Editar
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => cambiarEstado(disco)}
          >
            {activo ? "Desactivar" : "Activar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaDiscoAdmin;
