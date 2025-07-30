import { Link } from "react-router-dom";
import ColegioList from "../components/list-colegio";
import EstudianteList from "../components/list-estudiante";
import TestCarreraList from "../components/list-test-carrera";

const ResumenPage = () => {
  return (
    <>
      <div className="navbar">
        <ul>
          <Link to="/resumen">
            <li>Resumen</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
        </ul>
      </div>

      <div className="contenedor">
        <h1>Colegios</h1>
        <ColegioList />
        <h1>Estudiantes</h1>
        <EstudianteList />
        <h1>Tests Carreras</h1>
        <TestCarreraList />
      </div>
    </>
  );
};

export default ResumenPage;
