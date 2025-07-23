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
import Colegio from "./pages/Colegio";
import TestCarrera from "./pages/TestCarrera";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="/estudiante" element={<Estudiante />} />
        <Route path="/colegio" element={<Colegio />} />
        <Route path="/testCarrera" element={<TestCarrera />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
