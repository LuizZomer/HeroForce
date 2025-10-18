import { api } from "@/shared/services/api";

interface IMeResponse {
  user: User;
}

export const meRequest = async (): Promise<User> => {
  const res = await api.get<IMeResponse>("/auth/me");

  return res.data.user;
};
