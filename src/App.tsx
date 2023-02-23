import { Box, ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration/Registration";
import Profile from "./pages/Profile/Profile";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const router = createBrowserRouter([
  {
    path: "*",
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
]);

const App = () => {
  return (
    <ChakraProvider>
      <Box h="100%" w="100%">
        <NavBar />
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
