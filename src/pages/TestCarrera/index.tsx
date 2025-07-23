import React, { useState } from "react";
import "./TestCarrera.css";

const TestCarrera = () => {
  const [open, setOpen] = useState(false);

  const data = [
    {
      id: 1,
      nombre: "nombre",
      colegio: "colegio",
      curso: "curso",
      carrera: "carrera",
      aptitud: "aptitud",
    },
    {
      id: 2,
      nombre: "nombre",
      colegio: "colegio",
      curso: "curso",
      carrera: "carrera",
      aptitud: "aptitud",
    },
  ];

  return (
    <div className="test-carrera-contenedor">
      <h1>Tests de Carrera</h1>
      <button onClick={() => setOpen(true)}>Registrar Test</button>

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
        <tbody>
          {data.map((test) => (
            <tr key={test.id}>
              <td>{test.id}</td>
              <td>{test.nombre}</td>
              <td>{test.colegio}</td>
              <td>{test.curso}</td>
              <td>{test.carrera}</td>
              <td>{test.aptitud}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Registrar Test de Carrera</h2>
            <button className="modal-close" onClick={() => setOpen(false)}>
              &times;
            </button>

            <form>
              <label htmlFor="nombre">
                Nombre:
                <input id="nombre" type="text" required />
              </label>

              <label htmlFor="colegio">
                Colegio:
                <input id="colegio" type="text" required />
              </label>

              <label htmlFor="curso">
                Curso:
                <input id="curso" type="text" required />
              </label>

              <label htmlFor="carrera">
                Carrera:
                <input id="carrera" type="text" required />
              </label>

              <label htmlFor="aptitud">
                Aptitud:
                <input id="aptitud" type="text" required />
              </label>

              <button type="submit">Guardar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCarrera;
