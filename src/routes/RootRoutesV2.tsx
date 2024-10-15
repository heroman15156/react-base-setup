/* createBrowserRouter version */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "../constants/routes.tsx";
import HomePage from "../pages/Home.tsx";
import LoginPage from "../pages/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import PostPage from "../pages/Post.tsx";

const router = createBrowserRouter([
  {
    path: routes.HOME,
    element: <HomePage />,
  },
  {
    path: routes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: routes.POST,
        element: <PostPage />,
      },
    ],
  },
]);

function RootRoutesV2() {
  return <RouterProvider router={router} />;
}

export default RootRoutesV2;
