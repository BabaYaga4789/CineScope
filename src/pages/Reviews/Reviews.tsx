import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Center,
  Flex,
  Icon,
  Image,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

import React from "react";
import CommentBox from "../components/CommentBox";

interface Review {
  rating: number;
  comment: string;
}

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [display, setDisplay] = useState<string[]>([]);
  const [text, setText] = useState("");
  const toast = useToast();

  //handle ratings
  const handleRatingClick = (value: number) => {
    setRating(value);

    toast({
      description: "Rating has been added",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  //handle reviews
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    // Handle comment submission here
    e.preventDefault();
    console.log(comment);
    if (comment.trim() !== "") {
      setDisplay([...display, comment]);
    } else {
      toast({
        description: "Enter a review",
        duration: 9000,
        isClosable: true,
      });
    }

  };

  const handleSave = (editedText: string) => {
    setText(editedText);
  };

  return (
    <>
      <Flex direction="column">
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-around"
          align="center"
          p={5}
        >
          <Card p={6} maxW="500px" boxShadow="2xl">
            <CardBody>
              <Image
                src="https://i.pinimg.com/originals/f4/b2/29/f4b229310f95eabe0d8b1dcca80450b6.jpg"
                alt="Example image"
                w={{ base: "100%", md: "auto" }}
                h={{ base: "auto", md: "100%" }}
              />
              <Center>
                <Text p={2} fontSize="xl" as="b" color="gray.700">
                  Your Name
                </Text>
              </Center>
            </CardBody>
          </Card>

          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box boxShadow="2xl" p="2" mb="4" ml="20" width="85%">
              <Text mb={2}>Add Rating</Text>
              <ButtonGroup>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Button
                    key={value}
                    size="xs"
                    colorScheme={value <= rating ? "yellow" : "gray"}
                    leftIcon={<Icon as={FaStar} />}
                    onClick={() => handleRatingClick(value)}
                  >
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>

            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="2"
              mt="6"
              boxShadow="xl"
              ml="6rem"
              width="90%"
              h="40vh"
              backgroundColor="gray.100"
            >
              <Text mb={3}>Add a Review</Text>
              <Textarea
                placeholder="Write a comment..."
                size="sm"
                resize="none"
                border="none"
                _focus={{ outline: "none" }}
                width="80%"
                height="60%"
                bg="white"
                value={comment}
                onChange={handleTextChange}
              />
              <Flex justifyContent="flex-end" marginTop="4">
                <Button size="sm" colorScheme="blue" onClick={handleSubmit}>
                  Submit
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Box w="100%" maxW="1200px" mx="auto" boxShadow="xl" p={10}>
          <CommentBox value={display} />
        </Box>
      </Flex>
    </>
  );
};

export default Reviews;
