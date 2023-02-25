<<<<<<< HEAD
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const NavBar = () => {
  return (
    <Box as="nav" bg="teal.400" boxShadow="md">
      <Flex as="div" mx="auto" p="4">
        <Heading fontSize={24} color="white" >CineScope</Heading>
      </Flex>
    </Box>
  );
};
=======
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box boxShadow="lg">
      <Flex as="nav" p="10px" mb="50px" alignItems="center" shadow="10px">
        <Box justifyContent="space-between">
          <HStack>
            <Text
              textAlign="left"
              bgGradient="linear-gradient(311deg, rgba(143,107,41,1) 0%, rgba(237,193,65,1) 33%, rgba(223,159,40,1) 82%);"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
              ml="20px"
            >
              <Link to="/">CineScope</Link>
            </Text>
          </HStack>
        </Box>
        <Spacer></Spacer>

        <HStack spacing="30px">
          <NavLink
            to="/"
            style={({ isActive }) => {
              return { fontWeight: isActive ? 700 : 400 };
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/watchlist"
            style={({ isActive }) => {
              return { fontWeight: isActive ? 700 : 400 };
            }}
          >
            Watchlist
          </NavLink>

          <NavLink
            to="/news"
            style={({ isActive }) => {
              return { fontWeight: isActive ? 700 : 400 };
            }}
          >
            News And Updates
          </NavLink>
          <NavLink
            to="/search"
            style={({ isActive }) => {
              return { fontWeight: isActive ? 700 : 400 };
            }}
          >
            Search
          </NavLink>
          <Menu isOpen={isOpen}>
            <MenuButton
              mx={1}
              py={[1, 2, 2]}
              px={4}
              borderRadius={5}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              aria-label="Courses"
              fontWeight="normal"
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              onClick={() => navigate("/profile")}
            >
              <Avatar name="Harsh" />
            </MenuButton>
            <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
              <MenuItem
                onClick={() => {
                  navigate("account-settings");
                }}
              >
                Account Settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>

          <Spacer></Spacer>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c
