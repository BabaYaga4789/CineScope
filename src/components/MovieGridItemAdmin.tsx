/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import Movie from "@/common/Movie";
import { MovieManagementState } from "@/services/MovieManagementService/MovieManagementEnum";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  StarIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Image,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface MovieGridItemProps {
  movie: Movie;
}

export default function MovieGridItemAdmin(
  props: MovieGridItemProps
): JSX.Element {

  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteId, setDeleteID] = useState<any>();
  const toast = useToast();
  const [deleteMovieTitle, setDeleteMovieTitle] = useState<string>("");


  const navigate = useNavigate();

  const onDeleteIcon = async (id: any, title: string) => {
    setIsOpen(true);
    setDeleteID(id);
    setDeleteMovieTitle(title);
  };

  const onEditIcon = async (id: any) => {
    navigate(`/update-movie-details/${id}`);
  };

  const onClickDelete = async (id: any) => {
    setIsOpen(false);
    const movieMangementService = new MovieMagementService();
    const state = await movieMangementService.deleteMovieByID(id.deleteId);
    
    if (state == MovieManagementState.MovieDeleteSuccess) {
      toast({
        title: `Movie deleted sucessfully.`,
        status: "success",
        isClosable: true,
      });
      window.location.reload();  
    } else {
      alert(state);
    }

  };

  return (
    <Card
      key={props.movie._id}
      rounded="lg"
      width={["100%", "100%","100%", "100%"]}
      height = {["100%", "100%","100%", "100%"]}
      alignItems="center"
    >
      <Image
        src={props.movie.poster}
        alt="movie-poster"
        objectFit="cover"
        width={["75%", "75%","100%", "100%"]}
        height = {["75%", "75%","100%", "100%"]}
      />
      <CardBody color="gray.500">
        <Text>{props.movie.title}</Text>
      </CardBody>
      <Box display="flex" mt={["0","0","2","2"]} alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              key={i}
              // color={i < props.movie.rating / 2 ? "teal.500" : "gray.300"}
              mt={["0","0","2","2"]}
              color={i < 8 / 2 ? "teal.500" : "gray.300"}
            />
          ))}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {/* ({props.movie.reviewCount}) */} 20
        </Box>
      </Box>

      <Box display="flex" mt="2" alignItems="center" color="gray.500">
        {props.movie.released_date.toString()}
      </Box>
      <HStack w="100%" p={4} gap={10} justifyContent="center">
        <EditIcon
          // boxSize={[10, 3, 5]}
          boxSize={"25px"}
          onClick={() => {
            onEditIcon(props.movie._id);
          }}
          color="green.500"
        ></EditIcon>
        <DeleteIcon
          boxSize={"25px"}
          onClick={() => {
            onDeleteIcon(props.movie._id, props.movie.title);
          }}
          color="red.500"
        ></DeleteIcon>
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Movie
            </AlertDialogHeader>

            <AlertDialogBody>
              Do you really want to delete movie <b>{deleteMovieTitle}</b>? You
              can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => onClickDelete({ deleteId })}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Card>
  );
}
