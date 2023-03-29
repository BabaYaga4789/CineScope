import { useEffect } from "react";
import {
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import MovieMagementService from "@/services/MovieManagementService";
import { LabelMostRated } from "./LabelMostRated";
import MovieGridItemAdmin from "./MovieGridItemAdmin";
import { LabelNewReleased } from "./LabelNewReleased";
import { LabelAllMovies } from "./LabelAllMovies";

export default function ListOfNewMovies() {

  const [newMovies, setNewMovies] = useState<any>([]);
  const [allMovies, setAllMovies] = useState<any>([]);
  
  useEffect(() => {
    
    const fetchLatestMovies = async () => {
      const movieManagementService = new MovieMagementService()
      const body: any = await movieManagementService.fetchLatestMovies();

      if(body == null){
        alert("Something went wrong loading latest movies. Please try again.")
      }
      else{
        for(let i =0 ;i < body.length; i++){
              const released_date = new Date(body[i].released_date);
              const yyyy = released_date.getFullYear();
              let mm:any = released_date.getMonth() + 1; 
              let dd:any = released_date.getDate();
              if (dd < 10) dd = '0' + dd;
              if (mm < 10) mm = '0' + mm;
              const formattedReleasedDate = mm + '/' + dd + '/' + yyyy;
              body[i].released_date = formattedReleasedDate;
          }
          setNewMovies(body);
      }
    }
    const fetchAllMovies = async () => {
      const movieManagementService = new MovieMagementService()
      const body: any = await movieManagementService.fetchAllMovies();

      if(body == null){
        alert("Something went wrong loading latest movies. Please try again.")
      }
      else{
        for(let i =0 ;i < body.length; i++){
              const released_date = new Date(body[i].released_date);
              const yyyy = released_date.getFullYear();
              let mm:any = released_date.getMonth() + 1; 
              let dd:any = released_date.getDate();
              if (dd < 10) dd = '0' + dd;
              if (mm < 10) mm = '0' + mm;
              const formattedReleasedDate = mm + '/' + dd + '/' + yyyy;
              body[i].released_date = formattedReleasedDate;
          }
          setAllMovies(body);
      }
    }
    fetchLatestMovies();
    fetchAllMovies();
  },[])

  return (
    <div>

  <VStack w="100%">
      {/* <LabelMostRated/> */}
      {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
      {/* <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {mostRatedMovies}
      </SimpleGrid>
       */}
       <LabelNewReleased/>
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {newMovies.map((newMovie : any) => (
         <MovieGridItemAdmin key={newMovie._id} movie={newMovie} />
      ))}
      </SimpleGrid>
      <LabelAllMovies/>
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
          {allMovies.map((movie : any) => (
         <MovieGridItemAdmin key={movie._id} movie={movie} />
      ))}
      </SimpleGrid>

    </VStack>
      {/* <Box>
        <Heading as="h2" size={["sm", "md", "lg"]} textColor="black" p="10px">
          New Movies
        </Heading>

        <List
          styleType="none"
          pt="20px"
          spacing="5px"
          flexDirection={["column", "row"]}
          ml={5}
          mr={5}
        >
          <Flex justifyContent="space-around" wrap="wrap">
            {newMovies.map((newMovie : any) => (
              <ListItem key={newMovie._id} boxSize={["50px", "150px", "175px"]}>
                <Image src={newMovie.poster} alt="Film" boxSize="200px" />
                <Text fontWeight="bold" fontSize="20px">
                  {newMovie.title}
                </Text>
                <HStack alignItems="center">
                  <Text color="gray.500" fontSize="20px">
                    ({newMovie.released_date})
                  </Text>
                  <Spacer></Spacer>
                  <EditIcon
                    boxSize={[1, 3, 5]}
                    onClick={() => {
                      onEditIcon(newMovie.id);
                    }}
                    color="green.500"
                  ></EditIcon>
                  <DeleteIcon
                    boxSize={[1, 3, 5]}
                    onClick={() => {
                      onDeleteIcon(newMovie.id, newMovie.title);
                    }}
                    color="red.500"
                  ></DeleteIcon>
                </HStack>
              </ListItem>
            ))}
          </Flex>
        </List>
      </Box> */}

      
    </div>
  );
}
