import { Outlet } from "react-router-dom";
import DynamicNav from "../../Components/DynamicNav";

const Child = () =>{

  const navItems = [
    {
      link: "children",
      title: "Children"
    }, {
      link:"chore",
      title: "Chores"
    }
  ]

  return (
    <div className="flex flex-col h-screen">
      <div className=" grow">
        <Outlet />
      </div>
      <DynamicNav navItemList={navItems} />
    </div>
  )
}

export default Child;