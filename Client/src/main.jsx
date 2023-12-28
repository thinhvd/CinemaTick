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
import SelectSeatPage from "./routes/selectSeatPage";
import Profile from "./routes/profilePage";
import MovieInfo from "./routes/movieInfo";
import MovieList from "./routes/movieList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "signup",
    element: <Profile />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path:"movielist",
    element: <MovieList/>
  },
  {
    path:"/movieinfo/:id",
    element: <MovieInfo/>,
  },
  {
    path:"/selectseat/:id",
    element: <SelectSeatPage/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);