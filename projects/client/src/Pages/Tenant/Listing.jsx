import React from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from "@chakra-ui/react";
import { BiHotel, BiHomeAlt } from "react-icons/bi";
import { MdApartment } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi2";

function Listing() {
    return (
        <Container
            h={"100vh"}
            w={"100%"}
            maxW={"1300px"}
            display={"flex"}
            flexDir="column"
        >
            <Box textAlign="left" fontSize={"5xl"} fontWeight="bold" mt="10">
                <h1>Add Listing</h1>
            </Box>
            <Box mt={"5"}>
                <Box textAlign="left" fontSize={"3xl"} fontWeight="semibold">
                    <h2>Basic Information</h2>
                </Box>
                <Box as={Flex} py="10">
                    <Box flex={1} fontWeight="medium">
                        Which category fits your place?
                    </Box>
                    <Box flex={3} display="flex" flexDir={"column"}>
                        <Box display={"flex"} flexDir={"row"}>
                            <Button
                                justifyContent={"center"}
                                display={"flex"}
                                flexDir="column"
                                size="md"
                                w={"120px"}
                                h={"120px"}
                                textAlign="center"
                                mx={"4"}
                                variant="outline"
                            >
                                <Text textAlign={"center"}>
                                    <BiHotel fontSize={"45px"} />
                                    Hotel
                                </Text>
                            </Button>
                            <Button
                                justifyContent={"center"}
                                display={"flex"}
                                flexDir="column"
                                size="md"
                                w={"120px"}
                                h={"120px"}
                                textAlign="center"
                                mx={"4"}
                                variant="outline"
                            >
                                <BiHomeAlt fontSize={"45px"} />
                                <Text textAlign={"center"}>Villa</Text>
                            </Button>
                            <Button
                                justifyContent={"center"}
                                display={"flex"}
                                flexDir="column"
                                size="md"
                                w={"120px"}
                                h={"120px"}
                                textAlign="center"
                                mx={"4"}
                                variant="outline"
                            >
                                <MdApartment fontSize={"45px"} />
                                <Text textAlign={"center"}>Apartment</Text>
                            </Button>
                        </Box>
                        <Box mx="4" my="2">
                            <Text mb="2" fontWeight={"medium"}>Or you can add your own category</Text>
                            <InputGroup display={"flex"} size={"md"} w="55%">
                                <Input
                                    placeholder="Your category"
                                    type="text"
                                    justifyItems={"self-end"}
                                    h={"40px"}
                                />

                                <InputRightElement alignSelf={"end"}>
                                    <Button h={"30px"} mr="3">
                                        <Text fontSize={"lg"}>
                                            <HiOutlinePlus />
                                        </Text>
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                    </Box>
                </Box>
                <Box as={Flex} border="1px" my={"2"}>
                    <Box flex={1} borderRight="1px">
                        Let's give your place a name
                    </Box>
                    <Box flex={3}>Fields</Box>
                </Box>
                <Box as={Flex} border="1px" my={"2"}>
                    <Box flex={1} borderRight="1px">
                        Upload Photos of your place
                    </Box>
                    <Box flex={3}>Fields</Box>
                </Box>
                <Box as={Flex} border="1px" my={"2"}>
                    <Box flex={1} borderRight="1px">
                        Tell us a story about your place
                    </Box>
                    <Box flex={3}>Fields</Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Listing;
