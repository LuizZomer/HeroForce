import { api } from "@/shared/services/api";

export const logoutRequest = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
