import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Flex,
    Table,
    Thead,
    Tr,
    Th,
    TableContainer,
    Box,
    Button,
    Text,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    useToast,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MaintenanceModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [maintenanceStartDate, setMaintenanceStartDate] = useState(null);
    const [maintenanceEndDate, setMaintenanceEndDate] = useState(null);
    const [remarks, setRemarks] = useState("");
    const [loading, setLoading] = useState(false);

    const [roomId, setRoomId] = useState("");

    const getRoomId = async () => {
        let token = localStorage.getItem("tempatku_login");
        let get = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/maintenance/data/${params1.uuid}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setRoomId(get.data.data.id);
    };

    const handleRemarksChange = (event) => {
        const inputRemarks = event.target.value;
        setRemarks(inputRemarks);
    };

    const handleMaintenanceStartDateChange = (date) => {
        setMaintenanceStartDate(date);
    };

    const handleMaintenanceEndDateChange = (date) => {
        setMaintenanceEndDate(date);
    };

    const handleSubmitMaintenance = async () => {
        try {
            setLoading(true);
            let token = localStorage.getItem("tempatku_login");
            let add = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/maintenance/create`,
                {
                    maintenanceStartDate: maintenanceStartDate,
                    maintenanceEndDate: maintenanceEndDate,
                    remarks: remarks,
                    roomId: roomId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (add.data.success) {
                toast({
                    title: "Added Maintenance",
                    description: `Created Maintenance for ${roomName}`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }
            onClose();
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to add maintenance",
                description: `${roomName} maintenance already exists on the selected date.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        } finally {
            getMaintenanceData();
            setMaintenanceStartDate(null);
            setMaintenanceEndDate(null);
            setRemarks("");
            setLoading(false);
        }
    };

    useEffect(() => {
        getRoomId();
    }, [isOpen]);
    return (
        <>
            <Button onClick={onOpen} bgColor="green.400" _hover={""}>
                <Text textColor={"white"}> Add Maintenance</Text>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Set Maintenance</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <HStack spacing={12}>
                                <FormControl>
                                    <FormLabel>Start Date</FormLabel>
                                    <DatePicker
                                        selected={maintenanceStartDate}
                                        onChange={
                                            handleMaintenanceStartDateChange
                                        }
                                        dateFormat="yyyy/dd/MM"
                                        minDate={new Date()}
                                        placeholderText="Select date"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>End Date</FormLabel>
                                    <DatePicker
                                        selected={maintenanceEndDate}
                                        onChange={
                                            handleMaintenanceEndDateChange
                                        }
                                        dateFormat="yyyy/dd/MM"
                                        minDate={maintenanceStartDate}
                                        placeholderText="Select date"
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl>
                                <FormLabel>Remarks</FormLabel>
                                <Input
                                    type="text"
                                    value={remarks}
                                    onChange={handleRemarksChange}
                                    placeholder="Enter reason of maintenance"
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            bgColor={"green.400"}
                            type="button"
                            onClick={handleSubmitMaintenance}
                            textColor={"white"}
                            mr={"4"}
                            isLoading={loading}
                        >
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default MaintenanceModal;
