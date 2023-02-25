import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Box } from "@chakra-ui/react";
export default function RootLayout() {
  return (
    <Box h="100vh" w="100vw">
      <NavBar></NavBar>
      <Outlet />
    </Box>
  );
}
