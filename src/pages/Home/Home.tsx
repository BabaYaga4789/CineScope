import MovieGridItem from "@/components/MovieGridItem";
import { useEffect, useState } from "react";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import { MovieDetails } from "../MovieData";
import { LabelNewReleased } from "@/components/LabelNewReleased";
import { LabelMostRated } from "@/components/LabelMostRated";
import { LabelAllMovies } from "@/components/LabelAllMovies";
import MovieMagementService from "@/services/MovieManagementService";

export default function Home() {

  const [latestMovies, setLatestMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const movieManagementService = new MovieMagementService();

  const newRealesedMovies = latestMovies.map((movie) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));

  const totalMovies = allMovies.map((movie) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));

  const fetchAllMovies = async ()  =>  {
    const body: any = await movieManagementService.fetchAllMovies();
    if(body == null){
      alert("Something went wrong loading latest movies. Please try again.")
    }
    else{
      setAllMovies(body);
    }
  } 

  const fetchLatestMovies =async () => {
    const body: any = await movieManagementService.fetchLatestMovies();
    if(body == null){
      alert("Something went wrong loading latest movies. Please try again.")
    }
    else{
      setLatestMovies(body);
    }
  }

  useEffect(() => {
    fetchLatestMovies();
    fetchAllMovies();
  },[])

  return (
    <VStack w="100%">
      <LabelMostRated/>
      {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
      {/* <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {mostRatedMovies}
      </SimpleGrid> */}
      <LabelNewReleased/>
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {newRealesedMovies}
      </SimpleGrid>
      <LabelAllMovies/>
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {totalMovies}
      </SimpleGrid>

    </VStack>
  );
}
