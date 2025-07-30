import { useForm, type SubmitHandler } from "react-hook-form";
import type { IUsuario } from "../../../types/models";
import { Auth } from "../services/auth-service";

const LoginPostForm = () => {
  const { register, handleSubmit } = useForm<IUsuario>();

  const onLogin: SubmitHandler<IUsuario> = async (data) => {
    try {
      await Auth(data);
      window.location.href = "/estudiante";
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <label htmlFor="username">
        Usuario:
        <input {...register("username")} />
      </label>
      <label htmlFor="password">
        Password:
        <input {...register("password")} type="password" />
      </label>
      <button className="boton-guardar" type="submit" style={{
        marginTop: '10px' 
      }}>
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginPostForm;
