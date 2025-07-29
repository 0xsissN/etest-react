import { useForm, type SubmitHandler } from "react-hook-form";
import type {
  IColegio,
  ICurso,
  IEstudiante,
  ITest,
} from "../../../types/models";
import { putTest } from "../services/test-service";
import { deleteTestCarrera } from "../services/test-carrera-service";
import { useEffect, useState } from "react";
import { getEstudiante } from "../../estudiante/services/estudiante-service";
import { getColegio } from "../../colegio/services/colegio-service";
import { getCurso } from "../services/curso-service";

interface Props {
  data: ITest | null;
  onClose: () => void;
}

export const TestCarreraPutForm = ({ data, onClose }: Props) => {
  const { register, handleSubmit } = useForm<ITest>();
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [colegios, setColegios] = useState<IColegio[]>([]);
  const [cursos, setCursos] = useState<ICurso[]>([]);

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

  const onPutTest: SubmitHandler<ITest> = async (data) => {
    console.log(data);
    
    try {
      const testCarreraActualizado = {
        ...data,
        estado: data.estado === true || data.estado === "true",
      };

      console.log(testCarreraActualizado);

      await putTest(testCarreraActualizado);
      onClose();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDeleteTestCarrera = async (
    test_id: number,
    carrera_id: number
  ) => {
    try {
      await deleteTestCarrera(test_id, carrera_id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEstudiantes();
    loadColegios();
    loadCursos();
  }, []);

  return (
    <div className="modal-back">
      <div className="modal-content-t">
        <h1>Editar Test de Carrera</h1>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <form onSubmit={handleSubmit(onPutTest)}>
          <label htmlFor="edit-codigo">
            Código:
            <input defaultValue={data?.codigo} value={data?.codigo} />
          </label>

          <label htmlFor="edit-estudiante">
            Estudiante:
            <select
              defaultValue={data?.nombreEstudiante}
              {...register("estudianteCI")}
            >
              <option>{data?.nombreEstudiante}</option>
              {estudiantes.map((est) => (
                <option key={est.ci} value={est.ci}>
                  {est.nombre} {est.apellidoPaterno} (CI: {est.ci})
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="edit-colegio">
            Colegio:
            <select defaultValue={data?.colegio} {...register("colegioCodigo")}>
              <option>{data?.colegio}</option>
              {colegios.map((col) => (
                <option key={col.codigo} value={col.codigo}>
                  {col.nombre} (Código: {col.codigo})
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="edit-curso">
            Curso:
            <select defaultValue={data?.curso} {...register("cursoID")}>
              <option>{data?.curso}</option>
              {cursos.map((c) => (
                <option key={c.id} value={c.id.toString()}>
                  {c.nombre}
                </option>
              ))}
            </select>
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

          <div className="a-c-contenedor">
            <div className="a-box">
              <h2>Aptitudes</h2>
              <div className="a-lista">
                {data?.aptitudes.map((aptitud) => (
                  <div key={aptitud.id} className="a-item">
                    {aptitud.carreras}
                  </div>
                ))}
              </div>
            </div>
            <div className="a-box">
              <h2>Carreras</h2>
              <div className="a-lista">
                {data?.carreras.map((carrera) => (
                  <div key={carrera.id} className="a-item">
                    {carrera.carreras}
                    <button
                      className="boton-eliminar"
                      onClick={() =>
                        handleDeleteTestCarrera(data.id, carrera.id)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="boton-guardar" type="submit">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};
