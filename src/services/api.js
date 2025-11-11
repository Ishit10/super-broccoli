import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://friendly-palm-tree-x01v.onrender.com/api";

const instance = axios.create({
  baseURL: API_BASE,
});

export function setAuthToken(token) {
  if (token) instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete instance.defaults.headers.common["Authorization"];
}

export default instance;
