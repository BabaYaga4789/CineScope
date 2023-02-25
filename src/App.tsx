<<<<<<< HEAD
import { Box, ChakraProvider } from "@chakra-ui/react";
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminHome from "./pages/Home/AdminHome";
import UpdateMovieDetails from "./pages/Admin/UpdateMovieDetails";
import AddMovie from "./pages/Admin/AddMovie";
=======
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import { FilterResults } from "./pages/Filter/FilterResults";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Profile from "./pages/Profile/Profile";
import Registration from "./pages/Registration/Registration";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SignIn from "./pages/SignIn";
import Watchlist from "./pages/Watchlist/Watchlist";
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c

const router = createBrowserRouter([
  {
    path: "/",
<<<<<<< HEAD
    element: <Home />,
  },
   {
    path: "/admin-home",
    element: <AdminHome />,

  },
  {
    path: "/update-movie-details/:id",
    element: <UpdateMovieDetails />,
  },
  {
    path: "/add-movie/",
    element: <AddMovie />,
=======
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
    ],
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c
  },
]);

const App = () => {
<<<<<<< HEAD
  return (
    <ChakraProvider>
      <Box h="100%" w="100%">
        {/* <NavBar /> */}
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  );
=======
  return <RouterProvider router={router} />;
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c
};

export default App;
