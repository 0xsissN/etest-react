import { useState } from "react";
import Auth from "../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await Auth(username, password);
      window.location.href = "/estudiante";
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="contenedor">
      <h1>Login</h1>
      <form action={handleLogin}>
        <label htmlFor="username">
          Usuario:
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="boton-guardar" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
