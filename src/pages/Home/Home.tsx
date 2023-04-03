import { LabelAllMovies } from "@/components/LabelAllMovies";
import { LabelNewReleased } from "@/components/LabelNewReleased";
import MovieGridItem from "@/components/MovieGridItem";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [latestMovies, setLatestMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [mostRatedMovies, setMostRatedMovies] = useState([]);
  const movieManagementService = new MovieMagementService();

  const newRealesedMovies = latestMovies.map((movie: any) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));

  const totalMovies = allMovies.map((movie: any) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));

  // const highestRatedMovies = mostRatedMovies.map((movie: any) => (
  //   <MovieGridItem key={movie._id} movie={movie} />
  // ));

  const fetchAllMovies = async () => {
    const body: any = await movieManagementService.fetchAllMovies();
    if (body == null) {
      alert("Something went wrong loading latest movies. Please try again.");
    } else {
      setAllMovies(body);
    }
  };

  const fetchLatestMovies = async () => {
    const body: any = await movieManagementService.fetchLatestMovies();
    if (body == null) {
      alert("Something went wrong loading latest movies. Please try again.");
    } else {
      setLatestMovies(body);
    }
  };

  const fetchMostRatedMovies = async () => {
    const body: any = await movieManagementService.fetchMostRatedMovies();
    if (body == null) {
      alert("Something went wrong loading most rated movies. Please try again.");
    } else {
      setMostRatedMovies(body);
    }
  };

  useEffect(() => {
    fetchLatestMovies();
    fetchAllMovies();
    // fetchMostRatedMovies();
  }, []);

  return (
    <VStack w="100%">
      {/* <LabelMostRated /> */}
      {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
      {/* <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {highestRatedMovies}
      </SimpleGrid> */}
      <LabelNewReleased />
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {newRealesedMovies}
      </SimpleGrid>
      <LabelAllMovies />
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {totalMovies}
      </SimpleGrid>
    </VStack>
  );
}
