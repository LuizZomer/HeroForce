import { api } from "@/shared/services/api";
import type { RegisterSchema } from "../hooks/use-register.hook";

export const registerRequest = async (
  data: Omit<RegisterSchema, "confirmPassword">
) => {
  const response = await api.post("/users", data);
  return response.data;
};
