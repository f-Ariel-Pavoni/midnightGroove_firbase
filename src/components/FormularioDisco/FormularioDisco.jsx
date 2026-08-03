import { useForm } from "react-hook-form";

const FormularioDisco = ({ onClose, crearDisco }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCrear = async (data) => {
    await crearDisco(data);
    console.log(data);
    reset();
    onClose();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCrear)}
        className="p-4 border rounded shadow-sm"
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Titulo
          </label>

          <input
            id="titulo"
            type="text"
            className="form-control"
            placeholder="titulo..."
            {...register("titulo", {
              required: "El titulo es requerido.",
            })}
          />
          {errors.titulo && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.titulo.message}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="artista" className="form-label">
            Artista
          </label>

          <input
            id="artista"
            type="text"
            className="form-control"
            placeholder="Artista..."
            autoComplete="artista"
            {...register("artista", {
              required: "El nombre del artista es requerido.",
            })}
          />
          {errors.artista && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.artista.message}
            </small>
          )}
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn btn-dark">
            Agregar
          </button>
        </div>
      </form>
    </>
  );
};

export default FormularioDisco;
