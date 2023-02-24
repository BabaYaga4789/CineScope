import { Box, Flex, Heading, Text, Link, Button, Avatar, Input, IconButton, Menu, MenuList, MenuButton, MenuItem, Spacer } from "@chakra-ui/react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AdminNavBar = () => {

  const navigate = useNavigate();
  const addMovie = () =>{
    navigate('/add-movie/')
  }
  return (
    <div>
    <Box as="nav" bg="teal.400" boxShadow="md">
      <Flex as="div" mx="auto" p="4" justifyContent="space-between" alignItems="center">

        <Heading fontSize={24} color="white">CineScope</Heading>
        <Menu>
          <MenuButton
            aria-label="Options"
            color="white"
            fontWeight="bold"
            fontSize={['sm','sm','lg']}
          > Menu</MenuButton>
          <MenuList>
            <MenuItem onClick={addMovie}> Add Movie</MenuItem>
            <MenuItem>Comment moderation</MenuItem>
            <MenuItem>Review moderation</MenuItem>
          </MenuList>
        </Menu>
        <Input
        placeholder="Search a movie..."
        bg="white"
        color="gray.800"
        size="md"
        borderRadius="md"
        border="1px solid gray.200"
        width={[150,175,300]}
      />
      <IconButton
        aria-label="Search"
        icon={<FaSearch />}
        bg="white.500"
        color="white"
        _hover={{ bg: "blue.600" }}
        borderRadius="md"
      />
  
        <Text fontWeight="bold" color="white" width={[20, 30, 40]} fontSize={['sm', 'md', 'lg', 'lg']}>Welcome, User!</Text>
        <Avatar size="sm" name="User Name" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-oYBJgcWpBfjaS1rQAwYZS5px0eeZ0g4rw&usqp=CAU" />
        <Button fontSize={['sm', 'sm', 'md', 'md']}>Logout</Button>
        
      </Flex>
        
     
      
    </Box>

</div>
  );
};