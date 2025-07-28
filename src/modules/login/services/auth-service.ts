import api from "../../../services/api";
import { useAuthStore } from "../../../store/useAuthStore";
import type { IUsuario } from "../../../types/models";

export const Auth = async (usuario: IUsuario) => {
  const response = await api.post(`/Auth/Login`, usuario);
  const token = response.data.token;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const rol =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const user =
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  useAuthStore.getState().login(token, user, rol);
};
