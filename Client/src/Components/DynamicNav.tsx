import { NavLink } from "react-router-dom";

interface NavItem {
  link: string;
  title: string;
};

const DynamicNav = ({ navItemList }: { navItemList: NavItem[] }) => {
  return (
    <div className="flex justify-evenly bg-Accent-Primary text-4xl min-h-12 max-h-full">
      {navItemList.map((navItem, index) => (
        <NavLink
          key={index}
          to={navItem.link}
          className={({ isActive }) =>
            `px-4 py-2 grow text-center border border-Accent-Secondary transition-colors ${
              isActive
              ? "text-Text-Dark bg-Accent-Secondary border-2 border-Accent-Primary hover:bg-Accent-Secondary"
                : "text-Accent-Secondary hover:bg-Accent-Secondary hover:text-Text-Dark  transition-colors" // Active link styles
            }`
          }
        >
          {navItem.title}
        </NavLink>
      ))}
    </div>
  );
};

export default DynamicNav;
