import React from "react";
import { Box, Grid, Image, Card, CardHeader, Flex, CardBody, Text, CardFooter, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import Movie from '@/common/Movie'
import MovieGridItem  from '@/components/MovieGridItem'

interface MovieGridProps {
  movies: Movie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <SimpleGrid minChildWidth="150px" spacing="40px" ml="20px" mr="20px">
      {movies.map((movie) => (
        <MovieGridItem movie = {movie}></MovieGridItem>
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;