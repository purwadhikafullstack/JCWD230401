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
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../helper";
import { Link } from "react-router-dom";

function MaintenanceTable(props) {
    const toast = useToast();

    function BtnDeleteMaintenance() {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const cancelRef = React.useRef();

        const deleteMaintenance = async () => {
            try {
                let token = localStorage.getItem("tempatku_login");
                let del = await axios.patch(
                    `${API_URL}/maintenance/deletemaintenance`,
                    { uuid: props.uuidMaintenance },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                onClose();
                props.getMaintenanceData();
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <>
                <Button colorScheme="red" _hover={""} onClick={onOpen}>
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
                                Delete Maintenance
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
                                        deleteMaintenance();
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

    const startDateString = props.startDateMaintenance;
    const startDate = new Date(startDateString);
    const longStartDate = startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const endDateString = props.endDateMaintenance;
    const endDate = new Date(endDateString);
    const longEndDate = endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const editIsActiveMaintenance = async () => {
        let token = localStorage.getItem("tempatku_login");
        let edit = await axios.patch(
            `${API_URL}/maintenance/editactive/${props.uuidMaintenance}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        props.getMaintenanceData();
    };

    return (
        <Tbody>
            <Tr>
                <Td textColor={"black"} fontSize={"lg"} fontWeight={"semibold"}>
                    {props.idxMaintenance}
                </Td>
                <Td textColor={"black"} fontSize={"lg"} fontWeight={"semibold"}>
                    <p>{longStartDate}</p>
                </Td>
                <Td textColor={"black"} fontSize={"lg"} fontWeight={"semibold"}>
                    <p>{longEndDate}</p>
                </Td>
                <Td textColor={"black"} fontSize={"lg"} fontWeight={"semibold"}>
                    {props.remarks}
                </Td>
                <Td
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    fontWeight={"semibold"}
                >
                    {BtnDeleteMaintenance()}
                    <Switch
                        size={"lg"}
                        alignSelf={"center"}
                        colorScheme={"green"}
                        isChecked={props.isActiveMaintenance}
                        onChange={editIsActiveMaintenance}
                    />
                </Td>
            </Tr>
        </Tbody>
    );
}

export default MaintenanceTable;
