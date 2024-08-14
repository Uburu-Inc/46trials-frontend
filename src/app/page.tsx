import { LoginForm } from "./components/login-form";

function Login() {
  return (
    <main>
      <div className="flex items-center justify-center h-screen">
        <div className="w-[30rem]">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default Login;
