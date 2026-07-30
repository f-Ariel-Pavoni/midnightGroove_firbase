const TarjetaDiscoAdmin = ({ disco, eliminarDisco, editarDisco }) => {
  const { id, titulo, artista, genero } = disco;

  return (
    <div className="card-body">
      <div className="row align-items-center">
        <div className="col-md-4">{titulo}</div>

        <div className="col-md-3">{artista}</div>

        <div className="col-md-2">{genero}</div>

        <div className="col-md-3 d-flex gap-2 justify-content-end">
          <button
            className="btn btn-success btn-sm"
            onClick={() => editarDisco(id)}
          >
            Editar
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => eliminarDisco(id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaDiscoAdmin;
