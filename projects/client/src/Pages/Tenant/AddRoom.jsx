import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../helper";
import {
    Box,
    Button,
    Container,
    Flex,
    Input,
    InputGroup,
    Text,
    Textarea,
    FormControl,
    FormLabel,
    Image,
    useToast,
} from "@chakra-ui/react";
import { Select, useChakraSelectProps } from "chakra-react-select";
import { BiHotel, BiHomeAlt } from "react-icons/bi";
import { MdApartment } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";
function AddRoom(props) {
    return (
        <Container
            my={"4"}
            h={"100vh"}
            w={"100%"}
            maxW={"1300px"}
            display={"flex"}
            flexDir="column"
        >
            <Box
                border={"none"}
                shadow={"2xl"}
                rounded={"3xl"}
                px={"8"}
                mb={"10"}
            >
                <Box
                    textAlign="left"
                    fontSize={"5xl"}
                    fontWeight="bold"
                    mt="10"
                >
                    <h1>Add a Room</h1>
                </Box>
                <Box mt={"10"}>
                    <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                        <h2>Basic Information</h2>
                    </Box>
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>What's The Name Of Your Room ?</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box mx="4" my="2">
                                <InputGroup display={"flex"} size={"md"}>
                                    <Input
                                        isRequired
                                        placeholder="Enter the name of your room"
                                        type="text"
                                        justifyItems={"self-end"}
                                        h={"40px"}
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Upload Photos Of Your Room</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box
                                display={"flex"}
                                flexDir={"column"}
                                placeItems={"center"}
                            >
                                <Box
                                    border={"2px"}
                                    borderStyle={"dashed"}
                                    borderColor={"gray.200"}
                                    borderRadius={"lg"}
                                    p={"4"}
                                >
                                    <Button
                                        type="button"
                                        justifyContent={"center"}
                                        display={"flex"}
                                        flexDir="column"
                                        size="md"
                                        w={"800px"}
                                        h={"100px"}
                                        textAlign="center"
                                        my={"4"}
                                        mx={"4"}
                                        variant="outline"
                                        alignItems={"center"}
                                    >
                                        <SlPicture
                                            fontSize={"35px"}
                                            color="#D3212D"
                                        />
                                        <input
                                            type="file"
                                            id="file"
                                            // ref={inputFile}
                                            style={{ display: "none" }}
                                            multiple
                                            // onChange={onChangeFile}
                                        />
                                        <Text textAlign={"center"}>
                                            Upload picture/s
                                        </Text>
                                    </Button>
                                    <Flex
                                        justify={"space-between"}
                                        w="96%"
                                        mx={"4"}
                                        mb={"4"}
                                    >
                                        {/* {fileProperty ? (
                                            <>
                                                <Text alignSelf={"center"}>
                                                    Your file/files:
                                                </Text>
                                                <Box
                                                    display={"flex"}
                                                    justifyContent={"left"}
                                                >
                                                    {fileProperty ? (
                                                        Array.from(
                                                            fileProperty
                                                        ).map((file, index) => (
                                                            <Image
                                                                key={index}
                                                                src={URL.createObjectURL(
                                                                    file
                                                                )}
                                                                style={{
                                                                    maxWidth:
                                                                        "75px",
                                                                    maxHeight:
                                                                        "75px",
                                                                    margin: "3px",
                                                                    aspectRatio:
                                                                        "3/2",
                                                                    objectFit:
                                                                        "contain",
                                                                }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <Text>
                                                            Choose a file to
                                                            upload
                                                        </Text>
                                                    )}
                                                </Box>
                                                <Button
                                                    type="button"
                                                    display={"flex"}
                                                    flexDir="column"
                                                    h={"35px"}
                                                    w={"35px"}
                                                    variant="outline"
                                                    alignItems={"center"}
                                                    onClick={() =>
                                                        setFileProperty(null)
                                                    }
                                                >
                                                    <Text fontSize={"xl"}>
                                                        <HiTrash
                                                            fontWeight={
                                                                "extrabold"
                                                            }
                                                            color="#D3212D"
                                                        />
                                                    </Text>
                                                </Button>
                                            </>
                                        ) : null} */}
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Describe The Room</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box mx="4" my="2">
                                <Textarea
                                    isRequired
                                    placeholder="Describe your room"
                                    size={"md"}
                                    resize={"none"}
                                    h={"250px"}
                                    maxLength={250}
                                />
                                <Text textAlign={"right"} color={"gray.200"}>
                                    {/* {descriptionLength}/250 */}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                    <h2>Room Details</h2>
                </Box>
                <Box as={Flex} my="10">
                    <Flex flex={1} fontWeight="medium" alignItems={"center"}>
                        Where is your place located?
                    </Flex>
                    <Box flex={3} display="flex" flexDir={"column"}>
                        <Box display={"flex"} flexDir={"row"}>
                            <FormControl mx={"4"}>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    isRequired
                                    type="text"
                                    placeholder="Enter street name, number and city"
                                    mb={"2"}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    mb="10"
                    justifyContent={"center"}
                    w={"full"}
                    py={"2"}
                >
                    <Button type="button" w={"300px"} mr={"4"} rounded={"3xl"}>
                        <Text>Reset</Text>
                    </Button>
                    <Button
                        type="button"
                        _hover=""
                        w={"300px"}
                        ml={"4"}
                        rounded={"3xl"}
                        bgColor="#D3212D"
                    >
                        <Text color={"white"}>Save</Text>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AddRoom;
