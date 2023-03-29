import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Image,
  Spacer,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import CommentBox from "@/components/CommentBox";
import React from "react";
import Movie from "../Watchlist/Data";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";

interface Review {
  rating: number;
  comment: string;
}

interface MovieGridItemProps {
  movie: Movie;
};

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [display, setDisplay] = useState<string[]>([]);
  const [movieDetails, setMovieDetails] = useState<any>({});
  const toast = useToast();
  const location = useLocation();
  const movieId = location.state;
  const movieManagementService = new MovieMagementService();

  const handleRatingClick = (value: number) => {
    setRating(value);

    toast({
      description: "Rating has been added",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
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

  const fetchMovieDetails = async () => {
    const body: any = await movieManagementService.fetchMovieByID(movieId);
      if(body == null){
        alert("Something went wrong while loading movie details. Please try again.")
      }
      else{
        setMovieDetails(body);
      }
  };

  useEffect(() => {
    fetchMovieDetails();
  },[])

  return (
    <>
      <Flex direction="column">
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          align="center"
          p={5}
        >
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            maxW={{ base: "100%", sm: "800px" }}
            boxShadow="lg"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "300px" }}
              src={movieDetails.poster}
              alt="Movie poster"
            />

            <Stack padding={{ base: "4", sm: "6" }}>
              <CardBody padding={{ base: "2", sm: "4" }}>
                <Heading size="md" color="gray.600">
                  {movieDetails.title}
                </Heading>

                <Text py="2" lineHeight="tall" textAlign="justify">
                  {movieDetails.plot}
                </Text>

                <Text fontSize="sm" color="gray.500" py="1">
                  Genre: {movieDetails.genres} 
                    {/* {movieDetails.genres.map((genre : any) => (
                      genre
                  ))} */}
                </Text>

                <Text fontSize="sm" color="gray.500" textAlign="justify">
                  Date: {movieDetails.released_date}
                </Text>
                <Flex justify="flex-end" >
                <Box mb="6" mr="2"><Button size="sm" colorScheme="yellow">Trivia Quiz</Button></Box>
                <Box mb="6"><Button size="sm" colorScheme="yellow">Parents Guide</Button></Box>
                </Flex>
              </CardBody>
            </Stack>
          </Card>

          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
           
            <Box boxShadow="2xl" p="2" mb="4" ml="20" width="85%">
              <Text mb={2} color="gray.600" fontWeight="medium">
                Add Rating
              </Text>
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
              h="50vh"
              backgroundColor="gray.100"
            >
              <Text mb={3} fontWeight="medium">
                Add a Review
              </Text>
              <Textarea
                placeholder="Write a comment..."
                size="sm"
                resize="none"
                border="none"
                _focus={{ outline: "none" }}
                height="75%"
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
