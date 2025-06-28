import { CirclePlus } from "lucide-react"
import { useAuthStore } from "../Stores/AuthStore";

const AddTodoButton = () =>{

  const {user} = useAuthStore();

  if (user && user.role === "child") {
    return ;
  }

  return (
    <div className="bg-Accent-Primary text-Text-Ligth flex justify-center items-center rounded-xl aspect-square w-12 md:w-18 absolute bottom-1/12 right-2 ">
      <CirclePlus />
    </div>
  )
}

export default AddTodoButton;