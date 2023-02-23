import React from 'react'
import { useToast , Button, Text, Box, Heading, List, ListItem, Image, Flex, HStack, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react'
import { useRef } from 'react';

export default function ListOfNewMovies() {

    const [newMovies, setNewMovies] = useState([{   
        id : 5, 
        title : "The Shawshank Redemption new", 
        year :  1994 
    },
    {   
        id : 6, 
        title : "The Godfather new", 
        year : 1972 
    },

    { 
        id : 7, 
        title : "The Godfather: Part II new", 
        year : 1974 
    },
    { 
        id : 8, 
        title : "The Dark Knight new", 
        year : 2008 
    },]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteId, setDeleteID] = useState<any>();
    const [deleteMovieTitle, setDeleteMovieTitle] = useState<string>('');
    const toast = useToast()
    const cancelRef = useRef<HTMLButtonElement>(null);
    const onDeleteIcon = async (id: any, title: string) => {
        setIsOpen(true)
        setDeleteID(id)
        setDeleteMovieTitle(title)
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
                    {newMovies.map((newMovies) => (
                    
                    <ListItem key={newMovies.id} boxSize={['50px','150px','175px']}>
                        
                        <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sH5hQyuW35uubo7EyW7U_XwoGu2WkJDk7g&usqp=CAU' alt='Film' />
                        <Text fontWeight="bold" fontSize="20px">{newMovies.title}</Text>
                        <HStack alignItems="center">
                            
                            <Text color="gray.500" fontSize="20px">({newMovies.year})</Text>
                            <Spacer></Spacer>
                            <EditIcon boxSize={[1,3,5]} color="green.500"></EditIcon>
                            <DeleteIcon boxSize={[1,3,5]} onClick={() => {onDeleteIcon(newMovies.id, newMovies.title)}}  color="red.500"></DeleteIcon>
                       
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
