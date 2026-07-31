import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const FormularioLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, error, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioFirebase = await login(email, password);

    if (usuarioFirebase) {
      onLogin(usuarioFirebase);
    } else {
      onLogin(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>

        <input
          id="email"
          type="text"
          className="form-control"
          placeholder="Ingrese su email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      <button type="submit" className="btn btn-dark w-100">
        Ingresar
      </button>
    </form>
  );
};

export default FormularioLogin;
