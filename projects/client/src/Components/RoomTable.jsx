import React, { useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Switch,
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Box,
    Flex,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

function RoomTable(props) {
    function BtnDelete() {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const cancelRef = React.useRef();
        const [loading, setLoading] = useState(false);

        const toast = useToast();

        const deleteRoom = async () => {
            try {
                setLoading(true);
                let token = localStorage.getItem("tempatku_login");
                let del = await axios.patch(
                    `${process.env.REACT_APP_API_BASE_URL}/room/delete/${props.uuid}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                onClose();
                toast({
                    title: "Room Deleted !",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });
                props.getAllRoomList();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        return (
            <>
                <Button colorScheme="red" _hover={""} onClick={onOpen}>
                    Delete Room
                </Button>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete Room
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You can't undo this action
                                afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick={deleteRoom}
                                    ml={3}
                                    isLoading={loading}
                                >
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        );
    }

    return (
        <Tbody>
            <Tr h="80px">
                <Td textColor={"black"} fontSize={"md"} textAlign={"center"}>
                    {props.idx}
                </Td>
                <Td textColor={"black"} fontSize={"md"} textAlign={"center"}>
                    {props.name}
                </Td>
                <Td textColor={"black"} fontSize={"md"} textAlign={"center"}>
                    {props.capacity}
                </Td>
                <Td textColor={"black"} fontSize={"md"} textAlign={"center"}>
                    {props.price}
                </Td>
                <Td alignContent={"center"}>
                    <Flex justifyContent={"space-evenly"}>
                        <Box display={"flex"} my={"auto"}>
                            <Link to={`/special/${props.uuid}`}>
                                <Button _hover="" bgColor={"green.400"}>
                                    <Text textColor={"white"}>
                                        Special Conditions
                                    </Text>
                                </Button>
                            </Link>
                        </Box>
                        <Box display={"flex"} my={"auto"}>
                            <Link to={`/room/edit/${props.uuid}`}>
                                <Button _hover="" bgColor={"#fec20c"}>
                                    <Text textColor={"white"}>Edit</Text>
                                </Button>
                            </Link>
                        </Box>
                        <Box display={"flex"} my={"auto"}>
                            {BtnDelete()}
                        </Box>
                    </Flex>
                </Td>
            </Tr>
        </Tbody>
    );
}

export default RoomTable;
