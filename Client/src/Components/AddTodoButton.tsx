import { CirclePlus } from "lucide-react"
import { useAuthStore } from "../Stores/AuthStore";
import AddTodoModal from "./AddTodoModal";
import { useState } from "react";

const AddTodoButton = () =>{

  const {user} = useAuthStore();
  const [modal, setModal] = useState(false);

  if (user && user.role === "child") {
    return ;
  }

  return (
    <>
      <div className="bg-Accent-Primary text-Text-Ligth flex justify-center items-center rounded-xl aspect-square w-12 md:w-18 absolute bottom-1/12 right-2 " onClick={()=>setModal(true)}>
        <CirclePlus />
      </div>
      <AddTodoModal isLoaded={modal} setIsLoaded={setModal} />
    </>
  )
}

export default AddTodoButton;