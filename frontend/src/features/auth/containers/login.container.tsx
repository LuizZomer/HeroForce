import type { LoginSchema } from "../hooks/use-login.hook";
import { LoginForm } from "../presenters/login-form.presenter";
import { LoginPresenter } from "../presenters/login-root.presenter";
import { loginRequest } from "../requests/login.request";

export const LoginContainer = () => {
  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
    await loginRequest(data);
  };

  return (
    <LoginPresenter>
      <LoginForm onSubmit={onSubmit} />
    </LoginPresenter>
  );
};
