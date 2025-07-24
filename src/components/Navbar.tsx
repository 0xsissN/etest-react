import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <Link to="/estudiante">
          <li>Estudiante</li>
        </Link>
        <Link to="/colegio">
          <li>Colegio</li>
        </Link>
        <Link to="/testCarrera">
          <li>Test Carrera</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;