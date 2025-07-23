import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../Stores/AuthStore";

const api = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5000/api",
  timeout: 10000
});

api.interceptors.request.use((config)=>{
  const authToken = useAuthStore.getState().token;
    try {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

    } catch (error) {
      console.error("Error parsing auth storage: ", error);
      toast.error("Error parsing auth storage: ");
    }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) =>{

    const url = error?.config.url;

    if(url === "/auth/login" || url === "/auth/register") return Promise.reject(error) ;
    
    if(error.response?.status === 401){
      localStorage.removeItem("auth-storage");
      toast.error("Session expired please login again");
      setTimeout(() =>{
        window.location.href ="/auth";
      }, 5000);
    } else {
      console.error("Server Error: ",error.respone.data);
      toast.error(`Server said: ${error.response?.data.error}`);
    }
    return Promise.reject(error);
  }
);

export default api;