import { NavLink } from "react-router-dom";

const Auth = () => {
  return (
    <div className="h-full bg-UI-1 flex justify-center items-center">
      <div className="text-6xl text-UI-10 text-center">
        Hello There! So Tell us, who are you?
        <div className="flex justify-around mt-12 w max-w-4xl gap-10">
          {/* Child button with simulated border using wrapper */}
          <div
            className="p-0.5 bg-Accent-Primary min-w-6/12 "
            style={{
              clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <NavLink
              to="child"
              className="bg-UI-7 w-full h-full block py-4 hover:animate-pulse text-center text-3xl text-white font-semibold"
              style={{
                clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 1% 100%)",
              }}
            >
              Child
            </NavLink>
          </div>

          {/* Parent button with same simulated border method */}
          <div
            className="p-0.5 bg-Accent-Primary min-w-6/12"
            style={{
              clipPath: "polygon(0% 0%, 75% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <NavLink
              to="parent"
              className="bg-UI-9 w-full h-full block py-4 hover:animate-pulse text-center text-3xl text-white font-semibold"
              style={{
                clipPath: "polygon(0% 0%, 75% 0%, 99% 100%, 0% 100%)",
              }}
            >
              Parent
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
