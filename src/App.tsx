import { Box, ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration/Registration";
import Profile from "./pages/Profile/Profile";

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
    path: "/profile",
    element: <Profile />,
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
