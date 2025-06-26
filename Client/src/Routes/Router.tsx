import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Game from "../Pages/Child/Game";
import Todo from "../Pages/Todo";
import NotFound from "../Pages/NotFound";
import Children from "../Pages/Parent/Children";
import Child from "../Pages/Child/Child";
import Parent from "../Pages/Parent/Parent";
import AuthForm from "../Pages/Auth/AuthForm";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

const router = createBrowserRouter([
  { path: "/auth",
    children: [
      {index: true, element: <Auth /> },
      {path: "child", element: <AuthForm userType="child" />,
        children:[
          {index:true, element:<Login /> },
          {path:"login", element:<Login />},
          {path:"register", element:<Register role="child"/>},
        ]
       },
      {path: "parent", element: <AuthForm userType="parent" />,
         children:[
          {index:true,element:<Login />},
          {path:"login", element:<Login />},
          {path:"register",element:<Register role="parent" />},
        ]
       },
    ]
   },
  {
    path: "/child",
    element: <Child />,
    children: [
      { index: true, element: <Game /> },
      { path: "game", element: <Game /> },
      { path: "todo", element: <Todo /> },
    ],
  },
  {
    path: "/parent",
    element: <Parent />,
    children: [
      { index: true, element: <Children /> },
      { path: "children", element: <Children /> },
      { path: "todo", element: <Todo /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

const Router = () => {

  return <RouterProvider router={router} />;
};

export default Router;
