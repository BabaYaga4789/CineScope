import { Box, Flex, Heading, Text, Link, Button, Avatar, HStack, Input, IconButton, Menu, MenuList, MenuButton, MenuItem, Spacer } from "@chakra-ui/react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AdminNavBar = () => {

  const navigate = useNavigate();
  const addMovie = () =>{
    navigate('/add-movie/')
  }
  return (
    <div>
    <Box as="nav" boxShadow="md">
      <Flex as="div" mx="auto" p="4" justifyContent="center" alignItems="center">
      <HStack spacing={[10,20,30]}>
      <HStack>
            <Text
              textAlign="left"
              bgGradient="linear-gradient(311deg, rgba(143,107,41,1) 0%, rgba(237,193,65,1) 33%, rgba(223,159,40,1) 82%);"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
              ml="20px"
            >
              <Link to="/admin-home/">CineScope</Link>
            </Text>
          </HStack>

        <Menu>
          <MenuButton
            aria-label="Options"
            fontSize={['sm','sm','lg']}
          > Menu</MenuButton>
          <MenuList>
            <MenuItem onClick={addMovie}> Add Movie</MenuItem>
            <MenuItem>Comment moderation</MenuItem>
            <MenuItem>Review moderation</MenuItem>
          </MenuList>
        </Menu>
        </HStack>

        <HStack ml={[40,50,60]}>
        <Input
        placeholder="Search a movie..."
      
        size="md"
        borderRadius="md"
        border="1px solid black"
        width={[150,175,300]}
      />
      <IconButton
        aria-label="Search"
        icon={<FaSearch />}
        colorScheme={"yellow"}
        color="white"
        borderRadius="md"
      />
      </HStack>
  
  <Spacer></Spacer>
  <HStack spacing={[10,20,30]}>
        <Text fontSize={['sm', 'md', 'lg', 'lg']}>Welcome, User!</Text>
        <Avatar size="sm" name="User Name" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-oYBJgcWpBfjaS1rQAwYZS5px0eeZ0g4rw&usqp=CAU" />
        <Button colorScheme="yellow" fontSize={['sm', 'sm', 'md', 'md']}>Logout</Button>
        </HStack>
      </Flex> 
    </Box>

</div>
  );
};