import React from "react";
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
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../helper";
import { Link } from "react-router-dom";

function PropertyTable(props) {
    function BtnDeleteProperty() {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const cancelRef = React.useRef();

        const deleteProperty = async () => {
            try {
                let token = localStorage.getItem("tempatku_login");
                let del = await axios.patch(
                    `${API_URL}/property/deleteproperty/${props.uuid}`,
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
            }
        };

        return (
            <>
                <Button colorScheme="red" onClick={onOpen}>
                    Delete Property
                </Button>

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
            <Tr>
                <Td textColor={"black"} fontSize={"md"}>
                    {props.idx}
                </Td>
                <Td textColor={"black"} fontSize={"md"}>
                    {props.property}
                </Td>
                <Td textColor={"black"} fontSize={"md"}>
                    {props.address}
                </Td>
                {/* Button View Property Rooms */}
                <Td display={"flex"} justifyContent={"space-evenly"}>
                    <Link to={`/roomlist/${props.uuid}`}>
                        <Button _hover="" bgColor={"green.400"}>
                            <Text textColor={"white"}>View Rooms</Text>
                        </Button>
                    </Link>

                    {/* Button Edit */}
                    <Link to={`/editlisting/${props.uuid}`}>
                        <Button _hover="" bgColor={"#fec20c"}>
                            <Text textColor={"white"}>Edit</Text>
                        </Button>
                    </Link>

                    {/* Button Delete */}
                    {BtnDeleteProperty()}
                </Td>
            </Tr>
        </Tbody>
    );
}

export default PropertyTable;
