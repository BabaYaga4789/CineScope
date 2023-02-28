import { AdminNavBar } from '../../components/AdminNavBar'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, Grid, Image, Select, Stack, Flex, FormControl,
  FormLabel,
  Input,
  FormErrorMessage, 
  useToast} from "@chakra-ui/react";
import topMoviesList from '../../common/top-movies';
import newMoviesList from '../../common/new-movies';


export default function UpdateMovieDetails() {


const id = useParams();
const [cast, setCast] = useState<string[]>([]);
const [genre, setGenre] = useState<string[]>([]);
const toast = useToast();
const navigate = useNavigate();
const [formErrors, setFormErrors] = useState<Map<string, string>>();
const years = [];
const [formValues, setFormValues] = useState({
  title: "",
  poster: "",
  year: "",
  director: "",
  plot:"",
  rating: ""
});



useEffect(() => {
    
    for (let i = 0; i < topMoviesList.length; i++) {
        let movie_id:any = topMoviesList[i].id;
        
        if(String(movie_id) == id.id){
          formValues.title = topMoviesList[i].title
          formValues.poster = topMoviesList[i].poster
          formValues.year = String(topMoviesList[i].year)
          formValues.director = topMoviesList[i].director
          formValues.plot = topMoviesList[i].plot
          formValues.rating = String(topMoviesList[i].rating)
          setCast(topMoviesList[i].cast)
          setGenre(topMoviesList[i].genres)
        }
    }

    for (let i = 0; i < newMoviesList.length; i++) {
        let movie_id = newMoviesList[i].id;
        if(String(movie_id) == id.id){
          formValues.title = newMoviesList[i].title
          formValues.title = newMoviesList[i].title
          formValues.poster = newMoviesList[i].poster
          formValues.year = String(newMoviesList[i].year)
          formValues.director = newMoviesList[i].director
          formValues.plot = newMoviesList[i].plot
          formValues.rating = String(newMoviesList[i].rating)
          setCast(newMoviesList[i].cast)
          setGenre(newMoviesList[i].genres)
        }
        
    }
    
   
    
    
  },[]);


  const handleAddCast = () => {
    setCast([...cast, ""]);
  };

  const handleRemoveCast = (index: number) => {
    setCast(cast.filter((_, i) => i !== index));
  };

  const handleCastChange = (index: number, value: string) => {
    
    const newItems = [...cast];
    newItems[index] = value;
    debugger
    setCast(newItems);
  };

  const handleAddGenre = () => {
    setGenre([...genre, ""]);
  };

  const handleRemoveGenre= (index: number) => {
    setGenre(genre.filter((_, i) => i !== index));
  };

  const handleGenreChange = (index: number, value: string) => {
    const newGenres = [...genre];
    newGenres[index] = value;
    setGenre(newGenres);
  };

  for (let i = 2023; i >= 1970; i--) {
    years.push(i);
  }
  
  const checkCastNames = () => {
  
    for (let i =0; i<cast.length; i++){
      let name = cast[i];
      if(!/^[A-Za-z -]+$/.test(name)){
        return true;
      }
    }
    return false;
  }

  const checkGenreNames = () => {
    
    for (let i =0; i<genre.length; i++){
      let name = genre[i];
      if(!/^[A-Za-z -]+$/.test(name)){
        return true;
      }
    }
    return false;
  }

  const validateForm = () => {
    const errors = new Map();
    if (!formValues.title) {
      errors.set("title", "Title is required");
    } 

    if (!formValues.poster) {
        errors.set("poster", "Poster link is required");
    } 
    
    if (!formValues.plot) {
        errors.set("plot", "Plot for the movie is required");
    } else if (formValues.plot.split(' ').length >=250) {
        errors.set("plot", "Plot details must be less than 250 letters.");
    }

    if (!formValues.director) {
        errors.set("director", "Director name is required");
    } else if (!/^[A-Za-z ]+$/.test(formValues.director)) {
        errors.set("director", "Director name must be in letters.");
    }
    if (cast.length == 0) {
      errors.set("cast", "Cast is required");
    } else if (checkCastNames()){
      errors.set("cast", "Cast names must be in letters.");
    }
    if (genre.length == 0) {
      errors.set("genre", "Genre is required");
    } else if (checkGenreNames()){
    errors.set("genre", "Genre names must be in letters.");
    }
    if(formValues.year == ""){
      errors.set("year", "Year is required");
    }

    setFormErrors(errors);
    
    return errors.size === 0;
  };

  
  const handleUpdate =  (event: any) => {
    // event.preventDefault();
    if ( validateForm()) {
      toast({
        title: `Movie updated sucessfully.`,
        status: 'success',
        isClosable: true,
      })
        navigate('/admin-home/')
    }
   
  };

  const handleCancel = (event: any) => {
      navigate('/admin-home/')
  };
  
  const handleInputChange = (event:any) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  
  return (
    <div>
    <AdminNavBar></AdminNavBar>  
    <Box bg="gray.100">
      <Container maxW="container.lg" py={8}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
            
          <Box>
            <Image src={formValues.poster} alt={formValues.title} objectFit="cover" />
          </Box>
          <Box>
            
              <FormControl isInvalid={!!formErrors?.get("title")}>
                <FormLabel htmlFor="title">Movie Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                />
                <FormErrorMessage>{formErrors?.get("title")}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formErrors?.get("poster")}>
        <FormLabel htmlFor="firstname">Poster Link</FormLabel>
        <Input
          type="text"
          id="poster"
          name="poster"
          value={formValues.poster}
          onChange={handleInputChange}
        />
        <FormErrorMessage>{formErrors?.get("poster")}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formErrors?.get("plot")}>
        <FormLabel htmlFor="firstname">Plot (Description)</FormLabel>
        <Input
          type="text"
          id="plot"
          name="plot"
          value={formValues.plot}
          onChange={handleInputChange}
        />
        <FormErrorMessage>{formErrors?.get("plot")}</FormErrorMessage>
        <small>Must be less than 250 words.</small>
      </FormControl>

      <FormControl isInvalid={!!formErrors?.get("director")}>
        <FormLabel htmlFor="director">Director Name</FormLabel>
        <Input
          type="text"
          id="director"
          name="director"
          value={formValues.director}
          onChange={handleInputChange}
        />
        <FormErrorMessage>{formErrors?.get("director")}</FormErrorMessage>
      </FormControl>


      <FormControl isInvalid={!!formErrors?.get("year")}>
        <FormLabel htmlFor="firstname">Year</FormLabel>
         <Select value={formValues.year} onChange={handleInputChange} id="year"
          name="year">
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        <FormErrorMessage>{formErrors?.get("year")}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formErrors?.get("cast")}>
        <FormLabel htmlFor="cast">Cast</FormLabel>
        <Stack spacing="2">
            {cast.map((item, index) => (
              <Box key={index} display="flex">
                <Input
                  value={item}
                  onChange={(e) => handleCastChange(index, e.target.value)}
                  placeholder={`Cast ${index + 1}`}
                  flex="1"
                  mr="2"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleRemoveCast(index)}
                >
                  Remove Cast
                </Button>
              </Box>
            ))}
            <Button type="button" onClick={handleAddCast}>
              Add Cast
            </Button>
          </Stack>
          <FormErrorMessage>{formErrors?.get("cast")}</FormErrorMessage>
      </FormControl>
      


      <FormControl isInvalid={!!formErrors?.get("genre")}>
        <FormLabel htmlFor="genre">Genre</FormLabel>
        <Stack spacing="2">
            {genre.map((item, index) => (
              <Box key={index} display="flex">
                <Input
                  value={item}
                  onChange={(e) => handleGenreChange(index, e.target.value)}
                  placeholder={`Genre ${index + 1}`}
                  flex="1"
                  mr="2"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleRemoveGenre(index)}
                >
                  Remove Genre
                </Button>
              </Box>
            ))}
            <Button type="button" onClick={handleAddGenre}>
              Add Genre
            </Button>
          </Stack>
          <FormErrorMessage>{formErrors?.get("genre")}</FormErrorMessage>
      </FormControl>
   
      <Flex mt="5" gap={5} justifyContent="left">
            <Button onClick={handleUpdate} colorScheme="green"> Update</Button>
            <Button onClick={handleCancel} colorScheme="red" > Cancel</Button>
        </Flex>
    
           </Box>

        </Grid>
      </Container>
    </Box>
    </div>
  )
}
