import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.100:3001",
});

// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("userToken"); // Obtém o token armazenado
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // Define o cabeçalho Authorization
//   }
//   return config;
// });

export default api;
