import { AdminNavBar } from "../../components/AdminNavBar";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Image,
  Select,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import topMoviesList from "../../common/top-movies";
import newMoviesList from "../../common/new-movies";
import Movie from "@/common/Movie";
import MovieMagementService from "@/services/MovieManagementService";

export default function UpdateMovieDetails() {
  const id = useParams();
  const [cast, setCast] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const toast = useToast();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Map<string, string>>();
  const [movie, setMovie] = useState({
    title: "",
    released_date: Date,
    director: "",
    genres: [],
    time_in_minutes: "",
    plot: "",
    cast: [],
    images: [],
    thumbnail: "",
    poster: "",
    trailor: "",
  } as unknown as Movie);

  useEffect(() => {
  
    const movieManagementService = new MovieMagementService();
    const body: any = movieManagementService.fetchMovieByID(id);

    if(body == null){
      alert("Something went wrong loading movie details. Please try again.")
    } 
    else{
      setMovie(body);
    }

  }, []);

  const handleAddCast = () => {
    setCast([...cast, ""]);
  };

  const handleRemoveCast = (index: number) => {
    setCast(cast.filter((_, i) => i !== index));
  };

  const handleCastChange = (index: number, value: string) => {
    const newItems = [...cast];
    newItems[index] = value;
    debugger;
    setCast(newItems);
  };

  const handleAddGenre = () => {
    setGenre([...genre, ""]);
  };

  const handleRemoveGenre = (index: number) => {
    setGenre(genre.filter((_, i) => i !== index));
  };

  const handleGenreChange = (index: number, value: string) => {
    const newGenres = [...genre];
    newGenres[index] = value;
    setGenre(newGenres);
  };

  const checkCastNames = () => {
    for (let i = 0; i < cast.length; i++) {
      let name = cast[i];
      if (!/^[A-Za-z -]+$/.test(name)) {
        return true;
      }
    }
    return false;
  };

  const checkGenreNames = () => {
    for (let i = 0; i < genre.length; i++) {
      let name = genre[i];
      if (!/^[A-Za-z -]+$/.test(name)) {
        return true;
      }
    }
    return false;
  };

  const validateForm = () => {
    const errors = new Map();
    if (!movie.title) {
      errors.set("title", "Title is required");
    }

    if (!movie.poster) {
      errors.set("poster", "Poster link is required");
    }

    if (!movie.plot) {
      errors.set("plot", "Plot for the movie is required");
    } else if (movie.plot.split(" ").length >= 250) {
      errors.set("plot", "Plot details must be less than 250 letters.");
    }

    if (!movie.director) {
      errors.set("director", "Director name is required");
    } else if (!/^[A-Za-z ]+$/.test(movie.director)) {
      errors.set("director", "Director name must be in letters.");
    }
    if (cast.length == 0) {
      errors.set("cast", "Cast is required");
    } else if (checkCastNames()) {
      errors.set("cast", "Cast names must be in letters.");
    }
    if (genre.length == 0) {
      errors.set("genre", "Genre is required");
    } else if (checkGenreNames()) {
      errors.set("genre", "Genre names must be in letters.");
    }

    setFormErrors(errors);

    return errors.size === 0;
  };

  const handleUpdate = (event: any) => {
    // event.preventDefault();
    if (validateForm()) {
      toast({
        title: `Movie updated sucessfully.`,
        status: "success",
        isClosable: true,
      });
      navigate("/");
    }
  };

  const handleCancel = (event: any) => {
    navigate("/");
  };

  // const handleInputChange = (event: any) => {
  //   setFormValues({
  //     ...formValues,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  return (
    <div>
      <AdminNavBar></AdminNavBar>
      <Box bg="gray.100">
        <Container maxW="container.lg" py={8}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
            <Box>
              <Image
                src={movie.poster}
                alt={movie.title}
                objectFit="cover"
              />
            </Box>
            <Box>
              <FormControl isInvalid={!!formErrors?.get("title")}>
                <FormLabel htmlFor="title">Movie Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={movie.title}
                  onChange={(event: any) =>
                    setMovie({ ...movie, [event.target.id]: event.target.value })
                  }
                />
                <FormErrorMessage>{formErrors?.get("title")}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formErrors?.get("poster")}>
                <FormLabel htmlFor="firstname">Poster Link</FormLabel>
                <Input
                  type="text"
                  id="poster"
                  name="poster"
                  value={movie.poster}
                  onChange={(event: any) =>
                    setMovie({ ...movie, [event.target.id]: event.target.value })
                  }
                />
                <FormErrorMessage>{formErrors?.get("poster")}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formErrors?.get("plot")}>
                <FormLabel htmlFor="firstname">Plot (Description)</FormLabel>
                <Input
                  type="text"
                  id="plot"
                  name="plot"
                  value={movie.plot}
                  onChange={(event: any) =>
                    setMovie({ ...movie, [event.target.id]: event.target.value })
                  }
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
                  value={movie.director}
                  onChange={(event: any) =>
                    setMovie({ ...movie, [event.target.id]: event.target.value })
                  }
                />
                <FormErrorMessage>
                  {formErrors?.get("director")}
                </FormErrorMessage>
              </FormControl>

              {/* <FormControl isInvalid={!!formErrors?.get("year")}>
                <FormLabel htmlFor="firstname">Year</FormLabel>
                <Select
                  value={formValues.year}
                  onChange={handleInputChange}
                  id="year"
                  name="year"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{formErrors?.get("year")}</FormErrorMessage>
              </FormControl> */}

              <FormControl isInvalid={!!formErrors?.get("cast")}>
                <FormLabel htmlFor="cast">Cast</FormLabel>
                <Stack spacing="2">
                  {cast.map((item, index) => (
                    <Box key={index} display="flex">
                      <Input
                        value={item}
                        onChange={(e) =>
                          handleCastChange(index, e.target.value)
                        }
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
                        onChange={(e) =>
                          handleGenreChange(index, e.target.value)
                        }
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
                <Button onClick={handleUpdate} colorScheme="green">
                  {" "}
                  Update
                </Button>
                <Button onClick={handleCancel} colorScheme="red">
                  {" "}
                  Cancel
                </Button>
              </Flex>
            </Box>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
