// import { Center, Flex, Heading } from "@chakra-ui/react";
// import CustomContainer from "../../components/CustomContainer";

// export default function Home() {
//   return (
//     <Center h={"93vh"}>
//       {" "}
//       <CustomContainer maxW="500">
//         <Center mb={6}>
//           <Heading>Home</Heading>
//         </Center>
//       </CustomContainer>
//     </Center>
//   );
// }

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

const Home: React.FC = () => {
  return (
    <>
      <MovieGrid movies={movies}></MovieGrid>
    </>
  );
};

export default Home;