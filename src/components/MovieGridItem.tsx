import { Box, Grid, Image, Card, CardHeader, Flex, CardBody, Text, CardFooter, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import Movie from '@/common/Movie'

interface MovieGridItemProps{
    movie : Movie
}

export default function MovieGridItem(props : MovieGridItemProps): JSX.Element {
    return <Card key={props.movie.id} rounded="lg" width="100%" overflow="hidden" alignItems="center">
        <CardHeader>
            <Flex>
                <Image src={props.movie.poster} alt={props.movie.title} objectFit="cover" height="300px" width="200px" />
            </Flex>
        </CardHeader>
        <CardBody color="gray.500">
            <Text>{props.movie.title}</Text>
        </CardBody>
        <CardFooter>
            <VStack>
                <Button w="full" leftIcon={<ViewIcon />}>
                    View
                </Button>
                <Button w="full" leftIcon={<AddIcon />}>
                    Watchlist
                </Button>
            </VStack>
        </CardFooter>
    </Card>;
}