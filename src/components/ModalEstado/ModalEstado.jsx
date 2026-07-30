import "./ModalEstado.css";

const ModalEstado = ({ tipo, mensaje, accion, textoAccion, onClose }) => {
  const confirmar = () => {
    accion();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-estado card shadow">
        <div className="card-body text-center">
          <h5 className="card-title text-danger">
            {tipo === "error" ? "Error" : "Aviso"}
          </h5>

          <p className="card-text">{mensaje}</p>

          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>

            {accion && (
              <button className="btn btn-primary" onClick={confirmar}>
                {textoAccion}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEstado;
