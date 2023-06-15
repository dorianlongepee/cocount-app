import axios from "axios";
import { baseUrl } from "@/constants";

const expensesApi = axios.create({
  baseURL: baseUrl,
});

export const usersUrlEndpoint = "/expenses";

export const delExpense = async (id: string) => {
  const res = await expensesApi.delete(`${usersUrlEndpoint}/${id}`);
  return res.data;
};
