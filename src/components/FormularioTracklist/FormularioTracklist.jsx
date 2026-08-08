import { useFormContext, useFieldArray } from "react-hook-form";
import { useState } from "react";

const FormularioTracklist = () => {
  const { register, control, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tracklist",
  });

  const [temaEditando, setTemaEditando] = useState(null);

  const confirmarTema = (index) => {
    const titulo = getValues(`tracklist.${index}.titulo`);
    if (!titulo.trim()) return;

    setTemaEditando(null);
  };

  const agregarTema = () => {
    const nuevoIndex = fields.length;

    append({
      titulo: "",
    });

    setTemaEditando(nuevoIndex);
  };

  const eliminarTema = (index) => {
    remove(index);
    if (fields.length === 1) setTemaEditando(null);
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Tracklist</h5>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="fw-semibold">{index + 1}.</span>

              <input
                type="text"
                className="form-control"
                disabled={temaEditando !== index}
                {...register(`tracklist.${index}.titulo`)}
              />
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => confirmarTema(index)}
              >
                Agregar
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                disabled={temaEditando !== null && temaEditando !== index}
                onClick={() => eliminarTema(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-dark mt-2"
          disabled={temaEditando !== null}
          onClick={agregarTema}
        >
          + Agregar tema
        </button>
      </div>
    </div>
  );
};

export default FormularioTracklist;
