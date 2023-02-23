import { Center, Flex, Heading } from "@chakra-ui/react";
import CustomContainer from "../../components/CustomContainer";

export default function Home() {
  return (
    <Center h={"93vh"}>
      {" "}
      <CustomContainer maxW="500">
        <Center mb={6}>
          <Heading>Home</Heading>
        </Center>
      </CustomContainer>
    </Center>
  );
}

