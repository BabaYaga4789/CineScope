import React from 'react';
import { GridItem, Image, Box, Button } from '@chakra-ui/react'
import { StarIcon, AddIcon } from '@chakra-ui/icons';

export function BoxForMovie({movie}){
    return(
        <GridItem w='100%' h='100%' direction={["column", "row"]}>
            {/* Reference: https://chakra-ui.com/docs/components/box */}
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image boxSize='sm' src={movie.imageUrl} alt={movie.imageAlt} />
            <Box p='6'>
                <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
                >
                {movie.title}
                </Box>

                <Box display='flex' mt='2' alignItems='center'>
                {Array(10)
                    .fill('')
                    .map((_, i) => (
                    <StarIcon
                        key={i}
                        color={i < movie.rating ? 'teal.500' : 'gray.300'}
                    />
                    ))}
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                    {movie.reviewCount}reviews
                </Box>
                </Box>

                <Button mt='3' leftIcon={<AddIcon />} colorScheme="teal" variant="solid" px={20} h={8}>
                    Watchlist
                </Button>
                
            </Box>
            </Box>
        </GridItem>
    );
}