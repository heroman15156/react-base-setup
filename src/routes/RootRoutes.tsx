/* Router, Routes version */

import { Routes, Route } from "react-router-dom";
import { routes } from "../constants/routes.tsx";
import HomePage from "../pages/Home.tsx";
import LoginPage from "../pages/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import PostPage from "../pages/Post.tsx";
import CallbackPage from "../pages/CallbackPage.tsx";
import ProductDetailPage from "../pages/ProductDetailPage.tsx";
import { PublicRoute } from "./PublicRoute.tsx";

function RootRoutes() {
  return (
    <Routes>
      <Route path={routes.HOME} element={<HomePage />} />
      <Route path={routes.CALLBACK} element={<CallbackPage />} />
      <Route path={routes.PRODUCT_DETAIL} element={<ProductDetailPage />} />
      <Route element={<PublicRoute />}>
        <Route path={routes.LOGIN} element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={routes.POST} element={<PostPage />} />
      </Route>
    </Routes>
  );
}

export default RootRoutes;
