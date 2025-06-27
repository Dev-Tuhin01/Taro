import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000
});

api.interceptors.request.use((config)=>{
  const authStorage = localStorage.getItem("auth-storage");
  if (authStorage) {
    try {
      const {state} = JSON.parse(authStorage);
      const token = state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error parsing auth storage: ", error);
      toast.error("Error parsing auth storage: ");
    }
  }
  return config;
});

api.interceptors.response.use(
  (respose) => respose,
  (error) =>{
    if(error.response?.status === 401){
      localStorage.removeItem("auth-storage");
      toast.error("Session expired please login again");
      window.location.href ="/auth";
    }
  }
);