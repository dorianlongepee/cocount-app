import axios from "axios";
import { baseUrl } from "@/constants";

const categoriesApi = axios.create({
  baseURL: baseUrl,
});

export const categories = "/categories";

export const delCategory = async (id: string) => {
  try {
    const res = await categoriesApi.delete(`${categories}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id: string, data: any) => {
  try {
    const res = await categoriesApi.put(`${categories}/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCategory = async (data: any) => {
  try {
    const res = await categoriesApi.post(`${categories}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
