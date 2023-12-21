import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LandingPage from "./routes/landingPage";
import ErrorPage from "./routes/errorPage";
import LoginPage from "./routes/loginPage";
import SignupPage from "./routes/signupPage";
import MovieInfo from "./routes/movieInfo";
import MovieList from "./routes/movieList";

const router = createBrowserRouter([
  {
    path: "/",
    id:'0',
    element: <LandingPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path:"movielist",
    element: <MovieList/>
  },
  {
    path:"/movieinfo/:id",
    element: <MovieInfo/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);