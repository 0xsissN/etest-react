import { useState } from "react";
import Auth from "../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try{
        await Auth(username, password)
        window.location.href = "/Estudiante"
    }catch(err){
        console.log("error", err);
    }
  };

  return (
    <div className="contenedor">
      <h1>Login</h1>
      <div className="form">
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
        <button className="boton-registro" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
