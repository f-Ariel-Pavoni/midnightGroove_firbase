import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const FormularioLogin = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { login } = useAuth();

  const handleLogin = async (data) => {
    const usuarioFirebase = await login(data.email, data.password);

    if (usuarioFirebase) {
      reset();
      onLogin(usuarioFirebase);
    } else {
      onLogin(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="p-4 border rounded shadow-sm"
      noValidate
    >
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>

        <input
          id="email"
          type="email"
          className="form-control"
          placeholder="Ingrese su email..."
          autoComplete="username"
          {...register("email", {
            required: "Correo electrónico es requerido.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato inválido",
            },
          })}
        />
        {errors.email && (
          <small className="text-danger d-block mt-1" role="alert">
            {errors.email.message}
          </small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="Ingrese su contraseña..."
          autoComplete="current-password"
          {...register("password", {
            required: "Contraseña es requerida.",
          })}
        />
        {errors.password && (
          <small className="text-danger d-block mt-1" role="alert">
            {errors.password.message}
          </small>
        )}
      </div>

      <button type="submit" className="btn btn-dark w-100">
        Ingresar
      </button>
    </form>
  );
};

export default FormularioLogin;
