import { useEffect, useState } from "react";
import api from "../API/axiosAPI";
import AddTodoButton from "../Components/AddTodoButton";
import TodoItem, { type TodoItemProps } from "../Components/TodoItem";
import toast from "react-hot-toast";

import "../App.css"
import { Link } from "react-router-dom";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);

  const getTodos = async () => {
    try {
      const response = await api.get("/chore");
      const todos = response.data;
      setTodo(todos);
      setError(false);
      console.log(todos[0]);
    } catch (error) {
      console.error("Something went wrong while fetching Chores: ", error);
      toast.error("Something went wrong while fetching Chores");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="h-[87vh] w-full pl-3 pt-2 bg-UI-4  flex flex-col">
      {loading ? (
       <div>Loading chores...</div>
      ) : error ? (
        <div>Failed to load chores</div>
      ) : todo.length === 0 ? (
      <div>No Chores found</div>
      ) : (
      <div className="flex-1 overflow-y-auto  pr-1">  
        {todo.map((item:TodoItemProps) => (
          <Link to={item._id} key={item._id}>
            <TodoItem item={item} />
          </Link>
        ))}
      </div>
)}

      
      <AddTodoButton />
    </div>
  );
};

export default Todo;