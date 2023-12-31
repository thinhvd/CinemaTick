import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./routes/landingPage";
import ErrorPage from "./routes/errorPage";
import LoginPage from "./routes/loginPage";
import SignupPage from "./routes/signupPage";
import SelectSeatPage from "./routes/selectSeatPage";
import Profile from "./routes/profilePage";
import MovieInfo from "./routes/movieInfo";
import MovieList from "./routes/movieList";
import AdminPage from "./routes/adminPage";
import AdminTable from "./components/adminTable";
import ForgotPasswordPage from "./routes/forgotPasswordPage";
import Successmess from "./routes/successmess";
import Cinematick from "./routes/aboutus";

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
    element: <SignupPage />,
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
  },
  {
    path:"/profile",
    element: <Profile/>,
  },
  {
    path:"/admin",
    element: <AdminPage/>,
    children: [
      { path: "users", element: <AdminTable type="users" /> },
      { path: "movies", element: <AdminTable type="movies" /> },
      { path: "shows", element: <AdminTable type="shows" /> },
      { path: "bills", element: <AdminTable type="bills" /> },
    ],
  },
  {
    path:"/forgotpassword",
    element: <ForgotPasswordPage/>,
  },
  {
    path:"/successmess",
    element: <Successmess/>,
  },
  {
    path:"/cinematick",
    element:<Cinematick/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);