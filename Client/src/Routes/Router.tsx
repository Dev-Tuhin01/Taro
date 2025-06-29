import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
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
import AUthRedirect from "../Components/AuthRedirect";
import ProtectedRoute from "../Components/ProtectedRoute";
import ChoreDetails from "../Components/ChoreDetails";
import { useAuthStore } from "../Stores/AuthStore";

const RootRedirect = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  const dashboardPath = user?.role === 'parent' ? '/parent' : '/child';
  return <Navigate to={dashboardPath} replace />;
};


const router = createBrowserRouter([
  {path:"/", element:<RootRedirect />},
  { path: "/auth",
    element:(
      <AUthRedirect><Outlet /></AUthRedirect>
    ),
    children: [
      {index: true, element: (
      <Auth />
    ) },
      {path: "child", element: <AuthForm />,
        children:[
          {index:true, element:<Login role="child" /> },
          {path:"login", element:<Login role="child" />},
          {path:"register", element:<Register role="child"/>},
        ]
       },
      {path: "parent", element: <AuthForm />,
         children:[
          {index:true,element:<Login role="parent" />},
          {path:"login", element:<Login role="parent" />},
          {path:"register",element:<Register role="parent" />},
        ]
       },
    ]
   },
  {
    path: "/child",
    element:(
      <ProtectedRoute requiredRole="child" >
        <Child />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Game /> },
      { path: "game", element: <Game /> },
      { path: "chore", element: <Todo /> },
      { path: "chore/:id", element: <ChoreDetails /> },
    ],
  },
  {
    path: "/parent",
    element: (
      <ProtectedRoute requiredRole="parent">
        <Parent />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Children /> },
      { path: "children", element: <Children /> },
      { path: "chore", element: <Todo /> },
      { path: "chore/:id", element: <ChoreDetails /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

const Router = () => {

  return <RouterProvider router={router} />;
};

export default Router;
