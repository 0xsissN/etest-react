import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import Login from "./pages/Login";
import Estudiante from "./pages/Estudiante";
import TestCarrera from "./pages/TestCarrera";
import { ColegioPage } from "./modules/colegio/pages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="/estudiante" element={<Estudiante />} />
        <Route path="/colegio" element={<ColegioPage />} />
        <Route path="/testCarrera" element={<TestCarrera />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
