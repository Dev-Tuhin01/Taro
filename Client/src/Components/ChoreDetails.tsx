import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../API/axiosAPI";
import type { TodoItemProps } from "./TodoItem";
import { useAuthStore } from "../Stores/AuthStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ChoreDetails = () => {

  const {id} = useParams();
  const [chore, setChore] = useState<TodoItemProps>();
  const [loading,setLoading] = useState(false);

  const { user } = useAuthStore();


  const getChore = async()=>{
    const response = await api.get(`/chore/${id}`);
    setChore(response.data);
  }


    const navigate = useNavigate();

    const back = ()=>{
      navigate(-1);
    }

    const choreComplete = async () => {
      try {
        setLoading(true);
        console.log("click")
        const response = await api.patch(`/chore/${id}/complete/`);
        const success = response.status === 200;
        if (success) {
          toast.success("Chore Completed response submitted. Taro Dollars will be creditted when your parents approve it");
        } else{
          console.log(response.data.error);
        }
      } catch (error) {
        console.error("Something Went wrong when processing the chore",error);
        toast.error("Something Went wrong when processing the chore");
      } finally {
        setLoading(false);
        back();
      }
    }

    const choreApproved = async () => {
      try {
        setLoading(true);
        console.log("click")
        const response = await api.patch(`/chore/${id}/approve/`);
        const success = response.status === 200;
        if (success) {
          toast.success("Chore Completed response submitted. Taro Dollars will be creditted when your parents approve it");
        } else{
          console.log(response.data.error);
        }
      } catch (error) {
        console.error("Something Went wrong when processing the chore",error);
        toast.error("Something Went wrong when processing the chore");
      } finally {
        setLoading(false);
        back();
      }
    }

  useEffect(()=>{
    getChore();
  },[])


  return(
  <div className="bg-Accent-Primary h-full w-full flex flex-col items-center">
    {chore && (<div className="bg-UI-4 w-[95%] h-[85vh] my-2 pt-5 flex flex-col items-center" style={{clipPath:"polygon(10% 5%, 90% 0%, 100% 100%, 0% 100%)"}}>
      <div className="md:text-8xl text-[45px]">{chore.title}</div>
      <div className="flex flex-col  items-start">
        <div className="">for: {chore.childId.userName}</div>
        <div className="">by: {chore.parentId.userName}</div>
      </div>
      <div className="md:text-5xl text-[40px] flex items-center ">
        Bounty: {chore.bounty} 
      </div>
      <div className="md:w-1/2 w-[85%] flex justify-between py-1">
        {user?.role === "child" && chore.status === "pending" && (
          <button className="bg-UI-7 p-2 rounded-full border hover:border-2 border-Accent-Primary"
          onClick={choreComplete} disabled={loading}>{loading ?( <Loader2 className="aspect-square w-5 animate-spin" /> ) :"Chore Completed"}</button>
        )
      }
        {
          user?.role === "parent" && chore.status === "completed" && (
            <button className="bg-UI-7 p-2 rounded-full border hover:border-2 border-Accent-Primary" 
              disabled={loading} onClick={choreApproved}
            >{loading ? <Loader2 className="aspect-square w-5 animate-spin" /> :"Chore Approved"}</button>
          )
        }
        
        <button className="bg-UI-6 p-2 rounded-full border hover:border-2 border-Accent-Primary" onClick={back} disabled={loading}>{loading? <Loader2 className="aspect-square w-5 animate-spin" /> :"Let's Get Back"}</button>
      </div>
      <div className="text-wrap w-3/4 h-2/3  bg-BG-Secondary flex justify-center items-center overflow-auto"
        style={{clipPath:"polygon(0% 0%, 100% 5%, 100% 90%, 0% 100%)"}}
      >
        <div className="text-justify px-2 md:py-0 pt-30 pb-10">
          {chore.description ? chore.description : "No description is given"}
        </div>
      </div>
    </div>
    )}
  </div>
  )
}

export default ChoreDetails;