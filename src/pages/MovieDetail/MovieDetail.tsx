import {
  Box,
  Grid,
  Image,
  Text,
  Divider,
  Badge,
  VStack,
  HStack,
  GridItem,
  AspectRatio,
  SimpleGrid,
  ButtonGroup,
  Button,
  Icon,
  useToast,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import { SessionManager } from "@/common/SessionManager";
import { FaStar } from "react-icons/fa";
import ReviewsMagementService from "@/services/ReviewsManagementService/ReviewsManagementService";
import CommentBox from "@/components/CommentBox";

const MovieDetails = () => {
  const location = useLocation();
  const movieId = location.state;
  const movieManagementService = new MovieMagementService();
  const userManagementService = new UserManagementService();
  const [comment, setComment] = useState("");
  const [display, setDisplay] = useState([]);
  const [movieDetails, setMovieDetails] = useState({}) as any;
  const [movieRating, setMovieRating] = useState() as any;
  const [movieReview, setMovieReview] = useState() as any;
  const [movieRatingCount, setMovieRatingCount] = useState(0);

  const isLoggedIn = SessionManager.isLoggedIn();
  console.log(isLoggedIn);
  const userID = SessionManager.getUserID();

  const getLoggedInUserEmail = async () => {
    let userEmail = "";
    if (userID) {
      const body: any = await userManagementService.getUser(userID);
      userEmail = body.email;
    }
    return userEmail;
  };

  const fetchRatingCount = async () => {
    const body: any = await ReviewsMagementService.getRatingCountForMovie(
      movieId
    );
    if (body == null || body == undefined) {
      setMovieRatingCount(0);
    } else {
      setMovieRatingCount(body[0].rating);
    }
  };

  const fetchMovieDetails = async () => {
    const body: any = await movieManagementService.fetchMovieByID(movieId);
    if (body == null) {
      alert(
        "Something went wrong while loading movie details. Please try again."
      );
    } else {
      const released_date = new Date(body.released_date);
      const yyyy = released_date.getFullYear();
      let mm: any = released_date.getMonth() + 1;
      let dd: any = released_date.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      const formattedReleasedDate = mm + "/" + dd + "/" + yyyy;
      body.released_date = formattedReleasedDate;
      setMovieDetails(body);
      const body2: any = await ReviewsMagementService.getReview(body.title);
      const reviewedMovies = body2.filter((movie: any) => {
        return movie.hasOwnProperty("review");
      });
      const ratingObjects = reviewedMovies.map((i: any) => {
        return {
          email: i.email,
          comment: i.review,
        };
      });
      setDisplay(ratingObjects);
      console.log("ratingObjects", ratingObjects);
    }
  };

  const [rating, setRating] = useState(0);
  const toast = useToast();

  const handleRatingClick = async (value: number) => {
    setRating(value);
    const fetchedEmail = await getLoggedInUserEmail();
    const body: any = await ReviewsMagementService.addRating(
      movieDetails.title,
      fetchedEmail,
      value,
      movieId
    );
    console.log("rating", rating);

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

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fetchedEmail = await getLoggedInUserEmail();
    const body: any = await ReviewsMagementService.addReview(
      movieDetails.title,
      //"xyz@@gmail.com",
      fetchedEmail,
      comment,
      movieId
    );
    setMovieReview(body);
    console.log("rating", rating);
    console.log(comment);
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchRatingCount();
  }, [movieReview]);

  return (
    <Box maxW="1200px" mx="auto" my="6">
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gap="6"
      >
        <Box ml={2} mr={2}>
          <Image
            src={movieDetails.poster}
            alt={movieDetails.title}
            w={["350px", "500px", "700px", "700px"]}
            h={["350px", "500px", "600px", "600px"]}
          />
          {isLoggedIn && (
            <Box boxShadow="2xl" p="2" mb="4" ml={2} mt={12} width="85%">
              <Text mb={2} color="gray.700" fontWeight="medium">
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
          )}

          {isLoggedIn && (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="2"
              mt="3"
              boxShadow="xl"
              ml="0.5rem"
              width="85%"
              h="40vh"
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
              <Flex justifyContent="flex-end" marginTop="1">
                <Button size="sm" colorScheme="yellow" onClick={handleSubmit}>
                  Submit
                </Button>
              </Flex>
            </Box>
          )}
        </Box>

        <Box
          ml={2}
          mr={2}
          w={["350px", "450px", "700px", "700px"]}
          h={["auto", "auto", "auto", "auto"]}
        >
          <Text fontWeight="bold" fontSize="4xl" mt="4">
            {movieDetails.title}"
          </Text>
          <Text fontSize="xl" fontWeight="semibold" color="gray.500">
            {movieDetails.released_date} | {movieDetails.time_in_minutes}{" "}
            Minutes | Rating{" "}
            <Badge colorScheme="yellow" fontSize="1.2rem">
              {movieRatingCount}
            </Badge>{" "}
            |{" "}
            {movieDetails.genres?.map((genre: any, index: any) => (
              <Badge key={index} mr="1" colorScheme="purple">
                {genre}
              </Badge>
            ))}
          </Text>

          <Box mt="4" mb="4">
            <Text>{movieDetails.plot}</Text>
          </Box>
          <Divider my="1" />
          <VStack alignItems="flex-start" mb={4}>
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Cast
            </Text>
            {movieDetails.cast?.map((actor: any, index: any) => (
              <HStack key={index}>
                <Text fontWeight="semibold">{actor}</Text>
              </HStack>
            ))}
          </VStack>
          <Divider my="2" />
          <VStack alignItems="flex-start" mb={4}>
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Director
            </Text>
            <Text fontWeight="semibold">{movieDetails.director}</Text>
          </VStack>
          <Divider my="2" />
          <VStack alignItems="flex-start" mb={4}>
            <Text fontWeight="bold" fontSize="2xl" mb="1">
              Trailer
            </Text>
            <AspectRatio ratio={16 / 9} w="100%">
              <iframe
                width="500"
                height="315"
                src={movieDetails.trailor}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </AspectRatio>
          </VStack>
        </Box>
      </Grid>
      <Divider my="6" />

      <Box ml={2} mr={2}>
        <Text fontWeight="bold" fontSize="2xl" mb="4">
          Related Images
        </Text>
        <SimpleGrid p={4} columns={{ base: 1, md: 4, lg: 8 }} gap={4}>
          {movieDetails.images?.map((image: any, index: any) => (
            <GridItem colSpan={2}>
              <Image
                height="300px"
                width="400px"
                src={image}
                borderRadius="sm"
                boxShadow="md"
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </Box>

      {/* <Box
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
      </Box> */}
      <Box w="100%" maxW="1200px" mx="auto" boxShadow="xl" p={10}>
        <CommentBox value={display} />
      </Box>
    </Box>
  );
};

export default MovieDetails;
