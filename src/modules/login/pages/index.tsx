import LoginPostForm from "../components/form-post";

const LoginPage = () => {
  return (
    <div
      className="contenedor"
      style={{
        minHeight: "90vh",
      }}
    >
      <h1>Login</h1>
      <LoginPostForm />
    </div>
  );
};

export default LoginPage;
