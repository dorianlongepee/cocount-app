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

export const updateExpense = async (id: string, data: any) => {
  try {
    const res = await expensesApi.put(`${usersUrlEndpoint}/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addExpense = async (data: any) => {
  try {
    const res = await expensesApi.post(`${usersUrlEndpoint}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
