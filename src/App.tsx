import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import AddMovie from "./pages/Admin/AddMovie";
import UpdateMovieDetails from "./pages/Admin/UpdateMovieDetails";
import { FilterResults } from "./pages/Filter/FilterResults";
import AdminHome from "./pages/Home/AdminHome";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Reviews from "./pages/Reviews/Reviews";
import SignIn from "./pages/SignIn";
import Watchlist from "./pages/Watchlist/Watchlist";

const isAdmin = localStorage.getItem("isAdmin") === "true";

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdminHome />,
  },
  {
    path: "/update-movie-details/:id",
    element: <UpdateMovieDetails />,
  },
  {
    path: "/add-movie",
    element: <AddMovie />,
  },
]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/account-settings",
        element: <AccountSettings />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/search",
        element: <FilterResults />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={isAdmin ? adminRouter : router} />;
};

export default App;
