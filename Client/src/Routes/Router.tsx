import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Game from "../Pages/Child/Game";
import Todo from "../Pages/Todo";
import NotFound from "../Pages/NotFound";
import Children from "../Pages/Parent/Children";
import Child from "../Pages/Child/Child";
import Parent from "../Pages/Parent/Parent";

const router = createBrowserRouter([
  { path: "/auth", element: <Auth /> },
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
