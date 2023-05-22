import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
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
    Checkbox,
    CheckboxGroup,
    useCheckbox,
    useCheckboxGroup,
    Stack,
} from "@chakra-ui/react";
import { Select, useChakraSelectProps } from "chakra-react-select";
import { HiTrash } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";

function AddRoom(props) {
    const toast = useToast();
    // useState and Functions
    const inputFile = useRef(null);
    const [roomName, setRoomName] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [roomCapacity, setRoomCapacity] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [fileRoom, setFileRoom] = useState(null);
    const [allPropertyByUserId, setAllPropertyByUserId] = useState([]);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkFileSize = (files) => {
        const maxSize = 2 * 1024 * 1024;
        let overSize = false;

        files.forEach((file) => {
            if (file.size > maxSize) {
                overSize = true;
            }
        });
        return overSize;
    };
    console.log("fileRoom", fileRoom);
    const onChangeFile = (event) => {
        const files = [...event.target.files];
        const overSize = checkFileSize(files);
        const fileAmount = files.length;
        console.log("files:", files);
        console.log("event.target.files:", event.target.files);
        if (overSize) {
            toast({
                title: "Error occured",
                description:
                    "Your picture file size exceeds the limit of 2 MB.",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else if (fileAmount > 5) {
            toast({
                title: "Error occured",
                description: "You can only upload up to 5 pictures",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFileRoom(files);
            toast({
                title: "Files chosen successfully",
                description: "Save the room after filling out all forms",
                status: "success",
                duration: 3500,
                isClosable: true,
            });
        }
    };

    const getPropertyNameAndId = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let get = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/room/getpropertynameandid`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAllPropertyByUserId(get.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log("INI GET ID & NAME PROPERTY:", allPropertyByUserId);

    const propertyOptions = allPropertyByUserId.map((val, idx) => {
        return { value: val.value, label: val.label };
    });

    const selectProperty = useChakraSelectProps({
        isMulti: false,
        value: property,
        onChange: setProperty,
    });

    const btnAddRoom = async () => {
        try {
            setLoading(true);
            let token = localStorage.getItem("tempatku_login");
            let formData = new FormData();
            formData.append(
                "data",
                JSON.stringify({
                    propertyId: property.value,
                    name: roomName,
                    description: description,
                    capacity: roomCapacity,
                    // facilities: improvement kalo waktu cukup,
                    price: roomPrice,
                })
            );
            if (fileRoom != null) {
                let temp = [...fileRoom];
                temp.forEach((val, idx) => {
                    formData.append("images", temp[idx]);
                });
                console.log("temp:", temp);
            }

            console.log("FormData:", formData);
            let add = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/room/addroom`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (add.data.success) {
                toast({
                    title: "Added new room.",
                    description: "Created room successfully.",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setProperty(null);
            setRoomName("");
            setFileRoom(null);
            setDescription("");
            setDescriptionLength(0);
            setRoomCapacity("");
            setRoomPrice("");
            setLoading(false);
        }
    };

    useEffect(() => {
        getPropertyNameAndId();
    }, []);

    console.log("property:", property);
    console.log("Roomname:", roomName);

    return (
        <Container
            my={"4"}
            h={"100%"}
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
                    <h1>Add New Room</h1>
                </Box>
                <Box mt={"10"}>
                    <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                        <h2>Room Information</h2>
                    </Box>
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Select Property</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box mx="4" my="2">
                                <FormLabel>Property</FormLabel>
                                <Box
                                    display={"flex"}
                                    w={"full"}
                                    justifyContent={"center"}
                                    mb={"2"}
                                >
                                    <FormControl>
                                        <Select
                                            useBasicStyles
                                            name="property"
                                            options={propertyOptions}
                                            placeholder="Select property"
                                            closeMenuOnSelect={true}
                                            {...selectProperty}
                                        />
                                    </FormControl>
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
                                        value={roomName}
                                        onChange={(e) =>
                                            setRoomName(e.target.value)
                                        }
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </Box>
                    {/* Upload Photo/s */}
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
                                        _hover={""}
                                        bgColor={"gray.100"}
                                        alignItems={"center"}
                                        onClick={() => {
                                            inputFile.current.click();
                                        }}
                                    >
                                        <SlPicture
                                            fontSize={"35px"}
                                            color="#D3212D"
                                        />
                                        <input
                                            type="file"
                                            id="file"
                                            ref={inputFile}
                                            style={{ display: "none" }}
                                            multiple
                                            onChange={onChangeFile}
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
                                        {fileRoom ? (
                                            <>
                                                <Text alignSelf={"center"}>
                                                    Your file/files:
                                                </Text>
                                                <Box
                                                    display={"flex"}
                                                    justifyContent={"left"}
                                                >
                                                    {fileRoom ? (
                                                        Array.from(
                                                            fileRoom
                                                        ).map((file, index) => (
                                                            <Image
                                                                key={index}
                                                                src={URL.createObjectURL(
                                                                    file
                                                                )}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
                                                                    margin: "8px",
                                                                    aspectRatio:
                                                                        "1/1",
                                                                    objectFit:
                                                                        "cover",
                                                                    borderRadius:
                                                                        "6px",
                                                                    boxShadow:
                                                                        "2px 2px 5px gray",
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
                                                    alignSelf={"center"}
                                                    onClick={() =>
                                                        setFileRoom(null)
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
                                        ) : null}
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {/* Description */}
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Tell Us A Story About The Room</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box mx="4" my="2">
                                <Textarea
                                    isRequired
                                    placeholder="Enter room description"
                                    size={"md"}
                                    resize={"none"}
                                    h={"250px"}
                                    maxLength={250}
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        setDescriptionLength(
                                            e.target.value.length
                                        );
                                    }}
                                />
                                <Text textAlign={"right"} color={"gray.300"}>
                                    {descriptionLength}/250
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                    {/* Capacity */}
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Set the Room Capactiy</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box mx="4" my="2">
                                <InputGroup display={"flex"} size={"md"}>
                                    <Input
                                        isRequired
                                        placeholder="Enter room capacity"
                                        type="number"
                                        justifyItems={"self-end"}
                                        h={"40px"}
                                        value={roomCapacity}
                                        onChange={(e) =>
                                            setRoomCapacity(e.target.value)
                                        }
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* Price */}
                <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                    <h2>Room Price</h2>
                </Box>
                <Box as={Flex} my="10">
                    <Flex flex={1} fontWeight="medium" alignItems={"center"}>
                        Set Your Price
                    </Flex>
                    <Box flex={3} display="flex" flexDir={"column"}>
                        <Box display={"flex"} flexDir={"row"}>
                            <FormControl mx={"4"}>
                                <FormLabel>Price (Rp)</FormLabel>
                                <Input
                                    isRequired
                                    type="number"
                                    placeholder="Enter price per night"
                                    mb={"2"}
                                    value={roomPrice}
                                    onChange={(e) =>
                                        setRoomPrice(e.target.value)
                                    }
                                />
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Box></Box>
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
                        onClick={btnAddRoom}
                        isLoading={loading}
                    >
                        <Text color={"white"}>Save</Text>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AddRoom;
