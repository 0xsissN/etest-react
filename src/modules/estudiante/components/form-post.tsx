import { useForm, type SubmitHandler } from "react-hook-form";
import type { IEstudiante } from "../../../types/models";
import { postEstudiante } from "../services/estudiante-service";

interface Props {
  onClose: () => void;
  onLoad: () => void
}

export const EstudiantePostForm = ({ onClose, onLoad }: Props) => {
  const { register, handleSubmit } = useForm<IEstudiante>();

  const onPostEstudiante: SubmitHandler<IEstudiante> = async (data) => {
    try {
      await postEstudiante(data);
      onClose();
      onLoad();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="modal-back">
      <div className="modal-content">
        <h2>Formulario de Estudiante</h2>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <form onSubmit={handleSubmit(onPostEstudiante)}>
          <label htmlFor="ci">
            CI:
            <input {...register("ci")} />
          </label>

          <label htmlFor="nombre">
            Nombre:
            <input {...register("nombre")} />
          </label>

          <label htmlFor="apellidoPaterno">
            Apellido Paterno:
            <input {...register("apellidoPaterno")} />
          </label>

          <label htmlFor="apellidoMaterno">
            Apellido Materno:
            <input {...register("apellidoMaterno")} />
          </label>

          <label htmlFor="fechaNacimiento">
            Fecha de Nacimiento:
            <input {...register("fechaNacimiento")} type="date" />
          </label>

          <button className="boton-guardar" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};
