import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import { ColegioPage } from "./modules/colegio/pages";
import { EstudiantePage } from "./modules/estudiante/pages";
import { LoginPage } from "./modules/login/pages";
import { TestCarreraPage } from "./modules/test-carrera/pages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="/estudiante" element={<EstudiantePage />} />
        <Route path="/colegio" element={<ColegioPage />} />
        <Route path="/testCarrera" element={<TestCarreraPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
