import axios from "axios";
import { baseUrl } from "@/constants";

const userApi = axios.create({
  baseURL: baseUrl,
});

export const usersUrlEndpoint = "/user";

export const loginUser = async (email: string) => {
  const res = await userApi.post(`${usersUrlEndpoint}/login`, { email });
  return res.data;
};

export const updateUserInfos = async (id: string, data: any) => {
  const res = await userApi.put(`${usersUrlEndpoint}/${id}`, data);
  return res.data;
};
