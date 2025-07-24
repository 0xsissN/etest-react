import axios from "axios";
import {useAuthStore} from "../store/useAuthStore";

const Auth = async (username: string, password: string) => {
  const response = await axios.post("https://localhost:7089/api/Auth/Login", {
    username,
    password,
  });

  const token = response.data.token;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const rol =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const user =
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  useAuthStore.getState().login(token, user, rol);
};

export default Auth;
