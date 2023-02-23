import { Select, HStack, Box, Button, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React , {useState } from 'react';

const FilterDropdown = () =>{
    const navigate = useNavigate();
    const [newKeyword, setNewKeyword] = useState("");
    const [rating, setRating] = useState(null);
    const [genre, setGenre] = useState(null);
    const [year, setYear] = useState(null);

    return(
        <Box as="section" marginBottom={5} marginLeft={5} marginRight={5}>
            <HStack direction={['column', 'row']}>
                <Select placeholder='Ratings'  id="ratings" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value='option1'>1-3</option>
                    <option value='option2'>3-6</option>
                    <option value='option3'>6-8</option>
                    <option value='option4'>8-10</option>
                </Select>
                <Select placeholder='Genre' id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value='Action'>Action</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Fiction'>Fiction</option>
                    <option value='Fantacy'>Fantacy</option>
                    <option value='Mystery'>Mystery</option>
                    <option value='Comedy'>Comedy</option>
                    <option value='Thriller'>Thriller</option>
                    <option value='Science Fiction'>Science Fiction</option>
                </Select>
                <Select placeholder='Year' id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value='option1'>2020-2023</option>
                    <option value='option2'>2015-2020</option>
                    <option value='option3'>2010-2015</option>
                    <option value='option4'>2005-2010</option>
                    <option value='option5'>2000-2005</option>
                </Select>
                <Button size='lg' border='2px' borderColor='teal.500' onClick={() => navigate('/filter', { state : {genre : genre, rating : rating, year : year} }) }>
                    Filter
                </Button>
            </HStack>
        </Box>
    );
}
export default FilterDropdown;