import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import { FilterResults } from "./pages/Filter/FilterResults";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { SearchResults } from "./pages/Search/SearchResults";
import SignIn from "./pages/SignIn";
import Watchlist from "./pages/Watchlist/Watchlist";

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
        element: <SearchResults />,
      },
      {
        path: "/filter",
        element: <FilterResults />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
