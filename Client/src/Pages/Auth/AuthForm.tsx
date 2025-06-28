import { NavLink, Outlet } from "react-router-dom";

const AuthForm = () => {
  

  return (
    <div className="bg-UI-3 w-full h-full flex justify-center items-center relative">
      {/* Define SVG clipPath with curved top corners */}
      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id="curved-top" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.1 0
              A 0.1 0.1 0 0 0 0 0.1
              L 0 1
              L 1 1
              L 1 0.1
              A 0.1 0.1 0 0 0 0.9 0
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      {/* Apply the clipPath */}
      <div
        className="w-10/12 min-h-5/6 max-h-fit bg-Accent-Primary"
        style={{
          clipPath: "url(#curved-top)",
        }}
      >
        {/* Your form content goes here */}
        <div className="bg-BG-Dark min-h-24 w-full flex justify-around opacity-100 text-Text-Ligth border text-4xl border-b-BG-Primary " >
          <NavLink to="login" className="border-r w-1/2 border-r-BG-Primary flex items-center justify-center">Login</NavLink>
          <NavLink to="Register" className="w-1/2 flex items-center justify-center">Register</NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthForm;
