import MovieGridItem from "@/components/MovieGridItem";
import { useEffect, useState } from "react";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import { MovieDetails } from "../MovieData";
import { LabelNewReleased } from "@/components/LabelNewReleased";
import { LabelMostRated } from "@/components/LabelMostRated";
import { LabelAllMovies } from "@/components/LabelAllMovies";

export default function Home() {

  const [newMovies, setNewMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  
  // const ratedMovies =  MovieDetails.filter((movie) => {
  //   return movie.rating > 8});

  // const mostRatedMovies = ratedMovies.map((movie) => (
  //   <MovieGridItem key={movie.id} movie={movie} />
  // ));

  const newRealesedMovies = newMovies.map((movie) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));

  const totalMovies = allMovies.map((movie) => (
    <MovieGridItem key={movie._id} movie={movie} />
  ));

  const fetchAllMovies = async ()  =>  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    let url = "http://localhost:3001/movie/fetch-all-movies";
    await fetch(url, requestOptions)
    .then(async (res) => {
    
        if(res.status == 200){
          const data = await res.json();
          console.log(data);
          setAllMovies(data);
        }
        else{
          alert("Something went wrong while searching...")
        }
    })
    .catch((error) => {
      console.log(error);
      alert("Interal server error.");
    });
  } 

  const fetchLatestMovies =async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: "GET",
      headers: myHeaders
    };
    let url = " http://localhost:3001/movie/fetch-latest-movies/";
    await fetch(url, requestOptions)
      .then((response) => response.json()).then((res) => {
        for(let i =0 ;i < res.length; i++){
            const released_date = new Date(res[i].released_date);
            const yyyy = released_date.getFullYear();
            let mm:any = released_date.getMonth() + 1; 
            let dd:any = released_date.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const formattedReleasedDate = mm + '/' + dd + '/' + yyyy;
            res[i].released_date = formattedReleasedDate;
        }
        setNewMovies(res);
      })
      .catch((error) => {
        console.log(error);
        alert("Interal server error.");
      });
  }

  useEffect(() => {
    fetchLatestMovies();
    fetchAllMovies();
  },[])

  return (
    <VStack w="100%">
      <LabelMostRated/>
      {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
      {/* <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {mostRatedMovies}
      </SimpleGrid> */}
      <LabelNewReleased/>
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {newRealesedMovies}
      </SimpleGrid>
      <LabelAllMovies/>
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {totalMovies}
      </SimpleGrid>

    </VStack>
  );
}
