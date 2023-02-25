<<<<<<< HEAD
import { Center, Flex, Heading } from "@chakra-ui/react";
import CustomContainer from "../../components/CustomContainer";

export default function Home() {
  return (
    <Center h={"93vh"}>
      {" "}
      <CustomContainer maxW="500">
        <Center mb={6}>
          <Heading>Home</Heading>
        </Center>
      </CustomContainer>
    </Center>
=======
import FilterDropdown from "@/components/FilterDropdown";
import MovieGridItem from "@/components/MovieGridItem";
import SearchBar from "@/components/SearchBar";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import { MovieDetails } from "../MovieData";

export default function Home() {
  const movies = MovieDetails.map((movie) => (
    <MovieGridItem key={movie.id} movie={movie} />
  ));

  return (
    <VStack w="100%">
      <SearchBar />
      <FilterDropdown />
      {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {movies}
      </SimpleGrid>
    </VStack>
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c
  );
}
