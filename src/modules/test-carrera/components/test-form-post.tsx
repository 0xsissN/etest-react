import { useForm, type SubmitHandler } from "react-hook-form";
import type {
  IColegio,
  ICurso,
  IEstudiante,
  ITest,
} from "../../../types/models";
import { postTest } from "../services/test-service";
import { useEffect, useState } from "react";
import { getEstudiante } from "../../estudiante/services/estudiante-service";
import { getColegio } from "../../colegio/services/colegio-service";
import { getCurso } from "../services/curso-service";

interface Props {
  onClose: () => void;
  onLoad: () => void;
}

const TestFormPost = ({ onClose, onLoad }: Props) => {
  const { register, handleSubmit } = useForm<ITest>();
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [colegios, setColegios] = useState<IColegio[]>([]);
  const [cursos, setCursos] = useState<ICurso[]>([]);

  const onPostTest: SubmitHandler<ITest> = async (data) => {
    try {
      await postTest(data);
      onClose();
      onLoad();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const loadEstudiantes = async () => {
    try {
      const response = await getEstudiante();
      setEstudiantes(response.data);
    } catch (err) {
      console.error("Error cargando estudiantes:", err);
    }
  };

  const loadColegios = async () => {
    try {
      const response = await getColegio();
      setColegios(response.data);
    } catch (err) {
      console.error("Error cargando colegios:", err);
    }
  };

  const loadCursos = async () => {
    try {
      const response = await getCurso();
      setCursos(response.data);
    } catch (err) {
      console.error("Error cargando cursos:", err);
    }
  };

  useEffect(() => {
    loadEstudiantes();
    loadColegios();
    loadCursos();
  });

  return (
    <>
      <div className="modal-back">
        <div className="modal-content-t">
          <h1>Registrar Test</h1>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>

          <form onSubmit={handleSubmit(onPostTest)}>
            <label htmlFor="codigo">
              Código:
              <input {...register("codigo", { required: true })} />
            </label>

            <label htmlFor="estudiante">
              Estudiante:
              <select {...register("estudianteCI", { required: true })}>
                <option value="">Seleccionar estudiante</option>
                {estudiantes.map((est) => (
                  <option key={est.ci} value={est.ci}>
                    {est.nombre} {est.apellidoPaterno} (CI: {est.ci})
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="colegio">
              Colegio:
              <select {...register("colegioCodigo", { required: true })}>
                <option value="">Seleccionar colegio</option>
                {colegios.map((col) => (
                  <option key={col.codigo} value={col.codigo}>
                    {col.nombre} (Código: {col.codigo})
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="curso">
              Curso:
              <select {...register("cursoId", { required: true })}>
                <option value="">Seleccionar curso</option>
                {cursos.map((c) => (
                  <option key={c.id} value={c.id.toString()}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </label>

            <button className="boton-guardar" type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default TestFormPost;
