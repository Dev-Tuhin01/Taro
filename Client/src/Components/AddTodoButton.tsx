import { CirclePlus } from "lucide-react"

const AddTodoButton = () =>{

  return (
    <div className="bg-Accent-Primary text-Text-Ligth flex justify-center items-center rounded-xl aspect-square w-12 md:w-18 absolute bottom-1/12 right-2 ">
      <CirclePlus />
    </div>
  )
}

export default AddTodoButton;