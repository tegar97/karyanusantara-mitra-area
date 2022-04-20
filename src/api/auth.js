import axios from "axios";


export default {
  login: (credentials) => axios.post("/auth/umkm/login", credentials),
  details: (token) =>
    axios.get("/auth/umkm/me", {
      headers: {
        Authorization: token,
      },
    }),
  refresh: (token) =>
    axios.get("/auth/umkm/refresh", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  
};
