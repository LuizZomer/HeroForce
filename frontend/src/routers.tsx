import { createBrowserRouter } from "react-router-dom";
import { LoginContainer } from "./features/auth/containers/login.container";

export const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <LoginContainer />,
  },
]);
