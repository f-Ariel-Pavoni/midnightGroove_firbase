import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usuarioSchema as schema } from "../../schemas/usuarioSchema";

const FormularioUsuario = ({ onClose, onSubmit, ctaActivo }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const handleCrear = async (data) => {
    await onSubmit(data);
    console.log(data);
    reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleCrear)} noValidate>
        {/*Nombre Usuario*/}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre <span className="text-danger">*</span>
          </label>

          <input
            id="nombre"
            type="text"
            className="form-control"
            placeholder="nombre..."
            {...register("nombre")}
          />
          {errors.nombre && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.nombre.message}
            </small>
          )}
        </div>

        {/*Apellido Usuario*/}
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido <span className="text-danger">*</span>
          </label>

          <input
            id="apellido"
            type="text"
            className="form-control"
            placeholder="apellido..."
            {...register("apellido")}
          />
          {errors.apellido && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.apellido.message}
            </small>
          )}
        </div>

        {/*Email*/}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email <span className="text-danger">*</span>
          </label>

          <input
            id="email"
            type="text"
            className="form-control"
            placeholder="Email..."
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.email.message}
            </small>
          )}
        </div>

        {/*password*/}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password <span className="text-danger">*</span>
          </label>

          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Password..."
            {...register("password")}
          />
          {errors.password && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.password.message}
            </small>
          )}
        </div>

        {/* Rol */}
        <div className="mb-3">
          <label htmlFor="rol" className="form-label">
            Rol <span className="text-danger">*</span>
          </label>

          <select id="rol" className="form-select" {...register("rol")}>
            <option value="">Seleccionar rol...</option>
            <option value="admin">Administrador</option>
            <option value="usuario">Usuario</option>
          </select>

          {errors.rol && (
            <small className="text-danger d-block mt-1" role="alert">
              {errors.rol.message}
            </small>
          )}
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button type="submit" className="btn btn-dark" disabled={!ctaActivo}>
            Agregar
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormularioUsuario;
