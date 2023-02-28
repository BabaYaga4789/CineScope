import { DeleteIcon, MinusIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  {
    id: 3,
    poster: "/img/Forrest_Gump_poster.jpeg",
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
  },
  {
    id: 4,
    poster: "/img/Dil_Chahta_Hai.jpeg",
    title: "Dil Chahta Hai",
    description:
      "Dil Chahta Hai is a Bollywood romantic comedy-drama film released in 2001. Directed by Farhan Akhtar, the film follows the lives of three childhood friends who go their separate ways after growing up, only to come back together as they navigate the ups and downs of adult life and relationships. The film is known for its witty dialogues, its portrayal of friendship, and its soundtrack. It was a critical and commercial success, and has since become a cult classic in India.",
  },
  // ...
];

const Watchlist = () => {
  const toast = useToast();

  const [list, setList] = useState(movies);

  const navigate = useNavigate();

  const getReviewPage = (e: any) => {
    e.preventDefault();
    navigate("/reviews", { state: e.target.id });
  };

  const handleRemove = (id: any) => {
    setList(list.filter((movie) => movie.id !== id));
    toast({
      title: "Movie Removed",
      description: "Successfully removed from watchlist",
      duration: 1000,
      isClosable: true,
      status: "error",
      position: "top",
      icon: <DeleteIcon />,
    });
  };

  return (
    <Box
      p={5}
      boxShadow="md"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Heading p="7" as="h3" size="xl" color="orange">
        My Watchlist
      </Heading>
      <br></br>
      <SimpleGrid>
        {list.map((movie) => (
          <>
            <Card
              key={movie.id}
              rounded="lg"
              width="100%"
              alignItems="start"
              justifyContent={"start"}
            >
              <CardHeader w={"100%"}>
                <Flex>
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    objectFit="cover"
                    maxH="200"
                    maxW="120"
                  />
                  <VStack
                    w="100%"
                    ml="15px"
                    alignItems="left"
                    justifyContent="space-between"
                  >
                    <VStack alignItems="left">
                      <Text textAlign="left" fontSize={20} fontWeight="bold">
                        {movie.title}
                      </Text>
                      <Text noOfLines={[1, 2]} fontSize={13}>
                        {movie.description}
                      </Text>
                    </VStack>
                    <HStack w={"100%"} justifyContent="flex-end">
                      <Button
                        id={movie.id.toString()}
                        onClick={getReviewPage}
                        leftIcon={<ViewIcon />}
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleRemove(movie.id)}
                        color="red.500"
                        leftIcon={<MinusIcon />}
                      >
                        Remove
                      </Button>
                    </HStack>
                  </VStack>
                </Flex>
              </CardHeader>
            </Card>
            <br></br>
          </>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Watchlist;
