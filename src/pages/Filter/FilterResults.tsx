import { SimpleGrid, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { MovieDetails } from "../MovieData";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import { AlertForNoMovieFound } from "@/components/AlertForNoMovieFound";
import { useEffect, useState } from "react";
import MovieGridItem from "@/components/MovieGridItem";

export const FilterResults = () => {
  const { state } = useLocation();
  
  if(state == null)
  {
    const movies = MovieDetails.map((movie) => (
      <MovieGridItem key={movie.id} movie={movie} />
    ));
  
    return (
      <VStack w="100%">
        <SearchBar />
        <FilterDropdown />
        {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
        <SimpleGrid w="70%" columns={{ base: 1, md: 3, lg: 6 }} gap={6}>
          {movies}
        </SimpleGrid>
      </VStack>
    );
  }
  else{
    const option = state.option;
    console.log(option);
    const [afterFilteration, setAfterFilteration] = useState(MovieDetails);

    if(option=="search"){

      useEffect(() => {
        const searchmovie = async () =>{
          const keyword = state.keyword;
          const filteredMovies =  MovieDetails.filter((movie) => {
            return movie.title.toLowerCase().includes(keyword.toLowerCase());
          });
          setAfterFilteration(filteredMovies);
        }
        searchmovie();
      }, [])
    }
    else if(option=="filter"){
      let genre = state.genre;
      let year = state.year;
      let rating = state.rating;

      const filterGenre = (array: any[]) => {
        if (genre!="") {
          return  array.filter((movie) => {
            return movie.genre == genre;
          });
        } else {
          return array;
        }
      };
      const filterRatings = (array: any[]) => {
        if (rating!="") {
          return array.filter((movie) => {
            return movie.rating == rating;
          });
        } else {
          return array;
        }
      };
      const filterYear = (array: any[]) => {
        if (year!="") {
          return array.filter((movie) => {
            return movie.year == year;
          });
        } else {
          return array;
        }
      }
      useEffect(() => {
        let result = MovieDetails;
        result = filterGenre(result);
        result = filterRatings(result);
        result = filterYear(result);
        setAfterFilteration(result);
      }, [])
      
    }

    if(afterFilteration.length == 0)
    {
      return (
        <VStack w="100%">
        {<SearchBar />}
        {<FilterDropdown />}
        {<AlertForNoMovieFound/>}
        </VStack>
      );
    }
    else{
      const filtered = afterFilteration.map((movie) => (
          <MovieGridItem key={movie.id} movie={movie} />
        ));
        // afterFilteration.length = 0;
        return(
        <VStack w="100%">
           {<SearchBar />}
           {<FilterDropdown />}
           <SimpleGrid w="70%" columns={{ base: 1, md: 3, lg: 6 }} gap={6}>
             {filtered}
           </SimpleGrid>
         </VStack>
        );
    }
  }
}