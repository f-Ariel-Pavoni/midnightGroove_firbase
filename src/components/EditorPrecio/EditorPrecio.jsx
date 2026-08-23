import { useState } from "react";

const EditorPrecio = ({ disco, accion, onClose }) => {
  const [nuevoPrecio, setNuevoPrecio] = useState(disco.precio);
  const confirmar = () => {
    accion(disco.firebaseId, nuevoPrecio);
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
          onChange={(e) => setNuevoPrecio(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>

        <button className="btn btn-primary" onClick={confirmar}>
          Confirmar
        </button>
      </div>
    </>
  );
};

export default EditorPrecio;
