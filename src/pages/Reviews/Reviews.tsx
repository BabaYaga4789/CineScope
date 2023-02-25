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
  Stack,
  Heading,
  CardFooter,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import React from "react";
import CommentBox from "@/components/CommentBox";
import { MovieDetails } from "../MovieData";

interface Review {
  rating: number;
  comment: string;
}

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [movie, setMovie] = useState<movieDet[]>([]);
  const [display, setDisplay] = useState<string[]>([]);
  const [text, setText] = useState("");
  const toast = useToast();
  const location = useLocation();
  const movieDetail = location.state;
  console.log(movieDetail, "these are movie details from state i.e id");
  console.log(typeof(movieDetail))

  type movieDet = {
    id: number;
    poster: string;
    title: string;
    genre: string;
    // add more properties as needed
  };

  // const getItemDetails = (id: number): movieDet | undefined => {
  //   const item = MovieDetails.find((item: movieDet) => item.id === parseInt(movieDetail));
  //   return item;
  // };

  const item = MovieDetails.find((item: movieDet) => item.id === parseInt(movieDetail));
  //console.log(item,"This is itttt!!")
  console.log(item?.poster, "Hiiiiiiiiiiiii")



  // const filteredMovies = MovieDetails.filter(x => x.id === parseInt(movieDetail));
  // console.log(filteredMovies, "filteredMovies");

  // useEffect(() => {
  //   const filteredMovies = MovieDetails.filter(x => x.id === parseInt(movieDetail));
  //   //setMovie(filteredMovies)
  //   console.log(filteredMovies, "filteredMovies");
  // },[movieDetail]);


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

  // const getMovieDetails=()=>{
  //   const item= MovieDetails.find()
  // }

  return (
    <>
      <Flex direction="column">
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-around"
          align="center"
          p={5}
        >
        
          <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              maxW={{ base: '100%', sm: '800px' }}
              boxShadow='lg'
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '300px' }}
                src= {item?.poster}
                alt='Movie poster'
              />

              <Stack padding={{ base: '4', sm: '6' }}>
                <CardBody padding={{ base: '2', sm: '4' }}>
                  <Heading size='md' color='gray.600'>{item?.title}</Heading>

                  <Text py='2' lineHeight='tall'  textAlign='justify' >
                    {item?.description}
                  </Text>

                  <Text fontSize='sm' color='gray.500' py='1'>
                    Genre: {item?.genre}
                  </Text>

                  <Text fontSize='sm' color='gray.500'  textAlign='justify' >
                    Year: {item?.year}
                  </Text>
                </CardBody>

              </Stack>
          </Card>

          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box boxShadow="2xl" p="2" mb="4" ml="20" width="85%">
              <Text mb={2} color='gray.600' fontWeight='medium'>Add Rating</Text>
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
              <Text mb={3} fontWeight='medium'>Add a Review</Text>
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
                <Button size="sm" colorScheme="yellow" onClick={handleSubmit}>
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
