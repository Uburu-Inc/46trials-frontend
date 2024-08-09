import { LoginForm } from "./components/login-form";
import { AppContextContainer } from "@/app/context";

function Login() {
  return (
    <AppContextContainer>
      <main>
        <div className="flex items-center justify-center h-screen">
          <div className="w-[30rem]">
            <LoginForm />
          </div>
        </div>
      </main>
    </AppContextContainer>
  );
}

export default Login;
