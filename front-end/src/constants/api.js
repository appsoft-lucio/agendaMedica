import axios from "axios";

const api = axios.create({
  baseURL: "https://back-end-autumn-sky-4114.fly.dev",
});

// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("userToken"); // Obtém o token armazenado
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // Define o cabeçalho Authorization
//   }
//   return config;
// });

export default api;
