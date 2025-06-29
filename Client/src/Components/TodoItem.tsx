
export interface TodoItemProps {
  _id:string;
  _v:number;
  title:string;
  bounty:number;
  status: "pending" | "completed" | "approved" | "rejected";
  description?:string;
  completedAt?: Date;
  approvedAt?: Date;
  createdAt: Date;
  parentId:{
    _id:string;
    userName: string;
  };
  childId:{
    _id:string;
    userName: string;
  };
}

const TodoItem = ({item}:{item:TodoItemProps}) =>{

  const dateLocalize = (date?:Date) =>{
    if (!date) {
      console.log(date);
      return "pending";
    }
    return new Date(date).toLocaleDateString("en-In",{
      day: "2-digit",
      month: 'long',
      year: "numeric"
    });
  }

  return (
    <div className={`w-full rounded-2xl ${item.status === "completed"?"bg-UI-7":(item.status === "approved"?"bg-UI-10":"bg-UI-6")} border border-Accent-Primary hover:border-4 p-2 mb-2`}>
      <div className="border-b border-b-Accent-Primary">
        <div className="flex w-full">
          <div className="text-4xl text-BG-Dark">{item.title} </div>
          <div className="grow text-end md:text-2xl text-xl">{item.bounty}</div>
        </div>
        <div className="line-clamp-1 opacity-35">{item.description || "No description added"}</div>
      </div>
      <div className="flex justify-items-center justify-between md:w-1/2">
        <div className="flex flex-wrap min-w-1/3">Created@: <span className="pl-1">{item.createdAt ? dateLocalize(item.createdAt):"N/A"}</span></div>
        <div className="flex flex-wrap min-w-1/3">completed@: <span className="pl-1">{item.completedAt?dateLocalize(item.completedAt):"pending..."}</span></div>
        <div className="flex flex-wrap min-w-1/3">Approved@: <span className="pl-1">{item.approvedAt?dateLocalize(item.approvedAt):"pending..."}</span></div>
      </div>
    </div>
  )
}

export default TodoItem;