import React from 'react';
import MovieGrid from '@/components/MovieGrid';

interface Movie {
  id: number;
  poster: string;
  title: string;
}

const movies: Movie[] = [
  {
    id: 1,
    poster: "/img/ShawshankRedemptionMoviePoster.jpeg",
    title: "The Shawshank Redemption"
  },
  {
    id: 2,
    poster: "/img/AvatarPoster.jpeg",
    title: "Avatar: The Way of Water"
  },
  {
    id: 3,
    poster: "/img/Forrest_Gump_poster.jpeg",
    title: "Forrest Gump"
  },
  {
    id: 4,
    poster: "/img/The_Menu_Poster.jpeg",
    title: "The Menu"
  },
  {
    id: 5,
    poster: "/img/Dil_Chahta_Hai.jpeg",
    title: "Dil Chahta Hai"
  }
  // ...
];

const Home2: React.FC = () => {
  
  return (
    <>
      <MovieGrid movies={movies}></MovieGrid>
    </>
  );
};

export default Home2;