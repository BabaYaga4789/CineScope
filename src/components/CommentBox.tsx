import {
  Badge,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import { SessionManager } from "@/common/SessionManager";
const isLoggedIn= SessionManager.isLoggedIn();
const userID= SessionManager.getUserID();
const userManagementService = new UserManagementService();
  


  // const getLoggedInUserEmail = async () =>{
  //   let userEmail = '';
  //   if(userID){
  //     const body: any = await userManagementService.getUser(userID);
  //     userEmail= body.email;
  //     //console.log(userEmail, "userEmail");
  //   }
  //   return userEmail;
 
  // }

  // const fetchedEmail=  getLoggedInUserEmail();

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface Props {
  value: { email: string, comment: string }[];
  onChildData: (data: string) => void;
  loggedUser : string;
}



const CommentBox: React.FC<Props> = (props) => {
  const { value: comments } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const toast = useToast();
  console.log("loggedUser",props.loggedUser)


  const handleSaveClick = () => {
    if (text.trim() !== "") {
      props.onChildData(text);
      setIsModalOpen(false);
    } else {
      toast({
        description: "Please enter review to be updated",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    setText("");
  };

  return (
    <TableContainer display="block" >
      <Table variant="simple" colorScheme="teal" overflowX="auto">
        <Thead>
          <Tr>
            <Th fontWeight="medium" fontSize="md">Reviews: </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {comments.map(({ email, comment }, index) => (
            <Tr key={index}>
              <Td>
                <Box as="h2" fontSize="md" maxWidth="50%">
                  {/* <Text>{email}: {comment}</Text> */}
                  {/* <Text fontSize="sm" fontStyle="italic" > {email}</Text> */}
                  <Badge colorScheme="gray" variant="outline" textTransform="lowercase" fontSize="xs" mb="1">{email}</Badge>
                  <Text mt="1" fontSize="md">{comment}</Text>
                </Box>
              </Td>


  
              <Td>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  as={FaPencilAlt}
                  ml="2"
                  isDisabled={email != props.loggedUser}
                  value={email}
                />
              </Td>

              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Enter Text</ModalHeader>
                  <ModalBody>
                    <Input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSaveClick}>
                      Save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};


export default CommentBox;