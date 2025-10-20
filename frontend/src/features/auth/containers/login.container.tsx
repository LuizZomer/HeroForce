import { useAuth } from "@/shared/hooks/use-auth.hook";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { LoginSchema } from "../hooks/use-login.hook";
import { LoginForm } from "../presenters/login-form.presenter";
import { LoginPresenter } from "../presenters/login-root.presenter";
import { toast } from "react-toastify";

export const LoginContainer = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate("/projects");
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    await mutateAsync(data).catch(() => {
      toast.error("Email ou senha inválidos");
    });
  };

  return (
    <LoginPresenter>
      <LoginForm onSubmit={onSubmit} isLoading={isPending} />
    </LoginPresenter>
  );
};
