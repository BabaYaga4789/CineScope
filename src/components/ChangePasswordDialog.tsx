import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { VStack } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import React, { useRef, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import CustomInputField from "./CustomInputField";

interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordDialog = (props: ChangePasswordDialogProps) => {
  const [data, setData] = useState({ password: "" } as any);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const accent = "yellow.500";

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Change Password
          </AlertDialogHeader>
          <AlertDialogBody>Change your password here.</AlertDialogBody>
          <VStack p={6}>
            {" "}
            <CustomInputField
              icon={<AiOutlineLock color="gray.300" />}
              id="password"
              type="password"
              placeholder="Current Password"
              focusBorderColor={accent}
              mb={3}
              onChange={(event: any) =>
                setData({ ...data, [event.target.id]: event.target.value })
              }
            />
            <CustomInputField
              icon={<AiOutlineLock color="gray.300" />}
              id="password"
              type="password"
              placeholder="New Password"
              focusBorderColor={accent}
              mb={3}
              onChange={(event: any) =>
                setData({ ...data, [event.target.id]: event.target.value })
              }
            />
            <CustomInputField
              icon={<AiOutlineLock color="gray.300" />}
              id="password"
              type="password"
              placeholder="Confirm Password"
              focusBorderColor={accent}
              mb={3}
              onChange={(event: any) =>
                setData({ ...data, [event.target.id]: event.target.value })
              }
            />
          </VStack>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="yellow" onClick={props.onClose} ml={3}>
              Update Password
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ChangePasswordDialog;
