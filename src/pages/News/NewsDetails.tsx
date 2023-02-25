import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Icon,
    Image,
    Link,
    LinkOverlay,
    Spacer,
    Stack,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";

const today = new Date();

export default function NewsDetails() {
    return (

        <><Flex
            pl="20px"
            pr={"20px"}
            display="flex"
            flexDirection={"column"}
        >

            <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={{ base: 'transparent', sm: 'bg-surface' }}
                boxShadow={{ base: 'none', sm: 'md' }}
                borderRadius={{ base: 'none', sm: 'xl' }}
                {...{ mt: "10px" }}
            >
                <Heading paddingBottom={"2"}>Lorem ipsum</Heading>
                <Image
                    objectFit={"cover"}
                    maxW={{ base: "100%", sm: "300px" }}
                    src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                    alt="image" />
                <Text py="2" paddingTop={"3"}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                    fuga, non dolorem commodi eum sapiente accusantium dolorum
                    error nulla excepturi. Maxime corrupti et quo, aspernatur
                    fugiat quisquam nostrum placeat nobis! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Vero fuga, non dolorem
                    commodi eum sapiente accusantium dolorum error nulla
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                    fuga, non dolorem commodi eum sapiente accusantium dolorum
                    error nulla excepturi. Maxime corrupti et quo, aspernatur
                    fugiat quisquam nostrum placeat nobis! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Vero fuga, non dolorem
                    commodi eum sapiente accusantium dolorum error nulla
                    excepturi. Maxime corrupti et quo, aspernatur fugiat quisquam
                    nostrum placeat nobis! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Vero fuga, non dolorem commodi eum sapiente
                    accusantium dolorum error nulla excepturi. Maxime corrupti et
                    quo, aspernatur fugiat quisquam nostrum placeat nobis!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                    fuga, non dolorem commodi eum sapiente accusantium dolorum
                    error nulla excepturi. Maxime corrupti et quo, aspernatur
                    fugiat quisquam nostrum placeat nobis! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Vero fuga, non dolorem
                    commodi eum sapiente accusantium dolorum error nulla
                    excepturi. Maxime corrupti et quo, aspernatur fugiat quisquam
                    nostrum placeat nobis! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Vero fuga, non dolorem commodi eum sapiente
                    accusantium dolorum error nulla excepturi. Maxime corrupti et
                    quo, aspernatur fugiat quisquam nostrum placeat nobis!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                    fuga, non dolorem commodi eum sapiente accusantium dolorum
                    error nulla excepturi. Maxime corrupti et quo, aspernatur
                    fugiat quisquam nostrum placeat nobis! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Vero fuga, non dolorem
                    commodi eum sapiente accusantium dolorum error nulla
                    excepturi. Maxime corrupti et quo, aspernatur fugiat quisquam
                    nostrum placeat nobis! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Vero fuga, non dolorem commodi eum sapiente
                    accusantium dolorum error nulla excepturi. Maxime corrupti et
                    quo, aspernatur fugiat quisquam nostrum placeat nobis!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                    fuga, non dolorem commodi eum sapiente accusantium dolorum
                    error nulla excepturi. Maxime corrupti et quo, aspernatur
                    fugiat quisquam nostrum placeat nobis! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Vero fuga, non dolorem
                    commodi eum sapiente accusantium dolorum error nulla
                    excepturi. Maxime corrupti et quo, aspernatur fugiat quisquam
                    nostrum placeat nobis! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Vero fuga, non dolorem commodi eum sapiente
                    accusantium dolorum error nulla excepturi. Maxime corrupti et
                    quo, aspernatur fugiat quisquam nostrum placeat nobis!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                    fuga, non dolorem commodi eum sapiente accusantium dolorum
                    error nulla excepturi. Maxime corrupti et quo, aspernatur
                    fugiat quisquam nostrum placeat nobis! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Vero fuga, non dolorem
                    commodi eum sapiente accusantium dolorum error nulla
                    excepturi. Maxime corrupti et quo, aspernatur fugiat quisquam
                    nostrum placeat nobis! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Vero fuga, non dolorem commodi eum sapiente
                    accusantium dolorum error nulla excepturi. Maxime corrupti et
                    quo, aspernatur fugiat quisquam nostrum placeat nobis!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                    fuga, non dolorem commodi eum sapiente accusantium dolorum
                    error nulla excepturi. Maxime corrupti et quo, aspernatur
                    fugiat quisquam nostrum placeat nobis! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Vero fuga, non dolorem
                    commodi eum sapiente accusantium dolorum error nulla
                    excepturi. Maxime corrupti et quo, aspernatur fugiat quisquam
                    nostrum placeat nobis! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Vero fuga, non dolorem commodi eum sapiente
                    accusantium dolorum error nulla excepturi. Maxime corrupti et
                    quo, aspernatur fugiat quisquam nostrum placeat nobis!
                </Text>
            </Box>
        </Flex>
        <Flex
            pt={"10"}
            paddingBottom={"10"}
            display="flex"
            flexDirection={"column"}
            alignItems="end"
        >
            <HStack>
            <Text>
                Share:
            </Text>
                <Icon as={FaFacebookSquare} boxSize={6}/>
                <Icon as={FaInstagram} boxSize={6}/>
                <Icon as={FaWhatsapp} boxSize={6}/>
            </HStack>

        </Flex></>

    );
}