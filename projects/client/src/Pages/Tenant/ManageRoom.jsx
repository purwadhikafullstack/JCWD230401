import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL, API_URL_IMG } from "../../helper";
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
import { HiTrash } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";
import { useParams } from "react-router-dom";

function ManageRoom() {
    const params = useParams();

    const toast = useToast();

    const inputFile1 = useRef(null);
    const inputFile2 = useRef(null);
    const inputFile3 = useRef(null);
    const inputFile4 = useRef(null);
    const inputFile5 = useRef(null);

    const [roomData, setRoomData] = useState(null);
    const [roomName, setRoomName] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [roomCapacity, setRoomCapacity] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [property, setProperty] = useState(null);

    const [fileRoomEdit1, setFileRoomEdit1] = useState(null);
    const [fileRoomEdit2, setFileRoomEdit2] = useState(null);
    const [fileRoomEdit3, setFileRoomEdit3] = useState(null);
    const [fileRoomEdit4, setFileRoomEdit4] = useState(null);
    const [fileRoomEdit5, setFileRoomEdit5] = useState(null);

    const getRoomData = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let get = await axios.get(
                `${API_URL}/room/getroomdata/${params.uuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("get", get);
            setRoomData(get.data.data[0]);
            setFileRoomEdit1(get.data.data[0].picture_rooms[0]);
            setFileRoomEdit2(get.data.data[0].picture_rooms[1]);
            setFileRoomEdit3(get.data.data[0].picture_rooms[2]);
            setFileRoomEdit4(get.data.data[0].picture_rooms[3]);
            setFileRoomEdit5(get.data.data[0].picture_rooms[4]);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadImageRoom = async (imageFile, id, roomId) => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let formData = new FormData();

            formData.append("images", imageFile);

            let edit = await axios.patch(
                `${API_URL}/room/updateimageroom?id=${id}&roomId=${roomData.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (edit.data.success) {
                toast({
                    title: "Room Image Updated !",
                    description: "Saved your file.",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteImageRoom = async (id) => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let del = await axios.patch(
                `${API_URL}/room/deleteimageroom?id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (del.data.success) {
                getRoomData();
                toast({
                    title: " Image Deleted !",
                    description: "Successfully deleted the image.",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeFile1 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFileRoomEdit1(event.target.files[0]);
            uploadImageRoom(event.target.files[0], id);
        }
    };

    const onChangeFile2 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFileRoomEdit2(event.target.files[0]);
            uploadImageRoom(event.target.files[0], id);
        }
    };

    const onChangeFile3 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFileRoomEdit3(event.target.files[0]);
            uploadImageRoom(event.target.files[0], id);
        }
    };

    const onChangeFile4 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFileRoomEdit4(event.target.files[0]);
            uploadImageRoom(event.target.files[0], id);
        }
    };

    const onChangeFile5 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFileRoomEdit5(event.target.files[0]);
            uploadImageRoom(event.target.files[0], id);
        }
    };

    const btnEditRoom = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");

            let edit = await axios.patch(
                `${API_URL}/room/editroom/${params.uuid}`,
                {
                    name: roomName,
                    description: description,
                    capacity: roomCapacity,
                    price: roomPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (edit.data.success) {
                toast({
                    title: "Room Data Updated !",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRoomData();
    }, []);

    console.log("roomData:", roomData);
    console.log("property:", property);
    console.log("Roomname:", roomName);

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
                    <h1>Edit Existing Room</h1>
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
                            <Text>Edit room name</Text>
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
                                        defaultValue={
                                            roomData?.room_category?.name
                                        }
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
                            <Text>Edit Room Photos</Text>
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
                                    mx="4"
                                    my="2"
                                    minW={"871px"}
                                >
                                    <Box as={Flex}>
                                        <Box
                                            display={"flex"}
                                            w={"full"}
                                            justifyContent={"space-between"}
                                        >
                                            {/* Button Image 1 */}
                                            {fileRoomEdit1 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile1.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof fileRoomEdit1.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              fileRoomEdit1
                                                                          )
                                                                        : `${API_URL_IMG}${fileRoomEdit1.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
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
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile1}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile1(
                                                                        event,
                                                                        fileRoomEdit1.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFileRoomEdit1(
                                                                    null
                                                                );
                                                                deleteImageRoom(
                                                                    roomData
                                                                        .picture_rooms[0]
                                                                        .id
                                                                );
                                                            }}
                                                        >
                                                            <Text
                                                                fontSize={"xl"}
                                                            >
                                                                <HiTrash
                                                                    fontWeight={
                                                                        "extrabold"
                                                                    }
                                                                    color="#D3212D"
                                                                />
                                                            </Text>
                                                        </Button>
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile1.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile1}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile1(
                                                                event,
                                                                fileRoomEdit1.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}

                                            {/* Button Image 2 */}
                                            {fileRoomEdit2 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile2.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof fileRoomEdit2.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              fileRoomEdit2
                                                                          )
                                                                        : `${API_URL_IMG}${fileRoomEdit2.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
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
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile2}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile2(
                                                                        event,
                                                                        fileRoomEdit2.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFileRoomEdit2(
                                                                    null
                                                                );
                                                                deleteImageRoom(
                                                                    roomData
                                                                        .picture_rooms[1]
                                                                        .id
                                                                );
                                                            }}
                                                        >
                                                            <Text
                                                                fontSize={"xl"}
                                                            >
                                                                <HiTrash
                                                                    fontWeight={
                                                                        "extrabold"
                                                                    }
                                                                    color="#D3212D"
                                                                />
                                                            </Text>
                                                        </Button>
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile2.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile2}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile2(
                                                                event,
                                                                fileRoomEdit2.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}
                                            {/* Button Image 3 */}
                                            {fileRoomEdit3 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile3.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof fileRoomEdit3.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              fileRoomEdit3
                                                                          )
                                                                        : `${API_URL_IMG}${fileRoomEdit3.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
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
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile3}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile3(
                                                                        event,
                                                                        fileRoomEdit3.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFileRoomEdit3(
                                                                    null
                                                                );
                                                                deleteImageRoom(
                                                                    roomData
                                                                        .picture_rooms[2]
                                                                        .id
                                                                );
                                                            }}
                                                        >
                                                            <Text
                                                                fontSize={"xl"}
                                                            >
                                                                <HiTrash
                                                                    fontWeight={
                                                                        "extrabold"
                                                                    }
                                                                    color="#D3212D"
                                                                />
                                                            </Text>
                                                        </Button>
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile3.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile3}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile3(
                                                                event,
                                                                fileRoomEdit3.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}
                                            {/* Button Image 4 */}
                                            {fileRoomEdit4 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile4.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof fileRoomEdit4.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              fileRoomEdit4
                                                                          )
                                                                        : `${API_URL_IMG}${fileRoomEdit4.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
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
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile4}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile4(
                                                                        event,
                                                                        fileRoomEdit4.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFileRoomEdit1(
                                                                    null
                                                                );
                                                                deleteImageRoom(
                                                                    roomData
                                                                        .picture_rooms[3]
                                                                        .id
                                                                );
                                                            }}
                                                        >
                                                            <Text
                                                                fontSize={"xl"}
                                                            >
                                                                <HiTrash
                                                                    fontWeight={
                                                                        "extrabold"
                                                                    }
                                                                    color="#D3212D"
                                                                />
                                                            </Text>
                                                        </Button>
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile4.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile4}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile4(
                                                                event,
                                                                fileRoomEdit4.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}
                                            {/* Button Image 5 */}
                                            {fileRoomEdit5 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile5.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof fileRoomEdit5.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              fileRoomEdit5
                                                                          )
                                                                        : `${API_URL_IMG}${fileRoomEdit5.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
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
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile5}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile5(
                                                                        event,
                                                                        fileRoomEdit5.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFileRoomEdit5(
                                                                    null
                                                                );
                                                                deleteImageRoom(
                                                                    roomData
                                                                        .picture_rooms[4]
                                                                        .id
                                                                );
                                                            }}
                                                        >
                                                            <Text
                                                                fontSize={"xl"}
                                                            >
                                                                <HiTrash
                                                                    fontWeight={
                                                                        "extrabold"
                                                                    }
                                                                    color="#D3212D"
                                                                />
                                                            </Text>
                                                        </Button>
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile5.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile5}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile5(
                                                                event,
                                                                fileRoomEdit5.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
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
                            <Text>Edit Room Description</Text>
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
                                    defaultValue={roomData?.description}
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
                            <Text>Edit Room Capactiy</Text>
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
                                        defaultValue={roomData?.capacity}
                                        onChange={(e) =>
                                            setRoomCapacity(e.target.value)
                                        }
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* Facilities */}
                {/* <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                    <h2>Room Facilities</h2>
                </Box>
                <Box as={Flex} my="10">
                    <Flex flex={1} fontWeight="medium" alignItems={"center"}>
                        Choose Facilities That Fit Your Room
                    </Flex>
                    <Box flex={3} display="flex" flexDir={"column"}>
                        <Box
                            display={"flex"}
                            flexDir={"row"}
                            w={"100%"}
                            justifyContent={"space-evenly"}
                        >
                            <Box mx="4" display={"flex"}>
                                <CheckboxGroup colorScheme="red">
                                    <Stack
                                        spacing={[1, 5]}
                                        direction={["row", "column"]}
                                    >
                                        <Checkbox>
                                            <Text>Wifi</Text>
                                        </Checkbox>
                                        <Checkbox>
                                            <Text>TV</Text>
                                        </Checkbox>
                                        <Checkbox>
                                            <Text>Air Conditioning</Text>
                                        </Checkbox>
                                    </Stack>
                                </CheckboxGroup>
                            </Box>
                            <Box mx="4" display={"flex"}>
                                <CheckboxGroup colorScheme="red">
                                    <Stack
                                        spacing={[1, 5]}
                                        direction={["row", "column"]}
                                    >
                                        <Checkbox>
                                            <Text>Free Parking</Text>
                                        </Checkbox>
                                        <Checkbox>
                                            <Text>Dedicated Workspace</Text>
                                        </Checkbox>
                                        <Checkbox>
                                            <Text>Breakfast</Text>
                                        </Checkbox>
                                    </Stack>
                                </CheckboxGroup>
                            </Box>
                            <Box mx="4" display={"flex"}>
                                <CheckboxGroup colorScheme="red">
                                    <Stack
                                        spacing={[1, 5]}
                                        direction={["row", "column"]}
                                    >
                                        <Checkbox>
                                            <Text>Hot Tub</Text>
                                        </Checkbox>
                                        <Checkbox>
                                            <Text>Washer</Text>
                                        </Checkbox>
                                        <Checkbox>
                                            <Text>Kitchen</Text>
                                        </Checkbox>
                                    </Stack>
                                </CheckboxGroup>
                            </Box>
                            <Box mx="4" display={"flex"}>
                                <CheckboxGroup colorScheme="red">
                                    <Stack
                                        spacing={[1, 5]}
                                        direction={["row", "column"]}
                                    >
                                        <Checkbox>
                                            <Text>City View</Text>
                                        </Checkbox>
                                        <Checkbox>
                                            <Text>Refrigerator</Text>
                                        </Checkbox>
                                        <Checkbox>
                                            <Text>Pool</Text>
                                        </Checkbox>
                                    </Stack>
                                </CheckboxGroup>
                            </Box>
                        </Box>
                    </Box>
                </Box> */}
                {/* Price */}
                <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                    <h2>Edit Room Price</h2>
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
                                    defaultValue={roomData?.price}
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
                        onClick={btnEditRoom}
                    >
                        <Text color={"white"}>Save</Text>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ManageRoom;
