import Movie from '@/common/Movie'
import { AddIcon, CheckIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Image, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddMovieDialog from '@/components/AddMovieDialog';


interface MovieGridItemProps {
    movie: Movie
}

export default function MovieGridItem(props: MovieGridItemProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isAdded, setIsAdded] = useState(false);
    
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
                <Button w="full" leftIcon={ !isAdded ? <AddIcon /> : <CheckIcon/>} onClick={ !isAdded ? onOpen : ()=>{}}>
                {!isAdded ? "Watchlist" : "Added"}
                </Button>
                <AddMovieDialog isAdded={setIsAdded} isOpen={isOpen} onClose={onClose} movie={props.movie} />

            </VStack>
        </CardFooter>
    </Card>;
}