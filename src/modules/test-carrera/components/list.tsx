import { useEffect, useState } from "react";
import type { ITest } from "../../../types/models";
import { deleteTest, getTest } from "../services/test-service";
import { getAptitudByID } from "../services/aptitud-service";
import { getCarreraByID } from "../services/test-carrera-service";
import { TestCarreraPutForm } from "./test-carrera-put";

export const TestCarreraList = () => {
  const [tests, setTests] = useState<ITest[]>([]);
  const [test, setTest] = useState<ITest | null>(null);
  const [open, setOpen] = useState(false);

  const loadTests = async () => {
    try {
      const response = await getTest();
      const testsCompleto = await Promise.all(
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
      setTests(testsCompleto);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDeleteTest = async (codigo: string) => {
    try {
      await deleteTest(codigo);
      loadTests();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  return (
    <>
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
              <td>{test.nombreEstudiante}</td>
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
                  onClick={() => {
                    setOpen(true);
                    setTest(test);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <TestCarreraPutForm data={test} onClose={() => setOpen(false)} />
      )}
    </>
  );
};
