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
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

function PropertyTable(props) {
    function BtnDeleteProperty() {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const cancelRef = React.useRef();
        const [loading, setLoading] = useState(false);

        const deleteProperty = async () => {
            try {
                setLoading(true);
                let token = localStorage.getItem("tempatku_login");
                let del = await axios.patch(
                    `${process.env.REACT_APP_API_BASE_URL}/property/delete/${props.uuid}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                onClose();
                props.getAllPropertyList();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        return (
            <>
                <Box>
                    <Button colorScheme="red" onClick={onOpen}>
                        Delete Property
                    </Button>
                </Box>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete Property
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
                                    onClick={deleteProperty}
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
                    {props.property}
                </Td>
                <Td textColor={"black"} fontSize={"md"} textAlign={"center"}>
                    {props.address}
                </Td>
                <Td alignContent={"center"}>
                    {/* Button View Property Rooms */}
                    <Flex justifyContent={"space-evenly"}>
                        <Box display={"flex"} my={"auto"}>
                            <Link to={`/rooms/${props.uuid}`}>
                                <Button _hover="" bgColor={"green.400"}>
                                    <Text textColor={"white"}>View Rooms</Text>
                                </Button>
                            </Link>
                        </Box>

                        {/* Button Edit */}
                        <Box display={"flex"} my={"auto"}>
                            <Link to={`/listing/edit/${props.uuid}`}>
                                <Button _hover="" bgColor={"#fec20c"}>
                                    <Text textColor={"white"}>Edit</Text>
                                </Button>
                            </Link>
                        </Box>

                        {/* Button Delete */}
                        <Box display={"flex"} my={"auto"}>
                            {BtnDeleteProperty()}
                        </Box>
                    </Flex>
                </Td>
            </Tr>
        </Tbody>
    );
}

export default PropertyTable;
