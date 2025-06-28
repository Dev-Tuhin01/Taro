import { LogOut, PawPrint } from "lucide-react"
import { useAuthStore } from "../Stores/AuthStore";

const Header = () => {
  const {user,isAuthenticated,logout} = useAuthStore()

  return (
    <div className="flex bg-BG-Dark text-UI-6 text-5xl px-4 min-h-10 w-full">
      <div className="flex items-center gap-2">
        Taro <PawPrint /> 
      </div>
      {isAuthenticated && user && <div className="grow justify-end items-center text-Text-Ligth flex gap-7 ">
        <div className="text-xl md:flex hidden gap-1 items-end border-r border-r-BG-Primary pr-2">
          <span>{user.userName}</span>
          <span className="text-xs opacity-85">{user.role}</span>
        </div>
        <button 
        className="flex gap-2 bg-Accent-Secondary p-2 max-h-10/12 rounded-full opacity-45 text-Text-Dark hover:opacity-100 hover:text-Text-Ligth cursor-pointer" onClick={logout}>
          < LogOut /> <span className="text-base">Logout</span>
        </button>
        </div>
        }
    </div>
  )
}

export default Header;