import Movie from "@/common/Movie";
import AddMovieDialog from "@/components/AddMovieDialog";
import { AddIcon, CheckIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MovieGridItemProps {
  movie: Movie;
}

export default function MovieGridItem(props: MovieGridItemProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAdded, setIsAdded] = useState(false);
  const navigateTo = useNavigate();

  const getReviewPage = (e: any) => {
    e.preventDefault();
    navigateTo("/reviews", { state: e.target.id });
  };

  return (
    <Card
      key={props.movie.id}
      rounded="lg"
      width="100%"
      overflow="hidden"
      alignItems="center"
    >
      <Image
        src={props.movie.poster}
        alt={props.movie.imageAlt}
        objectFit="cover"
        height="300px"
        width="200px"
      />
      <CardBody color="gray.500">
        <Text>{props.movie.title}</Text>
      </CardBody>
      <Box display="flex" mt="2" alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < props.movie.rating / 2 ? "teal.500" : "gray.300"}
            />
          ))}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          ({props.movie.reviewCount})
        </Box>
      </Box>
      <VStack w="100%" p={4}>
        <Button
          w="100%"
          id={props.movie.id.toString()}
          onClick={getReviewPage}
          leftIcon={<ViewIcon />}
        >
          View
        </Button>
        <Button
          w="100%"
          leftIcon={!isAdded ? <AddIcon /> : <CheckIcon />}
          onClick={!isAdded ? onOpen : () => {}}
        >
          {!isAdded ? "Watchlist" : "Added"}
        </Button>
        <AddMovieDialog
          isAdded={setIsAdded}
          isOpen={isOpen}
          onClose={onClose}
          movie={props.movie}
        />
      </VStack>
    </Card>
  );
}
