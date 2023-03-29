import { SessionManager } from "@/common/SessionManager";
import UserManagementService from "@/services/UserManagementService";
import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DeleteProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteProfileDialog = (props: DeleteProfileDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const deleteProfile = async () => {
    const userManagementService = new UserManagementService();
    const sessionManager = new SessionManager();
    const userID = sessionManager.getUserID();
    await userManagementService.deleteUser(userID!!);
  };

  const onDelete = () => {
    deleteProfile();

    toast({
      title: "Profile Deleted",
      description: "Your profile has been deleted.",
      status: "success",
      duration: 5000,
    });

    navigate("/");

    props.onClose();
  };

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Profile
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete your profile?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteProfileDialog;
