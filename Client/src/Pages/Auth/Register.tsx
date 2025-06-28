import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../Stores/AuthStore";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Register = ({role}:{role:"child" | "parent"}) => {
  const [data,setData] = useState({
    userName:"",
    password:"",
    role:role,
    parentCode:""
  });

  const {isLoading, register} = useAuthStore();
  const navigate = useNavigate();

  const [cPassWord,setCPassword] = useState("");

  const formVerification = () =>{
    if (!data.userName) {
      toast.error("Please Enter Username");
      return false;
    }

    if (!data.password) {
      toast.error("Please Enter Password");
      return false;
    }

    if (!cPassWord) {
      toast.error("Please Enter Confirm Password");
      return false;
    }

    if (role === "child" && !data.parentCode ) {
      toast.error("Children must enter userName");
      return false;
    }

    if (data.password.length <= 6) {
      toast.error("Password must be atleast 6 charecter long");
      return false;
    }

    if (data.password !== cPassWord) {
      toast.error("Password does not match the confirm password");
      return false;
    }

    return true;
  }

  const onReset =() =>{
    setData({...data,
      userName:"",
      password:"",
      parentCode:""
    });
    setCPassword("");
  }


  const onSubmit = async (e:FormEvent) =>{
      e.preventDefault();

    if (!formVerification()) {
      return ;
    }

    const success = await register(data);

    if (success) {
      navigate(role==="child"?"/child":"/parent");
    } else{
      onReset()
    }
    
    }

  return (
    <form className="w-full h-full px-4 py-6 " onSubmit={onSubmit}>
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="name" className="md:text-8xl text-4xl text-Accent-Secondary mr-2">Name:</label>
        <input type="text" placeholder="Enter Your Name" value={data.userName} onChange={(e)=>setData({...data,userName:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="password" className="md:text-8xl text-4xl text-Accent-Secondary mr-2">Password: </label>
        <input type="password" placeholder="Enter Your Password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="password" className="md:text-7xl text-2xl text-Accent-Secondary mr-2">Confirm Password: </label>
        <input type="password" placeholder="Re-enter Your Password" value={cPassWord} onChange={(e)=>setCPassword(e.target.value)}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      {
        role === "child" && (
          <div className="w-full min-h-10 flex items-center">
        <label htmlFor="parentCode" className="md:text-6xl text-4xl text-Accent-Secondary mr-2">Enter Your Parent's Name: </label>
        <input type="text" placeholder="Enter Your password" value={data.parentCode} onChange={(e)=>setData({...data,parentCode:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
        )
      }

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

export default Register;