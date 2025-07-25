import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import type {
  IAptitud,
  ICarrera,
  IColegio,
  ICurso,
  IEstudiante,
  ISeleccion,
  ITest,
} from "../types/models";
import { getAptitud, getAptitudByID } from "../services/aptitudService";
import { getCarreraByAptitud } from "../services/carreraService";
import { getEstudiante } from "../services/estudianteService";
import { getColegio } from "../services/colegioService";
import { getCurso } from "../services/cursoService";
import {
  deleteTest,
  getTest,
  postTest,
  putTest,
} from "../services/testService";
import {
  deleteTestCarrera,
  getCarreraByID,
  postTestCarrera,
} from "../services/testCarreraService";

const TestCarrera = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [aptitudes, setAptitudes] = useState<IAptitud[]>([]);
  const [seleccionAptitudes, setSeleccionAptitudes] = useState<number[]>([]);
  const [carreras, setCarreras] = useState<ICarrera[]>([]);
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [colegios, setColegios] = useState<IColegio[]>([]);
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [estudiante, setEstudiante] = useState("");
  const [colegio, setColegio] = useState("");
  const [curso, setCurso] = useState("");
  const [tests, setTests] = useState<ITest[]>([]);
  const [codigo, setCodigo] = useState("");
  const [test, setTest] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [testID, setTestID] = useState<ITest | null>(null);
  const [estado, setEstado] = useState(false);
  const [selCarrera, setSelCarrera] = useState<ISeleccion[]>([]);
  const [selAptitud, setSelAptitud] = useState<ISeleccion[]>([]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const loadAptitudes = async () => {
    try {
      const response = await getAptitud();
      setAptitudes(response.data);
    } catch (err) {
      console.error("Error cargando aptitudes:", err);
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

  const loadTests = async () => {
    try {
      const response = await getTest();
      const testsAptCar = await Promise.all(
        response.data.map(async (test: ITest) => {
          const aptitudes = await getAptitudByID(test.id);
          const carreras = await getCarreraByID(test.id);

          return {
            ...test,
            aptitudes: aptitudes.data,
            carreras: carreras.data,
          };
        })
      );
      setTests(testsAptCar);
    } catch (err) {
      console.error("Error cargando tests:", err);
    }
  };

  const handlePostTest = async () => {
    try {
      await postTest(codigo, estudiante, colegio, curso);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handlePostCarrera = async (carrera_id: number) => {
    try {
      await postTestCarrera(test, carrera_id);
    } catch (err) {
      console.error("Error:", err);
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

  const openEditModal = (test: ITest) => {
    setTestID(test);
    setCodigo(test.codigo);
    setEstudiante(test.ci);
    setColegio(test.codigoColegio);
    setCurso(test.cursoId.toString());
    setEstado(test.estado);
    setSelCarrera(test.carreras);
    setSelAptitud(test.aptitudes);
    setEditOpen(true);
  };

  const handlePutTest = async (
    t_codigo: string,
    t_estudiante_ci: string,
    t_colegio_codigo: string,
    t_curso_id: string,
    t_estado: boolean
  ) => {
    try {
      await putTest(
        t_codigo,
        t_estudiante_ci,
        t_colegio_codigo,
        t_curso_id,
        t_estado
      );

      loadTests();
      setEditOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMultiplesCarreras = () => {
    carreras.map((e) => handlePostCarrera(e.id));
    loadTests();
    setTest("");
  };

  const handleDeleteTest = async (t_codigo: string) => {
    try {
      await deleteTest(t_codigo);
      loadTests();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const toggleAptitudSeleccion = (aptitudId: number) => {
    setSeleccionAptitudes((prev) =>
      prev.includes(aptitudId)
        ? prev.filter((id) => id !== aptitudId)
        : [...prev, aptitudId]
    );
  };

  useEffect(() => {
    const getCarreras = async () => {
      if (seleccionAptitudes.length === 0) {
        setCarreras([]);
        return;
      }

      try {
        const p_aptitudes = seleccionAptitudes.map((aptitudId) =>
          getCarreraByAptitud(aptitudId)
        );

        const response = await Promise.all(p_aptitudes);
        const listCarreras = response.flatMap((res) => res.data);

        setCarreras(listCarreras);
      } catch (err) {
        console.error("Error:", err);
        setCarreras([]);
      }
    };

    getCarreras();
  }, [seleccionAptitudes]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    loadAptitudes();
    loadEstudiantes();
    loadColegios();
    loadCursos();
    loadTests();
  }, []);

  return (
    <div className="contenedor">
      <div className="descripcion">
        <h1>Tests Carreras</h1>
        <button className="boton-registro" onClick={() => setOpen(true)}>
          Registrar Test
        </button>
        <button className="boton-registro" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Codigo</th>
            <th>Nombre Estudiante</th>
            <th>Colegio</th>
            <th>Curso</th>
            <th>Estado</th>
            <th>Aptitudes</th>
            <th>Carreras</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.id}>
              <td>{test.id}</td>
              <td>{test.codigo}</td>
              <td>{test.nombre_Estudiante}</td>
              <td>{test.colegio}</td>
              <td>{test.curso}</td>
              <td>{test.estado ? "Activo" : "Desactivado"}</td>
              <td>
                {test.aptitudes?.map((aptitud) => (
                  <div key={aptitud.id}>{aptitud.carreras}</div>
                ))}
              </td>
              <td>
                {test.carreras?.map((carrera) => (
                  <div key={carrera.id}>{carrera.carreras}</div>
                ))}
              </td>
              <td>
                <button
                  className="boton-actualizado"
                  onClick={() => handleDeleteTest(test.codigo)}
                >
                  Eliminar
                </button>
              </td>
              <td>
                <button
                  className="boton-actualizado"
                  onClick={() => openEditModal(test)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="modal-back">
          <div className="modal-content-t">
            <h1>Registrar Test de Carrera</h1>
            <button className="modal-close" onClick={() => setOpen(false)}>
              &times;
            </button>

            <form onSubmit={handlePostTest}>
              <label htmlFor="codigo">
                Código:
                <input
                  id="codigo"
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                />
              </label>

              <label htmlFor="estudiante">
                Estudiante:
                <select
                  value={estudiante}
                  onChange={(e) => setEstudiante(e.target.value)}
                  required
                >
                  <option value="">Seleccionar estudiante</option>
                  {estudiantes.map((est) => (
                    <option key={est.ci} value={est.ci}>
                      {est.nombre} {est.apellido_Paterno} (CI: {est.ci})
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="colegio">
                Colegio:
                <select
                  value={colegio}
                  onChange={(e) => setColegio(e.target.value)}
                  required
                >
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
                <select
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  required
                >
                  <option value="">Seleccionar curso</option>
                  {cursos.map((c) => (
                    <option key={c.id} value={c.id.toString()}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <button className="boton-guardar" type="submit">
                Guardar Test
              </button>
            </form>
            <form onSubmit={handleMultiplesCarreras}>
              <label htmlFor="test">
                Test:
                <select
                  value={test}
                  onChange={(e) => setTest(e.target.value)}
                  required
                >
                  <option value="">Seleccionar test</option>
                  {tests.map((c) => (
                    <option key={c.id} value={c.codigo}>
                      Test id: {c.id}, Codigo: {c.codigo}, Nombre:{" "}
                      {c.nombre_Estudiante}
                    </option>
                  ))}
                </select>
              </label>

              <div className="a-c-contenedor">
                <div className="a-box">
                  <h2>Aptitudes</h2>
                  <div className="a-lista">
                    {aptitudes.map((aptitud) => (
                      <div
                        key={aptitud.id}
                        className="a-item"
                        onClick={() => toggleAptitudSeleccion(aptitud.id)}
                      >
                        {aptitud.nombre}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="a-box">
                  <h2>Carreras</h2>
                  <div className="a-lista">
                    {carreras.map((carrera) => (
                      <div key={carrera.id} className="a-item">
                        {carrera.nombre}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button className="boton-guardar" type="submit">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
      {editOpen && testID && (
        <div className="modal-back">
          <div className="modal-content-t">
            <h1>Editar Test de Carrera</h1>
            <button
              className="modal-close"
              onClick={() => {
                setEditOpen(false);
                setCodigo("");
                setEstudiante("");
                setColegio("");
                setCurso("");
                setSelCarrera([]);
                setSelAptitud([]);
              }}
            >
              &times;
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePutTest(
                  testID.codigo,
                  estudiante,
                  colegio,
                  curso,
                  estado
                );
              }}
            >
              <label htmlFor="edit-codigo">
                Código:
                <input
                  id="edit-codigo"
                  type="text"
                  value={testID.codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                  disabled
                />
              </label>

              <label htmlFor="edit-estudiante">
                Estudiante:
                <select
                  value={estudiante}
                  onChange={(e) => setEstudiante(e.target.value)}
                  required
                >
                  <option value="">Seleccionar estudiante</option>
                  {estudiantes.map((est) => (
                    <option key={est.ci} value={est.ci}>
                      {est.nombre} {est.apellido_Paterno} (CI: {est.ci})
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="edit-colegio">
                Colegio:
                <select
                  value={colegio}
                  onChange={(e) => setColegio(e.target.value)}
                  required
                >
                  <option value="">Seleccionar colegio</option>
                  {colegios.map((col) => (
                    <option key={col.codigo} value={col.codigo}>
                      {col.nombre} (Código: {col.codigo})
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="edit-curso">
                Curso:
                <select
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  required
                >
                  <option value="">Seleccionar curso</option>
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
                  value={estado ? "1" : "0"}
                  onChange={(e) => setEstado(e.target.value === "1")}
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </label>

              <div className="a-c-contenedor">
                <div className="a-box">
                  <h2>Aptitudes</h2>
                  <div className="a-lista">
                    {selAptitud.map((aptitud) => (
                      <div
                        key={aptitud.id}
                        className="a-item"
                        onClick={() => toggleAptitudSeleccion(aptitud.id)}
                      >
                        {aptitud.carreras}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="a-box">
                  <h2>Carreras</h2>
                  <div className="a-lista">
                    {selCarrera.map((carrera) => (
                      <div key={carrera.id} className="a-item">
                        {carrera.carreras}
                        <button
                          className="boton-eliminar"
                          onClick={() =>
                            handleDeleteTestCarrera(testID.id, carrera.id)
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
      )}
    </div>
  );
};

export default TestCarrera;
