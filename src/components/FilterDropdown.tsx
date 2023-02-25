import { Box, Button, HStack, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterDropdown = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  return (
    <Box
      px={4}
      w="70%"
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
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
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
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
        </Select>
        <Button
          size="lg"
          colorScheme={"yellow"}
          onClick={() =>
            navigate("/search", {
              state: { genre: genre, rating: rating, year: year, option: "filter" },
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
