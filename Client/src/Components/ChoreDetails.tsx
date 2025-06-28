import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../API/axiosAPI";
import type { TodoItemProps } from "./TodoItem";

const ChoreDetails = () => {

  const {id} = useParams();
  const [chore, setChore] = useState<TodoItemProps>();
  

  const getChore = async()=>{
    const response = await api.get(`/chore/${id}`);
    console.log(response.data);
    setChore(response.data);
  }

  useEffect(()=>{
    getChore();
  },[])


  return(
  <div className="bg-Accent-Primary h-full w-full flex flex-col items-center">
    {chore && (<div className="bg-UI-4 w-[95%] h-[80vh] my-2 pt-5 flex flex-col items-center" style={{clipPath:"polygon(10% 5%, 90% 0%, 100% 100%, 0% 100%)"}}>
      <div className="md:text-8xl text-[45px]">{chore.title}</div>
      <div className="flex flex-col  items-start">
        <div className="">for: {chore.childId.userName}</div>
        <div className="">by: {chore.parentId.userName}</div>
      </div>
      <div className="md:text-5xl text-[40px] flex items-center ">
        Bounty: {chore.bounty} 
      </div>
          <div className="text-wrap w-3/4 h-3/5 bg-BG-Secondary flex justify-center items-center overflow-auto"
            style={{clipPath:"polygon(0% 0%, 100% 5%, 100% 90%, 0% 100%)"}}
          >
            <div className="text-justify px-2 md:py-0 pt-30">
              {chore.description ? chore.description : "No description is given"}
            </div>
          </div>
    </div>
    )}
  </div>
  )
}

export default ChoreDetails;