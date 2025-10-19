import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { RegisterSchema } from "../hooks/use-register.hook";
import { RegisterForm } from "../presenters/register-form.presenter";
import { registerRequest } from "../requests/register.request";
import { RegisterPresenter } from "../presenters/register-root.presenter";

export const RegisterContainer = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      navigate("/auth");
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data;
    await mutateAsync(rest);
  };

  return (
    <RegisterPresenter>
      <RegisterForm onSubmit={onSubmit} isLoading={isPending} />
    </RegisterPresenter>
  );
};
