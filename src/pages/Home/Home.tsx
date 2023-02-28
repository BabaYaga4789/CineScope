import MovieGridItem from "@/components/MovieGridItem";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import { MovieDetails } from "../MovieData";
import { LabelNewReleased } from "@/components/LabelNewReleased";
import { LabelMostRated } from "@/components/LabelMostRated";
import { LabelAllMovies } from "@/components/LabelAllMovies";

export default function Home() {
  
  const ratedMovies =  MovieDetails.filter((movie) => {
    return movie.rating > 8});

  const newRealesed =  MovieDetails.filter((movie) => {
      return movie.year > 2019});

  const mostRatedMovies = ratedMovies.map((movie) => (
    <MovieGridItem key={movie.id} movie={movie} />
  ));

  const newRealesedMovies = newRealesed.map((movie) => (
    <MovieGridItem key={movie.id} movie={movie} />
  ));

  const allMovies = MovieDetails.map((movie) => (
    <MovieGridItem key={movie.id} movie={movie} />
  ));

  return (
    <VStack w="100%">
      <LabelMostRated/>
      {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {mostRatedMovies}
      </SimpleGrid>
      <LabelNewReleased/>
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {newRealesedMovies}
      </SimpleGrid>
      <LabelAllMovies/>
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {allMovies}
      </SimpleGrid>

    </VStack>
  );
}
