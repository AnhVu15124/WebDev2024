import axios from "axios";

export const BASE_URL = "http://192.168.1.110:8080/";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default API;