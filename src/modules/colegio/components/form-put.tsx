import { useForm, type SubmitHandler } from "react-hook-form";
import type { IColegio } from "../../../types/models";
import { putColegio } from "../services/colegio-service";

interface Props {
  data: IColegio | null;
  onClose: () => void;
  onLoad: () => void;
}

const ColegioPutForm = ({ data, onClose, onLoad }: Props) => {
  const { register, handleSubmit } = useForm<IColegio>();

  const onPutColegio: SubmitHandler<IColegio> = async (data) => {
    try {
      const colegioActualizado = {
        ...data,
        estado: data.estado === true || data.estado === "true",
      };

      await putColegio(colegioActualizado);
      onClose();
      onLoad();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="modal-back">
      <div className="modal-content">
        <h2>Editar Colegio</h2>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <form onSubmit={handleSubmit(onPutColegio)}>
          <label htmlFor="edit-codigo">
            Código:
            <input
              defaultValue={data?.codigo}
              {...register("codigo")}
              disabled
            />
          </label>

          <label htmlFor="edit-nombre">
            Nombre:
            <input
              defaultValue={data?.nombre}
              {...register("nombre", { pattern: /^[A-Za-z]+$/i })}
            />
          </label>

          <label htmlFor="edit-direccion">
            Dirección:
            <input
              defaultValue={data?.direccion}
              {...register("direccion", { pattern: /^[A-Za-z]+$/i })}
            />
          </label>

          <label htmlFor="edit-estado">
            Estado:
            <select
              defaultValue={data?.estado === true ? "Activo" : "Desactivado"}
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

export default ColegioPutForm;
