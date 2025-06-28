import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Stores/AuthStore";
import { Loader2 } from "lucide-react";

const Login = ({role}:{role:"child" | "parent" }) => {

  const [data,setData] = useState({
    userName:"",
    password:"",
    role:role
  })

  const onReset =() =>{
    setData({...data,
      userName: "",
      password:"",
      
    });
  }

  const navigate = useNavigate();
  const { login, isLoading} = useAuthStore();


  const onSubmit = async (e:FormEvent) =>{
    e.preventDefault();

    if (!data.userName.trim() || !data.password.trim()) {
      return ;
    }

    const success = await login(data);
    if (success) {
      navigate(role==="child"?"/child":"/parent");
    } else{
      onReset()
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full h-full px-4 py-6 flex flex-col justify-self-center">
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="name" className="md:text-8xl text-4xl text-UI-7 mr-2">Name:</label>
        <input type="text" placeholder="Enter Your Name" value={data.userName} onChange={(e)=>setData({...data,userName:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="password" className="md:text-8xl text-4xl text-UI-7 mr-2">Password: </label>
        <input type="password" placeholder="Enter Your password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      <div className="flex justify-around mt-12">
        <button type="submit" 
        className="min-w-1/3 min-h-12 bg-UI-8 font-extrabold text-2xl rounded-full cursor-pointer" 
        disabled={ isLoading || !data.userName.trim() || !data.password.trim() }>
          {isLoading ? <Loader2 className="aspect-square w-5 animate-spin" /> : "Submit"}
        </button>
        <button type="reset" onClick={onReset}
        disabled={  isLoading || !data.userName.trim() || !data.password.trim() }
         className="min-w-1/3 min-h-12 bg-UI-3 rounded-full text-2xl cursor-pointer">
          {isLoading ? <Loader2 className="aspect-square w-5 animate-spin" /> : "Reset"}
        </button>
      </div>
    </form>
  )
}

export default Login;