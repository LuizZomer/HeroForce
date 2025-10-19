import { api } from "../api";
import { IForSelectList } from "../../types/for-select-list";

export const findAllResponsiblesForSelectRequest = async (): Promise<
  IForSelectList[]
> => {
  const res = await api.get("/users/for-select");

  return res.data.content;
};
