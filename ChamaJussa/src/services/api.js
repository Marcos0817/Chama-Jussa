import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
    baseURL: "http://172.16.36.27:5175/api",
    timeout: 10000
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(
    async (config) => {

        const token = await AsyncStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (erro) => {
        return Promise.reject(erro);
    }
);