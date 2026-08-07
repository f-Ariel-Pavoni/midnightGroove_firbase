import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { discoSchema as schema } from "../../schemas/discoSchema";
import usePortadas from "../../hooks/usePortadas";

const FormularioDisco = ({ onClose, onSubmit, ctaActivo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const { portadas, loading } = usePortadas();

  const handleCrear = async (data) => {
    await onSubmit(data);
    console.log(data);
    reset();
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCrear)} noValidate>
        {/*Titulo disco*/}
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Titulo <span className="text-danger">*</span>
          </label>

          <input
            id="titulo"
            type="text"
            className="form-control"
            placeholder="titulo..."
            {...register("titulo")}
          />
          {errors.titulo && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.titulo.message}
            </small>
          )}
        </div>

        {/*Artista*/}
        <div className="mb-3">
          <label htmlFor="artista" className="form-label">
            Artista <span className="text-danger">*</span>
          </label>

          <input
            id="artista"
            type="text"
            className="form-control"
            placeholder="Artista..."
            autoComplete="artista"
            {...register("artista")}
          />
          {errors.artista && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.artista.message}
            </small>
          )}
        </div>

        {/*Año*/}
        <div className="mb-3">
          <label htmlFor="anio" className="form-label">
            Año
          </label>

          <input
            id="anio"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            step="1"
            className="form-control"
            placeholder="Año..."
            {...register("anio", { valueAsNumber: true })}
          />
          {errors.anio && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.anio.message}
            </small>
          )}
        </div>

        {/*Genero*/}
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">
            Genero <span className="text-danger">*</span>
          </label>

          <input
            id="genero"
            type="text"
            className="form-control"
            placeholder="Genero..."
            {...register("genero")}
          />
          {errors.genero && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.genero.message}
            </small>
          )}
        </div>

        {/*Sello*/}
        <div className="mb-3">
          <label htmlFor="sello" className="form-label">
            Sello
          </label>

          <input
            id="sello"
            type="text"
            className="form-control"
            placeholder="Sello..."
            {...register("sello")}
          />
          {errors.sello && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.sello.message}
            </small>
          )}
        </div>

        {/*Descripcion*/}
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>

          <input
            id="descripcion"
            type="textarea"
            className="form-control"
            placeholder="Descripción..."
            {...register("descripcion")}
          />
          {errors.descripcion && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.descripcion.message}
            </small>
          )}
        </div>

        {/*Portada*/}
        <div className="mb-3">
          <label htmlFor="portada" className="form-label">
            Portada <span className="text-danger">*</span>
          </label>

          <select id="portada" className="form-select" {...register("portada")}>
            <option value="">Seleccionar portada</option>

            {portadas.map((item) => (
              <option key={item.firebaseId} value={item.portada}>
                {item.nombre}
              </option>
            ))}
          </select>

          {loading && (
            <small className="text-muted">Cargando portadas...</small>
          )}

          {errors.portada && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.portada.message}
            </small>
          )}
        </div>

        {/*Precio*/}
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio <span className="text-danger">*</span>
          </label>

          <input
            id="precio"
            type="number"
            min="1"
            step="0.1"
            className="form-control"
            placeholder="Precio..."
            {...register("precio", { valueAsNumber: true })}
          />
          {errors.precio && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.precio.message}
            </small>
          )}
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn btn-dark"
            disabled={!ctaActivo}
          >
            Agregar
          </button>
        </div>
      </form>
    </>
  );
};

export default FormularioDisco;
