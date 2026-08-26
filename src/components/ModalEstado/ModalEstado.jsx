import "./ModalEstado.css";

const ModalEstado = ({
  tipo,
  mensaje,
  accion,
  textoAccion,
  onClose,
  operacion,
}) => {
  const confirmar = async () => {
    await accion();
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
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={Boolean(operacion)}
            >
              Cerrar
            </button>

            {accion && (
              <button
                className="btn btn-primary"
                onClick={confirmar}
                disabled={
                  operacion === "eliminar" || operacion === "toggleEstado"
                }
              >
                {operacion === "eliminar" || operacion === "toggleEstado" ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {operacion === "eliminar"
                      ? "Eliminando..."
                      : "Actualizando estado..."}
                  </>
                ) : (
                  textoAccion
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEstado;
