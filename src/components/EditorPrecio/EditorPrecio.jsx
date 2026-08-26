import { useState } from "react";

const EditorPrecio = ({ disco, accion, onClose, operacion }) => {
  const [nuevoPrecio, setNuevoPrecio] = useState(disco.precio);
  const confirmar = async () => {
    await accion(disco.firebaseId, nuevoPrecio);
    onClose();
  };

  return (
    <>
      <div className="mb-3">
        <p>
          Precio actual:{" "}
          {disco.precio != nuevoPrecio ? (
            <span className="text-decoration-line-through">{disco.precio}</span>
          ) : (
            disco.precio
          )}
        </p>
        <label className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          value={nuevoPrecio}
          disabled={Boolean(operacion)}
          onChange={(e) => setNuevoPrecio(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button
          className="btn btn-secondary"
          onClick={onClose}
          disabled={Boolean(operacion)}
        >
          Cancelar
        </button>

        <button
          className="btn btn-dark"
          disabled={Boolean(operacion)}
          onClick={confirmar}
        >
          {operacion === "actualizarPrecio" ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Guardando cambios...
            </>
          ) : (
            "Confirmar"
          )}
        </button>
      </div>
    </>
  );
};

export default EditorPrecio;
