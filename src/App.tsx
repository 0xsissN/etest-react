import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
import { useAuthStore } from "./store/useAuthStore";

const AppRoute = () => {
  const { isAuthenticated, rol } = useAuthStore();
  const routes = router(isAuthenticated, rol);
  return useRoutes(routes);
};

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
