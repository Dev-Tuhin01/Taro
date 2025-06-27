
const TodoItem = () =>{
  return (
    <div className="w-full rounded-2xl bg-UI-9 p-2">
      <div className="border-b border-b-Accent-Primary">
        <div className="text-4xl text-BG-Dark">Title 1</div>
        <div className="line-clamp-1 opacity-35">Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores laborum neque aliquam ex, placeat tenetur consequatur eum, vel maxime odit cupiditate voluptates assumenda perferendis labore, nobis et magni dolores eaque.</div>
      </div>
      <div className="flex justify-items-center justify-between md:w-1/2">
        <div className="flex flex-wrap min-w-1/3">Created@: <span className="">28-09-2025</span></div>
        <div className="flex flex-wrap min-w-1/3">completed@: <span>Pending</span></div>
        <div className="flex flex-wrap min-w-1/3">Approved@: <span>28-09-2025</span></div>
      </div>
    </div>
  )
}

export default TodoItem;