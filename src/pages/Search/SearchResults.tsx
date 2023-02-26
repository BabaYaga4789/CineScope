import FilterDropdown from "@/components/FilterDropdown";
import MovieGridItem from "@/components/MovieGridItem";
import SearchBar from "@/components/SearchBar";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { MovieDetails } from "../MovieData";

export const SearchResults = () => {
  const { state } = useLocation();
  const keyword = state.keyword;
  console.log(state.keyword);

  //Reference: https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58#:~:text=Firstly%2C%20we%20import%20useState%20from,list%20received%20from%20the%20parent
  const filteredMovies = MovieDetails.filter((movie) => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase());
  });
  const filtered = filteredMovies.map((movie) => (
    <MovieGridItem key={movie.id} movie={movie} />
  ));
  if (filtered.length == 0) {
    return (
      <div>
        {<SearchBar />}
        {<FilterDropdown />}

        {/* Reference: https://chakra-ui.com/docs/components/alert */}
        <Box as="section" marginBottom={5} marginLeft={5} marginRight={5}>
          <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No Results Found!!!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Try to Search again.
            </AlertDescription>
          </Alert>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        {<SearchBar />}
        {<FilterDropdown />}
        <SimpleGrid minChildWidth="350px" spacing="10px" ml={5} mr={5}>
          {filtered}
        </SimpleGrid>
      </div>
    );
  }
};
