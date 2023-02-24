import { Box, ChakraProvider } from "@chakra-ui/react";
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminHome from "./pages/Home/AdminHome";
import UpdateMovieDetails from "./pages/Admin/UpdateMovieDetails";
import AddMovie from "./pages/Admin/AddMovie";

const router = createBrowserRouter([
  {
    path: "/",
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
  },
]);

const App = () => {
  return (
    <ChakraProvider>
      <Box h="100%" w="100%">
        {/* <NavBar /> */}
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
