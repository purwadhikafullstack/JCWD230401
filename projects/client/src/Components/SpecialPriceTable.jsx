import React, { useState } from "react";
import {
    Box,
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
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

function SpecialPriceTable(props) {
    function BtnDeleteSpecialPrice() {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const cancelRef = React.useRef();

        const deleteSpecialPrice = async () => {
            try {
                let token = localStorage.getItem("tempatku_login");
                let del = await axios.patch(
                    `${API_URL}/special/deletespecialprice`,
                    { uuid: props.uuidSpecial },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                onClose();
                props.getSpecialPriceData();
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <>
                <Button colorScheme="red" type="button" onClick={onOpen}>
                    Delete
                </Button>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete Special Price
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
                                    onClick={() => {
                                        deleteSpecialPrice();
                                    }}
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

    const startDateString = props.startDateSpecial;
    const startDate = new Date(startDateString);
    const longStartDate = startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const endDateString = props.endDateSpecial;
    const endDate = new Date(endDateString);
    const longEndDate = endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const price = props.price;
    const specialPrice = props.specialPrice;

    const priceIdr = () => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);
    };
    const specialPriceIdr = () => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(specialPrice);
    };

    const editIsActiveSpecial = async () => {
        let token = localStorage.getItem("tempatku_login");
        await axios.patch(
            `${API_URL}/special/editactive/${props.uuidSpecial}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    };

    return (
        <Tbody>
            <Tr>
                <Td textColor={"black"} fontSize={"lg"} fontWeight={"semibold"}>
                    {props.idxSpecial}
                </Td>
                <Td textColor={"black"} fontSize={"lg"} fontWeight={"semibold"}>
                    <p>{longStartDate}</p>
                </Td>
                <Td textColor={"black"} fontSize={"lg"} fontWeight={"semibold"}>
                    <p>{longEndDate}</p>
                </Td>
                <Td textColor={"black"} fontSize={"lg"} fontWeight={"semibold"}>
                    {priceIdr()}
                </Td>
                <Td textColor={"black"} fontSize={"lg"} fontWeight={"semibold"}>
                    {specialPriceIdr()}
                </Td>
                <Td display={"flex"} justifyContent={"space-evenly"}>
                    {BtnDeleteSpecialPrice()}
                    <Switch
                        size={"lg"}
                        alignSelf={"center"}
                        colorScheme={"green"}
                        defaultChecked={props.isActiveSpecial}
                        onChange={editIsActiveSpecial}
                    />
                </Td>
            </Tr>
        </Tbody>
    );
}

export default SpecialPriceTable;
