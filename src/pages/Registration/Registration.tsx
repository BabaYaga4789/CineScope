import {
  Alert,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SlideFade,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  AiFillLock,
  AiOutlineCalendar,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Data } from "./Data";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import Genres from "@/common/Genres";
import React from "react";
import CustomContainer from "@/components/CustomContainer";
import CustomInputField from "@/components/CustomInputField";

export default function Registration() {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    genres: [],
  } as Data);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([] as string[]);
  const [result, setResult] = React.useState<Option[]>([]);

  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  const validateAndRegister = (event: any) => {
    event.preventDefault();

    setError(false);
    setErrors([]);

    console.log(data);

    const { userName, email, password, confirmPassword } = data;

    // regex
    // generated using https://regex-generator.olafneumann.org/

    // reference: https://regexr.com/3e48o
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const nameRegex: RegExp = /^[A-Za-z]+/g;

    // reference: https://regexr.com/
    const passwordRegex: RegExp =
      /^([A-Za-z0-9!@#$%^&*(),.?":{}|<>\[\]]){8,}$/g;

    const errors: string[] = [];

    if (
      (userName.length === 0 || userName === "") &&
      !nameRegex.test(userName)
    ) {
      console.log(userName.length === 0);
      errors.push(
        "Invalid last name. It can't be empty and should contain only letters."
      );
    }

    if (email.length === 0 || !emailRegex.test(email)) {
      errors.push("Invalid email address.");
    }

    if (password.length === 0 || !passwordRegex.test(password)) {
      errors.push("Invalid password. It should be at least 8 characters.");
    }

    if (confirmPassword !== password) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      setError(true);
      setErrors(errors);
    } else {
      setError(false);
      setErrors([]);

      navigate("/profile", { state: data });
    }
  };

  const accent = "yellow.500";

  return (
    <Flex
      height="93vh"
      flexShrink={"0"}
      mx={4}
      justifyContent="center"
      alignItems="center"
    >
      <CustomContainer>
        <Center mb={6}>
          <VStack>
            <Heading>Register</Heading>
            <Text
              color="gray.500"
              fontSize="sm"
              width={"300px"}
              textAlign="center"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>
          </VStack>
        </Center>

        {/* First Name Input */}
        <CustomInputField
          icon={<AiOutlineUser color="gray.300" />}
          id="userName"
          type="name"
          placeholder="User Name"
          focusBorderColor={accent}
          mb={3}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {/* Email Input */}
        <CustomInputField
          icon={<AiOutlineMail color="gray.300" />}
          id="email"
          type="email"
          placeholder="Email"
          focusBorderColor={accent}
          mb={3}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {/* Password Input */}
        <CustomInputField
          icon={<AiOutlineLock color="gray.300" />}
          id="password"
          type="password"
          placeholder="Password"
          focusBorderColor={accent}
          mb={3}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {/* Confirm Password */}
        <CustomInputField
          icon={<AiFillLock color="gray.300" />}
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          focusBorderColor={accent}
          mb={3}
          onChange={(event: any) =>
            setData({ ...data, [event.target.id]: event.target.value })
          }
        />

        {/* Date of Birth */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineCalendar color="gray.300" />}
          />
          <Input
            id="dateOfBirth"
            type="text"
            variant="outline"
            placeholder="Date of Birth"
            focusBorderColor={accent}
            mb={3}
            onChange={(event) =>
              setData({ ...data, [event.target.id]: event.target.value })
            }
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </InputGroup>

        {/* Genres */}

        <Autocomplete
          as={Input}
          focusBorderColor={accent}
          id="genres"
          options={Genres}
          result={result}
          setResult={(options: Option[]) => setResult(options)}
          placeholder="Type a genre..."
          mb={12}
        ></Autocomplete>

        {errors.map((err) => (
          <SlideFade in={error} unmountOnExit={true}>
            <Alert status="error" mb={2} borderRadius="md" padding={4}>
              {err}
            </Alert>
          </SlideFade>
        ))}

        <Button colorScheme={"yellow"} mb={0} onClick={validateAndRegister}>
          Register
        </Button>
      </CustomContainer>
    </Flex>
  );
}
