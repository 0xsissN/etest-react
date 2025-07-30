import { useForm, type SubmitHandler } from "react-hook-form";
import type { IEstudiante } from "../../../types/models";
import { putEstudiante } from "../services/estudiante-service";

interface Props {
  data: IEstudiante | null;
  onClose: () => void;
  onLoad: () => void;
}

const EstudiantePutForm = ({ data, onClose, onLoad }: Props) => {
  const { register, handleSubmit } = useForm<IEstudiante>();

  const onPutEstudiante: SubmitHandler<IEstudiante> = async (data) => {
    try {
      const estudianteActualizado = {
        ...data,
        estado: data.estado === true || data.estado === "true",
      };

      await putEstudiante(estudianteActualizado);
      onClose();
      onLoad();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="modal-back">
      <div className="modal-content">
        <h2>Editar Estudiante</h2>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <form onSubmit={handleSubmit(onPutEstudiante)}>
          <label htmlFor="edit-ci">
            CI:
            <input defaultValue={data?.ci} {...register("ci")} disabled />
          </label>

          <label htmlFor="edit-nombre">
            Nombre:
            <input
              defaultValue={data?.nombre}
              {...register("nombre", { pattern: /^[A-Za-z]+$/i })}
            />
          </label>

          <label htmlFor="edit-apellidoPaterno">
            Apellido Paterno:
            <input
              defaultValue={data?.apellidoPaterno}
              {...register("apellidoPaterno", { pattern: /^[A-Za-z]+$/i })}
            />
          </label>

          <label htmlFor="edit-apellidoMaterno">
            Apellido Materno:
            <input
              defaultValue={data?.apellidoMaterno}
              {...register("apellidoMaterno", { pattern: /^[A-Za-z]+$/i })}
            />
          </label>

          <label htmlFor="edit-fechaNacimiento">
            Fecha de Nacimiento:
            <input
              defaultValue={data?.fechaNacimiento}
              {...register("fechaNacimiento")}
              type="date"
            />
          </label>

          <label htmlFor="edit-estado">
            Estado:
            <select
              defaultValue={data?.estado ? "Activo" : "Desactivado"}
              {...register("estado")}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </label>

          <button className="boton-guardar" type="submit">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};
export default EstudiantePutForm;
