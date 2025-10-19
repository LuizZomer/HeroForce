import { useAuth } from "@/shared/hooks/use-auth.hook";
import type { LoginSchema } from "../hooks/use-login.hook";
import { LoginForm } from "../presenters/login-form.presenter";
import { LoginPresenter } from "../presenters/login-root.presenter";
import { useNavigate } from "react-router-dom";

export const LoginContainer = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {
    await signIn(data).then(() => {
      navigate("/projects");
    });
  };

  return (
    <LoginPresenter>
      <LoginForm onSubmit={onSubmit} />
    </LoginPresenter>
  );
};
