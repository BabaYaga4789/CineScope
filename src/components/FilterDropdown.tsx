import { Box, Button, HStack, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterDropdown = () => {
  const navigate = useNavigate();
  const [newKeyword, setNewKeyword] = useState("");
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  return (
    <Box
      px={4}
      w="100%"
      as="section"
      marginBottom={5}
      marginLeft={5}
      marginRight={5}
    >
      <HStack direction={["column", "row"]}>
        <Select
          placeholder="Ratings"
          id="ratings"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="option1">1-4</option>
          <option value="option2">5-7</option>
          <option value="option3">8-10</option>
          {/* <option value='option4'>8-10</option> */}
        </Select>
        <Select
          placeholder="Genre"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Fiction">Fiction</option>
          <option value="Fantacy">Fantacy</option>
          <option value="Mystery">Mystery</option>
          <option value="Comedy">Comedy</option>
          <option value="Thriller">Thriller</option>
          <option value="Science Fiction">Science Fiction</option>
        </Select>
        <Select
          placeholder="Year"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="option1">2021-2023</option>
          <option value="option2">2011-2020</option>
          <option value="option3">2000-2010</option>
          {/* <option value='option4'>2006-2010</option>
                    <option value='option5'>2001-2005</option> */}
        </Select>
        <Button
          size="lg"
          colorScheme={"yellow"}
          onClick={() =>
            navigate("/filter", {
              state: { genre: genre, rating: rating, year: year },
            })
          }
        >
          Filter
        </Button>
      </HStack>
    </Box>
  );
};
export default FilterDropdown;
