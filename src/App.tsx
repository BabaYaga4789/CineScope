import { Box, ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration/Registration";
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
]);

const App = () => {
  return (

    <RouterProvider router={router} />

  );
};

export default App;
