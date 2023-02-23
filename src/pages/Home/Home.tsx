import { Center, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import CustomContainer from "../../components/CustomContainer";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import { MovieDetails } from "./Datafile";
import { BoxForMovie } from "@/components/BoxForMovie";

export default function Home() {

  const movies = MovieDetails.map(movie =>  <BoxForMovie key={movie.id} movie={movie} />);

  return (
    <div>
      <SearchBar/>
      <FilterDropdown/>
      {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
      <SimpleGrid minChildWidth='350px' spacing='10px' direction={["column", "row"]} ml={5} mr={5}>
        { movies }
      </SimpleGrid>
    </div>
  );
}

