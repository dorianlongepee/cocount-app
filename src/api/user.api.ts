import axios from "axios";
import { baseUrl } from "@/constants";

const userApi = axios.create({
  baseURL: baseUrl,
});

export const usersUrlEndpoint = "/user";

export const loginApi = async (email: string) => {
  const res = await userApi.post(`${usersUrlEndpoint}/login`, { email });
  return res.data;
};
