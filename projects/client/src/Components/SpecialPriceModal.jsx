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

function SpecialPriceModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [specialStartDate, setSpecialStartDate] = useState(null);
    const [specialEndDate, setSpecialEndDate] = useState(null);
    const [normalPrice, setNormalPrice] = useState("");
    const [roomId, setRoomId] = useState("");
    const [price, setPrice] = useState("");
    const [percentage, setPercentage] = useState("");
    const [loading, setLoading] = useState(false);

    const params1 = useParams();

    const toast = useToast();

    const getRoomPrice = async () => {
        let token = localStorage.getItem("tempatku_login");
        let get = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/special/data/${params1.uuid}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setNormalPrice(get.data.data.price);
        setRoomId(get.data.data.id);
    };

    const handlePriceChange = (event) => {
        const inputPrice = event.target.value;
        setPrice(inputPrice);

        if (inputPrice !== "") {
            const calculatedPercentage =
                (Number(inputPrice) * 100) / normalPrice;
            setPercentage(calculatedPercentage.toFixed(2));
        } else {
            setPercentage("");
        }
    };

    const handlePercentageChange = (event) => {
        const inputPercentage = event.target.value;
        setPercentage(inputPercentage);

        if (inputPercentage !== "") {
            const calculatedPrice =
                (Number(inputPercentage) * normalPrice) / 100;
            setPrice(calculatedPrice.toFixed(2));
        } else {
            setPrice("");
        }
    };

    const handleSpecialStartDateChange = (date) => {
        setSpecialStartDate(date);
    };

    const handleSpecialEndDateChange = (date) => {
        setSpecialEndDate(date);
    };

    const handleSubmitSpecialPrice = async () => {
        try {
            setLoading(true);
            let token = localStorage.getItem("tempatku_login");
            let add = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/special/create`,
                {
                    specialStartDate: specialStartDate,
                    specialEndDate: specialEndDate,
                    price: price,
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
                    title: "Created Special Price",
                    description: `Created Special Price for ${props.roomname}`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }
            onClose();
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to add special price",
                description: `${props.roomname} special price already exists on the selected date.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        } finally {
            props.getSpecialPriceData();
            setPrice("");
            setPercentage("");
            setSpecialStartDate(null);
            setSpecialEndDate(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        getRoomPrice();
    }, [isOpen]);

    return (
        <>
            <Button onClick={onOpen} bgColor="green.400" _hover={""}>
                <Text textColor={"white"}> Add Special Price</Text>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Set Special Price</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <HStack spacing={12}>
                                <FormControl>
                                    <FormLabel>Choose Start Date</FormLabel>
                                    <DatePicker
                                        selected={specialStartDate}
                                        onChange={handleSpecialStartDateChange}
                                        dateFormat="yyyy/dd/MM"
                                        minDate={new Date()}
                                        placeholderText="Select date"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Choose End Date</FormLabel>
                                    <DatePicker
                                        selected={specialEndDate}
                                        onChange={handleSpecialEndDateChange}
                                        dateFormat="yyyy/dd/MM"
                                        minDate={new Date(specialStartDate)}
                                        placeholderText="Select date"
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl>
                                <FormLabel>Special Price</FormLabel>
                                <Input
                                    type="number"
                                    value={price}
                                    onChange={handlePriceChange}
                                    placeholder="Enter price"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Percentage (%)</FormLabel>
                                <Input
                                    type="number"
                                    value={percentage}
                                    onChange={handlePercentageChange}
                                    placeholder="Enter percentage"
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            bgColor={"green.400"}
                            type="button"
                            onClick={handleSubmitSpecialPrice}
                            textColor={"white"}
                            mr={"4"}
                            _hover=""
                            isLoading={loading}
                        >
                            Save
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default SpecialPriceModal;
