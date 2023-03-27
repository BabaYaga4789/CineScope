import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Center,
  Heading,
  Flex,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { AdminNavBar } from "../../components/AdminNavBar";
export default function AddMovie() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Map<string, string>>();
  const [cast, setCast] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [image, setImage] = useState<string[]>([]);

  const toast = useToast();

  useEffect(() => {
    var today = new Date().toISOString().split("T")[0];
    document.getElementById("released_date").setAttribute("max", today);
  }, []);

  const [formValues, setFormValues] = useState({
    title: "",
    poster: "",
    released_date: undefined,
    director: "",
    plot: "",
    time_in_minutes: "",
    thumbnail: "",
    trailor: ""
  });

  const checkCastNames = () => {
    for (let i = 0; i < cast.length; i++) {
      let name = cast[i];
      if (!/^[A-Za-z ]+$/.test(name)) {
        return true;
      }
    }
    return false;
  };

  const checkGenreNames = () => {
    for (let i = 0; i < genre.length; i++) {
      let name = genre[i];
      if (!/^[A-Za-z ]+$/.test(name)) {
        return true;
      }
    }
    return false;
  };

  const checkImage = () => {
    for (let i = 0; i < image.length; i++) {
      let name = image[i];
      if (name.match(/\.(jpeg|jpg|gif|png)$/) == null) {
        return true;
      }
    }
    return false;
  };

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

  const handleAddImage = () => {
    setImage([...image, ""]);
  };

  const handleRemoveImage = (index: number) => {
    setImage(image.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...image];
    newImages[index] = value;
    setImage(newImages);
  };

  const validateForm = () => {
    // Using Map
    const errors = new Map();
    if (!formValues.title) {
      errors.set("title", "Title is required");
    }

    if (!formValues.poster) {
      errors.set("poster", "Poster link is required");
    } else if (formValues.poster.match(/\.(jpeg|jpg|gif|png)$/) == null) {
      errors.set(
        "poster",
        "Poster link must be in valid format(jpeg|jpg|gif|png)."
      );
    }

    if (!formValues.plot) {
      errors.set("plot", "Plot for the movie is required");
    } else if (formValues.plot.split(" ").length >= 250) {
      errors.set("plot", "Plot details must be less than 250 letters.");
    }

    if (!formValues.director) {
      errors.set("director", "Director name is required");
    } else if (!/^[A-Za-z ]+$/.test(formValues.director)) {
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
    if (formValues.released_date == undefined || formValues.released_date == "") {
      errors.set("released_date", "Released date is required");
    }
    if (formValues.time_in_minutes == "") {
      errors.set("time_in_minutes", "Time in minutes is required");
    } else if (!/^\d+$/.test(formValues.time_in_minutes)) {
      errors.set("time_in_minutes", "Time in minutes must be in digits.");
    }
    if (image.length == 0) {
      errors.set("images", "Image is required");
    } else if (checkImage()) {
      errors.set("images", "Images must be in valid format(jpeg|jpg|gif|png).");
    }

    if (!formValues.thumbnail) {
      errors.set("thumbnail", "Thumbnail link is required");
    } else if (formValues.thumbnail.match(/\.(jpeg|jpg|gif|png)$/) == null) {
      errors.set(
        "thumbnail",
        "Thumbnail link must be in valid format(jpeg|jpg|gif|png)."
      );
    }

    if (!formValues.trailor) {
      errors.set("trailor", "Trailor link is required");
    } else if (formValues.trailor.match(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/) == null) {
      errors.set(
        "trailor",
        "Trailor link must be in valid youtube link."
      );
    }

    setFormErrors(errors);

    return errors.size === 0;
  };

  const handleInputChange = (event: any) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    // event.preventDefault();
    if (validateForm()) {
      var myHeaders = new Headers();
      var raw = JSON.stringify({
        title: formValues.title,
        released_date: formValues.released_date,
        director: formValues.director,
        genres: genre,
        time_in_minutes: formValues.time_in_minutes,
        plot: formValues.plot,
        cast: cast,
        images: image,
        thumbnail: formValues.thumbnail,
        poster: formValues.poster,
      });
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw
      };
      let url = " http://127.0.0.1:3000/movie/add-movie/";
      await fetch(url, requestOptions)
        .then((response) => {
        
            if(response.status == 200){
              toast({
                title: `Movie added sucessfully.`,
                status: "success",
                isClosable: true,
              });
              navigate("/");
            }
            else{
              alert("Something went wrong while adding movie.")
            }
        })
        .catch((error) => {
          console.log(error);
          alert("Interal server error.");
        });

      
    }
  };

  const handleCancel = (event: any) => {
    navigate("/");
  };

  return (
    <div>
      <AdminNavBar></AdminNavBar>
      <Center m={[2, 5, 10]}>
        <Box
          p="6"
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          width={[200, 300, 500]}
          bg="white"
        >
          <Heading padding={[2, 4, 6]}>Add a movie</Heading>
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
            <FormLabel htmlFor="posterLink">Poster Link</FormLabel>
            <Input
              type="text"
              id="poster"
              name="poster"
              value={formValues.poster}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors?.get("poster")}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors?.get("thumbnail")}>
            <FormLabel htmlFor="thumbnail">Thumbnail Link</FormLabel>
            <Input
              type="text"
              id="thumbnail"
              name="thumbnail"
              value={formValues.thumbnail}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors?.get("thumbnail")}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors?.get("trailor")}>
            <FormLabel htmlFor="trailor">Trailor Link</FormLabel>
            <Input
              type="text"
              id="trailor"
              name="trailor"
              value={formValues.trailor}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors?.get("trailor")}</FormErrorMessage>
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

          <FormControl isInvalid={!!formErrors?.get("released_date")}>
            <FormLabel htmlFor="firstname">Released Date</FormLabel>
            <Input
              value={formValues.released_date}
              onChange={handleInputChange}
              id="released_date"
              name="released_date"
              type="date"
            ></Input>
            <FormErrorMessage>
              {formErrors?.get("released_date")}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors?.get("time_in_minutes")}>
            <FormLabel htmlFor="time_in_minutes">Time in minutes</FormLabel>
            <Input
              type="text"
              id="time_in_minutes"
              name="time_in_minutes"
              value={formValues.time_in_minutes}
              onChange={handleInputChange}
            />
            <FormErrorMessage>
              {formErrors?.get("time_in_minutes")}
            </FormErrorMessage>
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

          <FormControl isInvalid={!!formErrors?.get("images")}>
            <FormLabel htmlFor="images">Images</FormLabel>
            <Stack spacing="2">
              {image.map((item, index) => (
                <Box key={index} display="flex">
                  <Input
                    value={item}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`Image ${index + 1}`}
                    flex="1"
                    mr="2"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove Image
                  </Button>
                </Box>
              ))}
              <Button type="button" onClick={handleAddImage}>
                Add Image
              </Button>
            </Stack>
            <FormErrorMessage>{formErrors?.get("images")}</FormErrorMessage>
          </FormControl>

          <Flex mt="5" gap={5} justifyContent="left">
            <Button onClick={handleSubmit} colorScheme="green">
              {" "}
              Submit
            </Button>
            <Button onClick={handleCancel} colorScheme="red">
              {" "}
              Cancel
            </Button>
          </Flex>
        </Box>
      </Center>
    </div>
  );
}
