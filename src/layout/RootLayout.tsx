import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { AdminNavBar } from "@/components/AdminNavBar";
export default function RootLayout() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  return (
    <Box h="100vh" w="100%">
      {isAdmin ? <AdminNavBar /> : <NavBar />}
      <Outlet />
    </Box>
  );
}
