import { api } from "@/shared/services/api";
import type { LoginSchema } from "../hooks/use-login.hook";

export const loginRequest = async (data: LoginSchema) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
