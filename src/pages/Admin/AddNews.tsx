import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Box, Center, Heading, Flex, Select, Stack, useToast, Textarea
} from "@chakra-ui/react";
import { AdminNavBar } from '../../components/AdminNavBar';
export default function AddMovie() {


    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState<Map<string, string>>();
    const years = [];
    const [movie, setMovie] = useState<string[]>([]);
    const [genre, setGenre] = useState<string[]>([]);
    const toast = useToast();

    const [formValues, setFormValues] = useState({
        title: "",
        poster: "",
        year: "2023",
        date: "",
        news: ""
    });


    for (let i = 2023; i >= 1970; i--) {
        years.push(i);
    }

    const checkCastNames = () => {
        for (let i = 0; i < movie.length; i++) {
            let name = movie[i];
            if (!/^[A-Za-z ]+$/.test(name)) {
                return true;
            }
        }
        return false;
    }

    const checkGenreNames = () => {
        for (let i = 0; i < genre.length; i++) {
            let name = genre[i];
            if (!/^[A-Za-z ]+$/.test(name)) {
                return true;
            }
        }
        return false;
    }

    const handleAddCast = () => {
        setMovie([...movie, ""]);
    };

    const handleRemoveCast = (index: number) => {
        setMovie(movie.filter((_, i) => i !== index));
    };

    const handleCastChange = (index: number, value: string) => {
        const newItems = [...movie];
        newItems[index] = value;
        setMovie(newItems);
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

        if (!formValues.news) {
            errors.set("news", "Descirption of the news is required");
        } else if (formValues.news.split(' ').length >= 250) {
            errors.set("news", "Details must be less than 250 letters.");
        }

        if (!formValues.date) {
            errors.set("date", "Date is required");
        } else if (!/^\d{2}-\d{2}-\d{4}$/.test(formValues.date)) {
            errors.set("date", "Date must be in DD-MM-YYYY Format.");
        }
        if (movie.length == 0) {
            errors.set("movie", "Movie name is required");
        } else if (checkCastNames()) {
            errors.set("movie", "Movie names must be in letters.");
        }
        if (genre.length == 0) {
            errors.set("genre", "Genre is required");
        } else if (checkGenreNames()) {
            errors.set("genre", "Genre names must be in letters.");
        }
        if (formValues.year == "") {
            errors.set("year", "Year is required");
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


    const handleSubmit = (event: any) => {
        // event.preventDefault();
        if (validateForm()) {
            toast({
                title: `Movie added sucessfully.`,
                status: 'success',
                isClosable: true,
            })
            navigate('/')
        }

    };

    const handleCancel = (event: any) => {
        navigate('/')
    };


    return (
        <div>
            <AdminNavBar></AdminNavBar>
            <Center m={[2, 5, 10]}>

                <Box p="6" shadow="md" borderWidth="1px" borderRadius="md" width={[200, 300, 500]} bg="white" >
                    <Heading padding={[2, 4, 6]}>Add new news</Heading>
                    <FormControl isInvalid={!!formErrors?.get("title")}>
                        <FormLabel htmlFor="title">News Title</FormLabel>
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

                    <FormControl isInvalid={!!formErrors?.get("news")}>
                        <FormLabel htmlFor="firstname">Full article (Description)</FormLabel>
                        <Textarea
                            placeholder='Enter the details here'
                            id="news"
                            name="news"
                            value={formValues.news}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors?.get("news")}</FormErrorMessage>
                        <small>Must be less than 250 words.</small>
                    </FormControl>

                    <FormControl isInvalid={!!formErrors?.get("date")}>
                        <FormLabel htmlFor="date">Date</FormLabel>
                        <Input
                            type="text"
                            id="news_date"
                            name="date"
                            value={formValues.date}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors?.get("date")}</FormErrorMessage>
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

                    <FormControl isInvalid={!!formErrors?.get("movie")}>
                        <FormLabel htmlFor="movie">Movie Name</FormLabel>
                        <Stack spacing="2">
                            {movie.map((item, index) => (
                                <Box key={index} display="flex">
                                    <Input
                                        value={item}
                                        onChange={(e) => handleCastChange(index, e.target.value)}
                                        placeholder={`movie ${index + 1}`}
                                        flex="1"
                                        mr="2"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleRemoveCast(index)}
                                    >
                                        Remove Movie
                                    </Button>
                                </Box>
                            ))}
                            <Button type="button" onClick={handleAddCast}>
                                Add movie
                            </Button>
                        </Stack>
                        <FormErrorMessage>{formErrors?.get("movie")}</FormErrorMessage>
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
