const EncabezadoDiscosAdmin = () => {
  return (
    <div className="card-body">
      <div className="row align-items-center fw-bold py-3">
        {/* Datos del disco */}
        <div className="col-md-9">
          <div className="row align-items-center">
            <div className="col-md-3">Título</div>
            <div className="col-md-3">Artista</div>
            <div className="col-md-2">Género</div>
            <div className="col-md-2 ">Precio</div>
            <div className="col-md-2">Estado</div>
          </div>
        </div>

        {/* Acciones */}
        <div className="col-md-3 text-center">Acciones</div>
      </div>
    </div>
  );
};

export default EncabezadoDiscosAdmin;
