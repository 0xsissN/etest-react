import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useAsyncError, useNavigate } from "react-router-dom";
import type {
  IAptitud,
  ICarrera,
  IColegio,
  ICurso,
  IEstudiante,
} from "../types/models";
import { getAptitud } from "../services/aptitudService";
import { getCarreraByAptitud } from "../services/carreraService";
import { getEstudiante } from "../services/estudianteService";
import { getColegio } from "../services/colegioService";
import { getCurso } from "../services/cursoService";

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
            <th>Nombre</th>
            <th>Colegio</th>
            <th>Curso</th>
            <th>Carreras</th>
            <th>Aptitudes</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      {open && (
        <div className="modal-back">
          <div className="modal-content-t">
            <h2>Registrar Test de Carrera</h2>
            <button className="modal-close" onClick={() => setOpen(false)}>
              &times;
            </button>

            <form>
              <label htmlFor="nombre">
                Estudiante:
                <select
                  value={estudiante}
                  onChange={(e) => setEstudiante(e.target.value)}
                  required
                >
                  <option value="">Seleccionar estudiante</option>
                  {estudiantes.map((est) => (
                    <option key={est.id} value={est.nombre}>
                      {est.nombre} {est.apellido_Paterno}
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
                    <option key={col.id} value={col.nombre}>
                      {col.nombre}
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
                    <option key={c.id} value={c.nombre}>
                      {c.nombre}
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
    </div>
  );
};

export default TestCarrera;
