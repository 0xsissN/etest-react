import { useEffect, useState } from "react";
import type { ITest } from "../../../types/models";
import { getAptitudByID } from "../../test-carrera/services/aptitud-service";
import { getCarreraByID } from "../../test-carrera/services/test-carrera-service";
import { getTest } from "../../test-carrera/services/test-service";

const TestCarreraList = () => {
  const [tests, setTests] = useState<ITest[]>([]);

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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TestCarreraList;
