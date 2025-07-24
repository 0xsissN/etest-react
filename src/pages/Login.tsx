import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(username, password);
  };

  return (
    <div className="contenedor">
      <h1>Login</h1>
      <form className="form" onSubmit={handleLogin}>
        <label htmlFor="username">
          Usuario:
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="boton-registro" type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
