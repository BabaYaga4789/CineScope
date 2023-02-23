import { Box, ChakraProvider } from "@chakra-ui/react";
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
