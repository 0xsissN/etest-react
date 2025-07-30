import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { isAuthenticated, rol } = useAuthStore();

  if (isAuthenticated && rol === "Admin") {
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
  }

  if (isAuthenticated && rol === "Estudiante") {
    return <Link to="/estudiante"></Link>;
  }
};

export default Navbar;
