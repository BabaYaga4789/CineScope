import React from 'react'
import { useToast , Button, Text, Box, Heading, List, ListItem, Image, Flex, HStack, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react'
import { useRef } from 'react';
import newMoviesList from '../common/new-movies';
import { useNavigate } from 'react-router-dom';
export default function ListOfNewMovies() {

    const [newMovies, setNewMovies] = useState(newMoviesList);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteId, setDeleteID] = useState<any>();
    const [deleteMovieTitle, setDeleteMovieTitle] = useState<string>('');
    const toast = useToast()
    const cancelRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const onDeleteIcon = async (id: any, title: string) => {
        setIsOpen(true)
        setDeleteID(id)
        setDeleteMovieTitle(title)
    }

    const onEditIcon = async (id: number) => {
        navigate(`/update-movie-details/${id}`)
    }

    const onClickDelete = async(id: any) => {
        
        setIsOpen(false)

          
        for (let i = 0; i < newMovies.length; i++) {
            let movie_id = newMovies[i].id;
            if(movie_id == id.deleteId){
                newMovies.splice(i,1);
                setNewMovies(newMovies)
                toast({
                    title: `Movie deleted sucessfully.`,
                    status: 'success',
                    isClosable: true,
                  })
            }
        
        }

    }
  return (
    <div>
       <Box >
            
            <Heading as="h2" size={['sm','md','lg']} textColor="black" p="10px">
                New Movies
            </Heading>

            <List styleType="none" pt="20px" spacing='5px' flexDirection={["column","row"]} ml={5} mr={5}>
                <Flex justifyContent="space-around" wrap="wrap">
                    {newMovies.map((newMovie) => (
                    
                    <ListItem key={newMovie.id} boxSize={['50px','150px','175px']}>
                        
                        <Image src={newMovie.poster} alt='Film' boxSize='200px'/>
                        <Text fontWeight="bold" fontSize="20px">{newMovie.title}</Text>
                        <HStack alignItems="center">
                            
                            <Text color="gray.500" fontSize="20px">({newMovie.year})</Text>
                            <Spacer></Spacer>
                            <EditIcon boxSize={[1,3,5]}  onClick={() => {onEditIcon(newMovie.id)}} color="green.500"></EditIcon>
                            <DeleteIcon boxSize={[1,3,5]} onClick={() => {onDeleteIcon(newMovie.id, newMovie.title)}}  color="red.500"></DeleteIcon>
                       
                        </HStack>
                     </ListItem>
                ))}
                </Flex>
            </List>
            
        </Box>


        <AlertDialog
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    leastDestructiveRef={cancelRef} 
                    >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Movie
                        </AlertDialogHeader>
            
                        <AlertDialogBody>
                            Do you really want to delete movie <b>{deleteMovieTitle}</b>? You can't undo this action afterwards.
                        </AlertDialogBody>
            
                        <AlertDialogFooter>
                            <Button onClick={() => setIsOpen(false)}>
                            Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => onClickDelete({deleteId})} ml={3}>
                            Delete
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                    </AlertDialog>
    </div>
  )
}
