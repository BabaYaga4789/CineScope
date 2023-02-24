import Movie from '@/common/Movie';
import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';

type AddMovieDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
  isAdded: (status: boolean) => void;
};

const AddMovieDialog: React.FC<AddMovieDialogProps> = ({
  isOpen,
  onClose,
  movie,
  isAdded
}) => {
  const [status, setStatus] = useState<string>('');
  const toast = useToast();

  const handleAddMovie = () => {
    console.log(status)
    if (status.length === 0) {
      toast({
        title: 'Status Required',
        description: 'Please Select any status',
        duration: 1000,
        isClosable: true,
        status: 'error',
        position: 'top'
      })
    }
    else {
      isAdded(true);
      onClose();
      toast({
        title: 'Movie Added',
        description: 'Successfully added to watchlist',
        duration: 1000,
        isClosable: true,
        status: 'success',
        position: 'top',
        icon: <AddIcon />
      })
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalHeader fontWeight={'bold'} fontSize='3xl' color="orange"><AddIcon boxSize={'5'}></AddIcon> Add Movie to Watchlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody marginLeft={6}>
          <FormControl>
            <FormLabel fontWeight={'extrabold'} color="orange.400" fontSize='xl'>{movie.title}</FormLabel>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Status</FormLabel>
            <Select placeholder="Select status" onChange={(e) => setStatus(e.target.value)}>
              <option value="watching">Watching</option>
              <option value="to-watch">Plan To Watch</option>
              <option value="watched">Watched</option>
              <option value="dropped">Dropped</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" mr={3} onClick={handleAddMovie}>
            Add Movie
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMovieDialog;