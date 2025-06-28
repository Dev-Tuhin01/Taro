import { useEffect, useState } from "react";
import api from "../../API/axiosAPI";
import type { User } from "../../Stores/AuthStore";
import "../../App.css"

const Children = () =>{

  const [children, setChildren] = useState<User[]>()

  const getChildren = async () =>{
    try {
      const response = await api.get("/misc/Children/");
       setChildren(response.data);
       console.log(response.data);
    } catch (error) {
      console.error("Could not get your children",error);
      console.error("Could not get your children");
    }
  }

  useEffect(()=>{
    getChildren();
  },[]);
  return (
    <>
      <div className="bg-BG-Secondary py-2 h-full">{
        children ? (children.map((child)=>(
          <div className="bg-UI-2 mx-3 my-2 min-h-14 text-4xl md:px-20 px-8 flex items-center justify-between child" key={child._id}>
            <span>{child.userName}</span>
            <span>{child.taroDollar}</span>  
          </div>
        ))):(
          <div className="flex justify-center items-center h-full w-full text-4xl md:text-6xl">No Children Found!!!</div>
        )
        }</div>
    </>
  )
}

export default Children;