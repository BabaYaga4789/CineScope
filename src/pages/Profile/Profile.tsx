/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import CustomContainer from "@/components/CustomContainer";
import UserManagementService from "@/services/UserManagementService/UserManagementService";
import {
  Box,
  Flex,
  HStack,
  Link,
  Spacer,
  Stack,
  VStack
} from "@chakra-ui/layout";
import { Avatar, Button, Image, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserData } from "../Registration/UserData";

const movies = [
  {
    id: 1,
    poster: "/img/ShawshankRedemptionMoviePoster.jpeg",
    title: "The Shawshank Redemption",
    description:
      "The Shawshank Redemption is a 1994 American drama film directed by Frank Darabont. The film is based on the novella 'Rita Hayworth and Shawshank Redemption' by Stephen King. The film stars Tim Robbins as Andy Dufresne, a banker who is wrongly convicted of murder and sent to Shawshank State Penitentiary. While in prison, Andy forms an unlikely friendship with a fellow inmate named Red, played by Morgan Freeman. Over time, Andy uses his wit and determination to help himself and his fellow prisoners, ultimately leading to his escape from Shawshank. The film was well-received by audiences and critics, and is widely regarded as one of the greatest films of all time.",
  },
  {
    id: 2,
    poster: "/img/AvatarPoster.jpeg",
    title: "Avatar: The Way of Water",
    description:
      "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
  },
];

const activity = [
  {
    id: 1,
    type: "Review",
    description: "The movie was really nice! 10/10! Would watch it again!",
  },
  {
    id: 2,
    type: "Club Post | Action Movie Club",
    description: "Any new action movie to suggest?",
  },
  {
    id: 3,
    type: "Review",
    description: "Not a fan of this movie. 3/10!",
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [m, setMovies] = useState(movies);
  const [user, setUser] = useState({} as UserData);

  const { id } = useParams();
  if (!id) {
    navigate("/");
  }

  useEffect(() => {
    const getUser = async () => {
      const userManagementService = new UserManagementService();
      const user = await userManagementService.getUserByUserName(id!);

      if (user) {
        setUser(user);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    getUser();
  }, []);

  const removeMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <Flex flexShrink={"0"} mx={4} justifyContent="center">
      <Stack
        // h={{ base: "calc(100vh - 20px)", md: "calc(83vh - 20px)" }}
        w={"100%"}
        mb={4}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={{ base: "center", md: "flex-start" }}
        justifyContent={"flex-start"}
      >
        <CustomContainer w={{ base: "100%", md: "30%" }} mx={4}>
          <VStack>
            <Avatar size="2xl" name={user.userName} />
            <VStack w="100%">
              <Text fontSize={"lg"} fontWeight="semibold">
                {user.userName ?? ""}
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center" mb={2}>
                {user.about ?? ""}
              </Text>
              <Button
                w={"100%"}
                size="sm"
                variant={"solid"}
                onClick={() => navigate("/account-settings")}
              >
                Account Settings
              </Button>

              <Box width={"100%"} pt={5} justifyContent={"left"}>
                <Text
                  fontSize="md"
                  fontWeight={"bold"}
                  color="black.500"
                  textAlign="left"
                >
                  Statistics
                </Text>
                <Box h={3} />
                <VStack alignItems={"left"}>
                  <Link href="#" color={"yellow.500"}>
                    Clubs Joined (3)
                  </Link>
                  <Link href="#" color={"yellow.500"}>
                    Club Posts (2)
                  </Link>
                  <Link href="#" color={"yellow.500"}>
                    Reviews (5)
                  </Link>
                  <Link href="#" color={"yellow.500"}>
                    Trivia Completed (2)
                  </Link>
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </CustomContainer>
        <CustomContainer w={{ base: "100%", md: "calc(93vw-350px)" }} mx={4}>
          <CustomContainer p={6} boxShadow="md">
            <VStack alignItems={"left"} justifyContent="center" spacing={4}>
              <HStack>
                <Text fontSize={"lg"} fontWeight="semibold">
                  Watchlist
                </Text>
                <Spacer />
                {/* <Link
                  as={Button}
                  colorScheme="yellow"
                  size="sm"
                  variant={"ghost"}
                  to="/watchlist"
                >
                  View All
                </Link> */}
              </HStack>
              {m.map((movie) => (
                <CustomContainer boxShadow="md" key={movie.id} w={"100%"} p={2}>
                  <HStack alignItems="center">
                    <Image
                      boxShadow={"xl"}
                      borderRadius="md"
                      boxSize="70px"
                      src={movie.poster}
                      alt={movie.title}
                    />
                    <Box w={1} />
                    <HStack w="100%" p={2} justifyContent={"space-between"}>
                      <Text fontSize={"lg"} fontWeight="semibold">
                        {movie.title}
                      </Text>
                      <Spacer />
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => removeMovie(movie.id)}
                      >
                        Remove
                      </Button>
                    </HStack>
                  </HStack>
                </CustomContainer>
              ))}
            </VStack>
          </CustomContainer>{" "}
          <Box h={5} />
          <CustomContainer p={6} boxShadow="md" h={"100%"}>
            <VStack alignItems={"left"} justifyContent="center" spacing={4}>
              <Text fontSize={"lg"} fontWeight="semibold">
                Recent Activity
              </Text>
              {activity.map((act) => (
                <CustomContainer
                  cursor="pointer"
                  boxShadow="md"
                  key={act.id}
                  w={"100%"}
                  p={2}
                >
                  <HStack alignItems="center">
                    <HStack w="100%" p={2} justifyContent={"space-between"}>
                      <Text fontSize={"lg"} fontWeight="semibold">
                        {act.type}
                      </Text>
                      <Spacer />
                      <Text fontSize={"sm"} fontWeight="semibold">
                        {act.description}
                      </Text>
                    </HStack>
                  </HStack>
                </CustomContainer>
              ))}
            </VStack>
          </CustomContainer>
        </CustomContainer>
      </Stack>
    </Flex>
  );
};

export default Profile;
