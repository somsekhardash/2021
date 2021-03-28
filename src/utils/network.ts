import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface RequestObject {
  url: string;
  method: "GET" | "POST" | "DELETE";
  data?: object | null;
  params?: object | null;
}

export const publicRequest = (request: RequestObject) => {
  return instance.request(request);
};
