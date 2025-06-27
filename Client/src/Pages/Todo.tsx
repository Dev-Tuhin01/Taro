import AddTodoButton from "../Components/AddTodoButton";
import TodoItem from "../Components/TodoItem";

const Todo = () =>{
  return ( 
    <div className="h-full w-full px-3 py-2 bg-UI-4">
      <TodoItem />
      <AddTodoButton />
    </div>
  )
}

export default Todo;