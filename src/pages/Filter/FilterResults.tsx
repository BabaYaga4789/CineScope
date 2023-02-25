import { SimpleGrid, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { MovieDetails } from "../MovieData";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";
import { AlertForNoMovieFound } from "@/components/AlertForNoMovieFound";
import { useEffect, useState } from "react";
import MovieGridItem from "@/components/MovieGridItem";

export const FilterResults = () => {
  const { state } = useLocation();
  if (state == null) {
    const movies = MovieDetails.map((movie) => (
      <MovieGridItem key={movie.id} movie={movie} />
    ));

    return (
      <VStack w="100%">
        <SearchBar />
        <FilterDropdown />
        {/* Reference: https://chakra-ui.com/docs/components/simple-grid */}
        <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
          {movies}
        </SimpleGrid>
      </VStack>
    );
  } else {
    const option = state.option;
    console.log(option);

    if (option == "search") {
      const keyword = state.keyword;
      const filteredMovies = MovieDetails.filter((movie) => {
        return movie.title.toLowerCase().includes(keyword.toLowerCase());
      });
      const filtered = filteredMovies.map((movie) => (
        <MovieGridItem key={movie.id} movie={movie} />
      ));
      if (filtered.length == 0) {
        return (
          <VStack w="100%">
            {<SearchBar />}
            {<FilterDropdown />}
            {<AlertForNoMovieFound />}
          </VStack>
        );
      } else {
        return (
          <VStack w="100%">
            {<SearchBar />}
            {<FilterDropdown />}
            <SimpleGrid p={4} w="100%" columns={{ base: 1, md: 3, lg: 7 }} gap={6}>
              {filtered}
            </SimpleGrid>
          </VStack>
        );
      }
    } else if (option == "filter") {
      let genre = state.genre;
      let year = state.year;
      let rating = state.rating;
      if (genre == "") {
        genre = null;
      }
      if (year == "") {
        year = null;
      }
      if (rating == "") {
        rating = null;
      }
      console.log(genre);
      console.log(year);
      console.log(rating);
      const [afterFilteration, setAfterFilteration] = useState(MovieDetails);

      //Reference: https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58#:~:text=Firstly%2C%20we%20import%20useState%20from,list%20received%20from%20the%20parent
      function movieFilter() {
        if (genre != null) {
          if (rating != null) {
            if (year != null) {
              // rating + genre + year
              if (year == "option1") {
                if (rating == "option1") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                      movie.rating > 1 &&
                      movie.rating < 5 &&
                      movie.year >= 2000 &&
                      movie.year < 2011
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option2") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                      movie.rating >= 5 &&
                      movie.rating < 8 &&
                      movie.year >= 2000 &&
                      movie.year < 2011
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option3") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                      movie.rating >= 8 &&
                      movie.rating <= 10 &&
                      movie.year >= 2000 &&
                      movie.year < 2011
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
              }
              if (year == "option2") {
                if (rating == "option1") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                      movie.rating > 1 &&
                      movie.rating < 5 &&
                      movie.year >= 2011 &&
                      movie.year < 2021
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option2") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                      movie.rating >= 5 &&
                      movie.rating < 8 &&
                      movie.year >= 2011 &&
                      movie.year < 2021
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option3") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                      movie.rating >= 8 &&
                      movie.rating <= 10 &&
                      movie.year >= 2011 &&
                      movie.year < 2021
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
              }
              if (year == "option3") {
                if (rating == "option1") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                      movie.rating > 1 &&
                      movie.rating < 5 &&
                      movie.year >= 2021 &&
                      movie.year < 2024
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option2") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                      movie.rating >= 5 &&
                      movie.rating < 8 &&
                      movie.year >= 2021 &&
                      movie.year < 2024
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option3") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                      movie.rating >= 8 &&
                      movie.rating <= 10 &&
                      movie.year >= 2021 &&
                      movie.year < 2024
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
              }
            } else {
              // rating + genre
              if (rating == "option1") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return (
                    movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                    movie.rating > 1 &&
                    movie.rating < 5
                  );
                });
                setAfterFilteration(filteredMovies);
              }
              if (rating == "option2") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return (
                    movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                    movie.rating >= 5 &&
                    movie.rating < 8
                  );
                });
                setAfterFilteration(filteredMovies);
              }
              if (rating == "option3") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return (
                    movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                    movie.rating >= 8 &&
                    movie.rating <= 10
                  );
                });
                setAfterFilteration(filteredMovies);
              }
            }
          } else {
            if (year != null) {
              // genre + year
              if (year == "option1") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return (
                    movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                    movie.year >= 2000 &&
                    movie.year < 2011
                  );
                });
                setAfterFilteration(filteredMovies);
              }
              if (year == "option2") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return (
                    movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                    movie.year >= 2011 &&
                    movie.year < 2021
                  );
                });
                setAfterFilteration(filteredMovies);
              }
              if (year == "option3") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return (
                    movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
                    movie.year >= 2021 &&
                    movie.year < 2024
                  );
                });
                setAfterFilteration(filteredMovies);
              }
            } else {
              // genre
              const filteredMovies = MovieDetails.filter((movie) => {
                return movie.genre.toLowerCase().includes(genre.toLowerCase());
              });
              setAfterFilteration(filteredMovies);
            }
          }
        } else {
          if (rating != null) {
            if (year != null) {
              // rating + year
              if (year == "option1") {
                if (rating == "option1") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.rating > 1 &&
                      movie.rating < 5 &&
                      movie.year >= 2000 &&
                      movie.year < 2011
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option2") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.rating >= 5 &&
                      movie.rating < 8 &&
                      movie.year >= 2000 &&
                      movie.year < 2011
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option3") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.rating >= 8 &&
                      movie.rating <= 10 &&
                      movie.year >= 2000 &&
                      movie.year < 2011
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
              }
              if (year == "option2") {
                if (rating == "option1") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.rating > 1 &&
                      movie.rating < 5 &&
                      movie.year >= 2011 &&
                      movie.year < 2021
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option2") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.rating >= 5 &&
                      movie.rating < 8 &&
                      movie.year >= 2011 &&
                      movie.year < 2021
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option3") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.rating >= 8 &&
                      movie.rating <= 10 &&
                      movie.year >= 2011 &&
                      movie.year < 2021
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
              }
              if (year == "option3") {
                if (rating == "option1") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.rating > 1 &&
                      movie.rating < 5 &&
                      movie.year >= 2021 &&
                      movie.year < 2024
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option2") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.rating >= 5 &&
                      movie.rating < 8 &&
                      movie.year >= 2021 &&
                      movie.year < 2024
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
                if (rating == "option3") {
                  const filteredMovies = MovieDetails.filter((movie) => {
                    return (
                      movie.rating >= 8 &&
                      movie.rating <= 10 &&
                      movie.year >= 2021 &&
                      movie.year < 2024
                    );
                  });
                  setAfterFilteration(filteredMovies);
                }
              }
            } else {
              // rating
              if (rating == "option1") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return movie.rating >= 1 && movie.rating < 5;
                });
                setAfterFilteration(filteredMovies);
              }
              if (rating == "option2") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return movie.rating >= 5 && movie.rating < 8;
                });
                setAfterFilteration(filteredMovies);
              }
              if (rating == "option3") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return movie.rating >= 8 && movie.rating <= 10;
                });
                setAfterFilteration(filteredMovies);
              }
            }
          } else {
            if (year != null) {
              // year
              if (year == "option1") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return movie.year >= 2021 && movie.year < 2024;
                });
                setAfterFilteration(filteredMovies);
              }
              if (year == "option2") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return movie.year >= 2011 && movie.year < 2021;
                });
                setAfterFilteration(filteredMovies);
              }
              if (year == "option3") {
                const filteredMovies = MovieDetails.filter((movie) => {
                  return movie.year >= 2000 && movie.year < 2011;
                });
                setAfterFilteration(filteredMovies);
              }
            } else {
              // none
              const filteredMovies = MovieDetails.filter((movie) => {
                return movie.genre
                  .toLowerCase()
                  .includes("qwertyuiopasdfghjklzxcvbnm");
              });
              setAfterFilteration(filteredMovies);
            }
          }
        }
      }
      useEffect(() => {
        movieFilter();
      }, []);

      const filtered = afterFilteration.map((movie) => (
        <MovieGridItem key={movie.id} movie={movie} />
      ));
      if (filtered.length == 0) {
        return (
          <VStack w="100%">
            {<SearchBar />}
            {<FilterDropdown />}
            {<AlertForNoMovieFound />}
          </VStack>
        );
      } else {
        return (
          <VStack w="100%">
            {<SearchBar />}
            {<FilterDropdown />}
            <SimpleGrid
              p={4}
              w="100%"
              columns={{ base: 1, md: 3, lg: 7 }}
              gap={6}
            >
              {filtered}
            </SimpleGrid>
          </VStack>
        );
      }
    } else {
      return <></>;
    }
  }
};
