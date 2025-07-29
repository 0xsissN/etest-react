import { useEffect, useState } from "react";
import type { IAptitud, ICarrera, ITest } from "../../../types/models";
import { getAptitud } from "../services/aptitud-service";
import { getTest } from "../services/test-service";
import { getCarreraByAptitud } from "../services/carrera-service";
import { postTestCarrera } from "../services/test-carrera-service";

interface Props {
  onClose: () => void;
  onLoad: () => void;
}

export const TestCarreraFormPost = ({ onClose, onLoad }: Props) => {
  const [aptitudes, setAptitudes] = useState<IAptitud[]>([]);
  const [tests, setTests] = useState<ITest[]>([]);
  const [carreras, setCarreras] = useState<ICarrera[]>([]);
  const [seleccionAptitudes, setSeleccionAptitudes] = useState<number[]>([]);
  const [testCodigo, setTestCodigo] = useState("");

  const loadAptitudes = async () => {
    try {
      const response = await getAptitud();
      setAptitudes(response.data);
    } catch (err) {
      console.log("Error cargando aptitudes:", err);
    }
  };

  const loadTests = async () => {
    try {
      const response = await getTest();
      setTests(response.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const seleccionesAptitudes = (aptitudId: number) => {
    setSeleccionAptitudes((prev) =>
      prev.includes(aptitudId)
        ? prev.filter((id) => id !== aptitudId)
        : [...prev, aptitudId]
    );
  };

  const loadCarreras = async () => {
    try {
      const sAptitudes = seleccionAptitudes.map((aptitudID) =>
        getCarreraByAptitud(aptitudID)
      );

      const response = await Promise.all(sAptitudes);
      const listaCarreras = response.flatMap((res) => res.data);

      setCarreras(listaCarreras);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onPostCarrera = async (carrera_id: number) => {
    try {
      await postTestCarrera(testCodigo, carrera_id);
      onClose();
      onLoad();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onPostMultipleCarrera = () => {
    carreras.map((e) => onPostCarrera(e.id));
    setTestCodigo("");
  };

  useEffect(() => {
    loadCarreras();
    loadAptitudes();
    loadTests();
  }, [seleccionAptitudes]);

  return (
    <>
      <div className="modal-back">
        <div className="modal-content-t">
          <h1>Registrar Test de Carrera</h1>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>

          <form onSubmit={onPostMultipleCarrera}>
            <label htmlFor="test">
              Test:
              <select
                value={testCodigo}
                onChange={(e) => setTestCodigo(e.target.value)}
                required
              >
                <option value="">Seleccionar test</option>
                {tests.map((c) => (
                  <option key={c.id} value={c.codigo}>
                    Test id: {c.id}, Codigo: {c.codigo}, Nombre:{" "}
                    {c.nombreEstudiante}
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
                      onClick={() => seleccionesAptitudes(aptitud.id)}
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
    </>
  );
};
