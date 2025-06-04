import { Outlet } from "react-router-dom";
import DynamicNav from "../../Components/DynamicNav";

const Child = () =>{

  const navItems = [
    {
      link: "game",
      title: "Game"
    }, {
      link:"todo",
      title: "Todo"
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