import { Divider, SimpleGrid, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { MovieDetails } from "../MovieData";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import { AlertForNoMovieFound } from "@/components/AlertForNoMovieFound";
import { useEffect, useState } from "react";
import MovieGridItem from "@/components/MovieGridItem";

export const FilterResults = () => {
    const {state} = useLocation();
    const [searchValue, setSearchValue] = useState();
    console.log("state", state);
    const [afterFilteration, setAfterFilteration] = useState(MovieDetails);
    const movies = MovieDetails.map((movie) => (
        <MovieGridItem key={movie.id} movie={movie} />
      ));
    
    useEffect(() => {
        console.log("state", state)
    const searchmovie = async () =>{
        const keyword = state.keyword;
        const filteredMovies =  MovieDetails.filter((movie) => {
            return movie.title.toLowerCase().includes(keyword.toLowerCase());
        });
        setAfterFilteration(filteredMovies);
    }
    searchmovie();
    }, [])

    return (<>
            {state===null ? 
            <VStack w="100%">
                <SearchBar />
                <FilterDropdown />
                {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
                <SimpleGrid w="70%" columns={{ base: 1, md: 3, lg: 6 }} gap={6}>
                {movies}
                </SimpleGrid>
            </VStack>: <>Temp</>}
            </>
        )
}