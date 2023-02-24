import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Box, Center, Heading, Flex, Select, Stack, useToast
  } from "@chakra-ui/react";
import { AdminNavBar } from '../../components/AdminNavBar';
export default function AddMovie() {

    const [formValues, setFormValues] = useState({
        title: "",
        poster: "",
        year: "2023",
        director: "",
        plot:""
      });


      const checkCastNames = () => {
        for (let i =0; i<cast.length; i++){
          let name = cast[i];
          if(!/^[A-Za-z ]+$/.test(name)){
            return true;
          }
        }
        return false;
      }

      const checkGenreNames = () => {
        for (let i =0; i<genre.length; i++){
          let name = genre[i];
          if(!/^[A-Za-z ]+$/.test(name)){
            return true;
          }
        }
        return false;
      }
    // To navigate to different URL.
     const navigate = useNavigate();
      const [formErrors, setFormErrors] = useState<Map<string, string>>();

  
      const validateForm = () => {
        // Using Map
        const errors = new Map();
        if (!formValues.title) {
          errors.set("title", "Title is required");
        } 
    
        if (!formValues.poster) {
            errors.set("poster", "Poster link is required");
        } else if (formValues.poster.match(/\.(jpeg|jpg|gif|png)$/) == null) {
            errors.set("poster", "Poster link is invalid image.");
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
      debugger

        setFormErrors(errors);
        
        return errors.size === 0;
      };
    
      const handleInputChange = (event:any) => {
        setFormValues({
          ...formValues,
          [event.target.name]: event.target.value,
        });
      };
    
      

  const years = [];
  for (let i = 2023; i >= 1970; i--) {
    years.push(i);
  }


  const [cast, setCast] = useState<string[]>([]);

  const handleAddCast = () => {
    setCast([...cast, ""]);
  };

  const handleRemoveCast = (index: number) => {
    setCast(cast.filter((_, i) => i !== index));
  };

  const handleCastChange = (index: number, value: string) => {
    const newItems = [...cast];
    newItems[index] = value;
    setCast(newItems);
  };

  const [genre, setGenre] = useState<string[]>([]);

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

  const toast = useToast();
  const handleSubmit = (event: any) => {
    // event.preventDefault();
    if (validateForm()) {
      toast({
        title: `Movie added sucessfully.`,
        status: 'success',
        isClosable: true,
      })
        navigate('/admin-home/')
    }
   
  };

  const handleCancel = (event: any) => {
      navigate('/admin-home/')
  };
  return (
    <div>
      <AdminNavBar></AdminNavBar>
          <Center m={[2,5,10]}> 
    
    <Box p="6" shadow="md" borderWidth="1px" borderRadius="md" width={[200,300,500]} bg="white" >
    <Heading padding={[2,4,6]}>Add a movie</Heading>
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
            <Button onClick={handleSubmit} colorScheme="green"> Submit</Button>
            <Button onClick={handleCancel} colorScheme="red" > Cancel</Button>
        </Flex>
    </Box>
    </Center>
    </div>
  )
}
