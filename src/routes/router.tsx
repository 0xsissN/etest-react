import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Layout from "../modules/_layout";
const LoginPage = lazy(() => import("../modules/login/pages"));
const ColegioPage = lazy(() => import("../modules/colegio/pages"));
const EstudiantePage = lazy(() => import("../modules/estudiante/pages"));
const TestCarreraPage = lazy(() => import("../modules/test-carrera/pages"));
const ResumenPage = lazy(() => import("../modules/resumen/pages"));

const router = (
  isAuthenticated: boolean,
  rol: string | null
): RouteObject[] => {
  if (!isAuthenticated) {
    return [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "resumen",
        element: <ResumenPage />,
      },
      {
        path: "*",
        element: <ResumenPage />,
      },
    ];
  }

  return [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "colegio",
          element: rol === "Admin" ? <ColegioPage /> : <LoginPage />,
        },
        {
          path: "estudiante",
          element:
            rol === "Admin" || rol === "Estudiante" ? (
              <EstudiantePage />
            ) : (
              <LoginPage />
            ),
        },
        {
          path: "testCarrera",
          element: rol === "Admin" ? <TestCarreraPage /> : <LoginPage />,
        },
      ],
    },
  ];
};

export default router;
