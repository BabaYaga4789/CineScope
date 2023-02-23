import {
  Alert,
  Button,
  Center, Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SlideFade,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillLock, AiOutlineCalendar, AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Data } from "./Data";

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
      <Flex
        flexDirection="column"
        p={isDesktop ? 12 : 6}
        borderRadius={8}
        boxShadow="xl"
        maxW="500"
      >
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
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineUser color="gray.300" />}
          />
          <Input
            id="userName"
            type="name"
            variant="outline"
            placeholder="User Name"
            focusBorderColor={accent}
            mb={3}
            onChange={(event) =>
              setData({ ...data, [event.target.id]: event.target.value })
            }
          />
        </InputGroup>

        {/* Email Input */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineMail color="gray.300" />}
          />
          <Input
            id="email"
            type="email"
            variant="outline"
            placeholder="johndoe@dal.ca"
            focusBorderColor={accent}
            mb={3}
            onChange={(event) =>
              setData({ ...data, [event.target.id]: event.target.value })
            }
          />
        </InputGroup>

        {/* Password Input */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiFillLock color="gray.300" />}
          />
          <Input
            id="password"
            type="password"
            variant="outline"
            placeholder="Password"
            focusBorderColor={accent}
            mb={3}
            onChange={(event) =>
              setData({ ...data, [event.target.id]: event.target.value })
            }
          />
        </InputGroup>

        {/* Confirm Password */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineLock color="gray.300" />}
          />
          <Input
            id="confirmPassword"
            type="password"
            variant="outline"
            placeholder="Confirm Password"
            focusBorderColor={accent}
            mb={3}
            onChange={(event) =>
              setData({ ...data, [event.target.id]: event.target.value })
            }
          />
        </InputGroup>

        {/* Date of Birth */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineCalendar color="gray.300" />}
          />
          <Input
            id="dateOfBirth"
            type="date"
            variant="outline"
            placeholder="Date of Birth"
            focusBorderColor={accent}
            mb={6}
            onChange={(event) =>
              setData({ ...data, [event.target.id]: event.target.value })
            }
          />
        </InputGroup>

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
      </Flex>
    </Flex>
  );
}
