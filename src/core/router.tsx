import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import withLayout from "@/hoc/layout";
import { AuthType } from "@/types";
import Router from "@/config/router";

const Dashboard = withLayout(
  lazy(() => import("@/pages/dashboard")),
  "Dashboard"
);
const Login = lazy(() => import("@/pages/login"));
const Register = lazy(() => import("@/pages/register"));
const ForgotPassword = lazy(() => import("@/pages/forgot-password"));
const Business = lazy(() => import("@/pages/business"));
const Verify = lazy(() => import("@/pages/verify"));

const generateRouter = (type: AuthType, props: any) => {
  let routes;
  switch (type) {
    case "have-business":
      routes = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/">
            <Route index element={<Navigate to="dashboard" />} />
            {Router.map((Val) => (
              <Route path={Val.path} element={<Val.Element {...props} />} />
            ))}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Route>
        )
      );
      break;
    case "logined":
      routes = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/">
            <Route index element={<Navigate to="business" />} />
            <Route path="business" element={<Business {...props} />} />
            <Route path="verify" element={<Verify {...props} />} />
            <Route path="*" element={<Navigate to="business" />} />
          </Route>
        )
      );
      break;
    default:
      routes = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/">
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Login {...props} />} />
            <Route path="register" element={<Register {...props} />} />
            <Route
              path="forgot-password"
              element={<ForgotPassword {...props} />}
            />
            <Route path="verify" element={<Verify {...props} />} />
            <Route path="*" element={<Navigate to="login" />} />
          </Route>
        )
      );
      break;
  }
  return routes;
};

export default generateRouter;
