import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft, CircleSlash2 } from "lucide-react";

const NotFound = () =>{
  toast.error("Oops looks like someone is missing",{icon:<CircleSlash2/>});
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-UI-6 h-screen text-4xl md:text-6xl justify-center items-center">
      <div className="text-BG-Primary">404, The page you are looking for not Found!!! 😔</div>
      <button
      className="flex items-center justify-between bg-UI-7 p-4 mt-4 text-2xl border-2 border-Accent-Primary rounded-full font-extrabold cursor-pointer hover:text-Text-Ligth"
      onClick={()=>{
          navigate(-1);
        }
      } >Let's Get You back Back <ArrowBigLeft /></button>
    </div>

  )
}

export default NotFound;