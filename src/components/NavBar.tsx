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