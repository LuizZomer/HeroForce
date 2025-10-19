import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginContainer } from "./features/auth/containers/login.container";
import { RequiredAuth } from "./shared/services/secure/RequiredAuth";
import { ProjectsContainer } from "./features/projects/containers/projects.container";
import { RegisterContainer } from "./features/register/containers/register.container";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/projects" replace />,
  },
  {
    path: "/auth",
    element: <LoginContainer />,
  },
  {
    path: "/projects",
    element: (
      <RequiredAuth>
        <ProjectsContainer />
      </RequiredAuth>
    ),
  },
  {
    path: "/register",
    element: <RegisterContainer />,
  },
  {
    path: "*",
    element: <Navigate to="/auth" replace />,
  },
]);
