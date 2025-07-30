import { useForm, type SubmitHandler } from "react-hook-form";
import type { IColegio } from "../../../types/models";
import { postColegio } from "../services/colegio-service";

interface Props {
  onClose: () => void;
  onLoad: () => void;
}

const ColegioPostForm = ({ onClose, onLoad }: Props) => {
  const { register, handleSubmit } = useForm<IColegio>();

  const onPostColegio: SubmitHandler<IColegio> = async (data) => {
    try {
      await postColegio(data);
      onClose();
      onLoad();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="modal-back">
      <div className="modal-content">
        <h2>Formulario de Colegio</h2>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <form onSubmit={handleSubmit(onPostColegio)}>
          <label htmlFor="nombre">
            Nombre:
            <input {...register("nombre")} />
          </label>

          <label htmlFor="direccion">
            Dirección:
            <input {...register("direccion")} />
          </label>

          <label htmlFor="codigo">
            Código:
            <input {...register("codigo")} />
          </label>

          <button className="boton-guardar" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ColegioPostForm;
