import { useEffect } from "react";
import {
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import MovieMagementService from "@/services/MovieManagementService/MovieManagementService";
import { LabelMostRated } from "./LabelMostRated";
import MovieGridItemAdmin from "./MovieGridItemAdmin";
import { LabelNewReleased } from "./LabelNewReleased";
import { LabelAllMovies } from "./LabelAllMovies";

export default function ListOfNewMovies() {

  const [newMovies, setNewMovies] = useState<any>([]);
  
  useEffect(() => {
    
    const fetchLatestMovies = async () => {
      const movieManagementService = new MovieMagementService()
      const body: any = await movieManagementService.fetchLatestMovies();

      if(body == null){
        alert("Something went wrong loading latest movies. Please try again.")
      }
      else{
        for(let i =0 ;i < body.length; i++){
              const released_date = new Date(body[i].released_date);
              const yyyy = released_date.getFullYear();
              let mm:any = released_date.getMonth() + 1; 
              let dd:any = released_date.getDate();
              if (dd < 10) dd = '0' + dd;
              if (mm < 10) mm = '0' + mm;
              const formattedReleasedDate = mm + '/' + dd + '/' + yyyy;
              body[i].released_date = formattedReleasedDate;
          }
          setNewMovies(body);
      }
    }
    fetchLatestMovies();
  },[])

  return (
    <div>
       <LabelNewReleased/>
      <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
        {newMovies.map((newMovie : any) => (
         <MovieGridItemAdmin key={newMovie._id} movie={newMovie} />
      ))}
      </SimpleGrid>  
    </div>
  );
}
