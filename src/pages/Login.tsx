import Auth from "../services/authService";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ILogin } from "../types/models";

const Login = () => {
  const { register, handleSubmit } = useForm<ILogin>();

  const onLogin: SubmitHandler<ILogin> = async (data) => {
    try {
      await Auth(data.username, data.password);
      window.location.href = "/estudiante";
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="contenedor">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onLogin)}>
        <label htmlFor="username">
          Usuario:
          <input {...register("username")} />
        </label>
        <label htmlFor="password">
          Password:
          <input {...register("password")} type="password"/>
        </label>
        <button className="boton-guardar" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
