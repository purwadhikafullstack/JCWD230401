import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import SpecialPriceTable from "../../Components/SpecialPriceTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaintenanceTable from "../../Components/MaintenanceTable";
import Sidebar from "../../Components/Sidebar";

function RoomConditionList(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const params1 = useParams();

    const toast = useToast();

    const navigate = useNavigate();

    const [dataSpecialPrice, setDataSpecialPrice] = useState([]);

    const [dataMaintenance, setDataMaintenance] = useState([]);

    const [roomName, setRoomName] = useState("");

    const [totalDataSpecialPrice, setTotalDataSpecialPrice] = React.useState(0);
    const [totalDataMaintenance, setTotalDataMaintenance] = React.useState(0);

    const specialPriceDefaultPage = parseInt(params.get("page")) - 1 || 0;
    const specialPriceDefaultSort = params.get("sortby") || "id";
    const specialPriceDefaultOrder = params.get("orderby") || "DESC";

    const maintenanceDefaultPage = parseInt(params.get("page")) - 1 || 0;
    const maintenanceDefaultSort = params.get("sortby") || "id";
    const maintenanceDefaultOrder = params.get("orderby") || "ASC";

    const [pageSpecialPrice, setPageSpecialPrice] = React.useState(
        specialPriceDefaultPage
    );
    const [sizeSpecialPrice] = React.useState(4);

    const [sortbySpecialPrice, setSortbySpecialPrice] = React.useState(
        specialPriceDefaultSort
    );
    const [orderSpecialPrice, setOrderSpecialPrice] = React.useState(
        specialPriceDefaultOrder
    );

    const [pageMaintenance, setPageMaintenance] = React.useState(
        maintenanceDefaultPage
    );
    const [sizeMaintenance] = React.useState(4);

    const [sortbyMaintenance, setSortbyMaintenance] = React.useState(
        maintenanceDefaultSort
    );
    const [orderMaintenance, setOrderMaintenance] = React.useState(
        maintenanceDefaultOrder
    );

    const paginateSpecialPrice = (pageNumber) => {
        setPageSpecialPrice(pageNumber.selected);
        params.set("page", pageNumber.selected + 1);
    };

    const paginateMaintenance = (pageNumber) => {
        setPageMaintenance(pageNumber.selected);
        params.set("page", pageNumber.selected + 1);
    };

    const getSpecialPriceData = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let get = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/special/room/${params1.uuid}?page=${pageSpecialPrice}&size=${sizeSpecialPrice}&sortby=${sortbySpecialPrice}&order=${orderSpecialPrice}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setDataSpecialPrice(get.data.data);
            setTotalDataSpecialPrice(get.data.datanum);
            setRoomName(get.data.data[0].room.room_category.name);
        } catch (error) {
            console.log(error);
        }
    };

    const getMaintenanceData = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let get = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/maintenance/room/${params1.uuid}?page=${pageMaintenance}&size=${sizeMaintenance}&sortby=${sortbyMaintenance}&order${orderMaintenance}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDataMaintenance(get.data.data);
            setTotalDataMaintenance(get.data.datanum);
        } catch (error) {
            console.log(error);
        }
    };

    const printSpecialPriceData = () => {
        const actualRowNumber = pageSpecialPrice * sizeSpecialPrice;
        return dataSpecialPrice.map((valSpecial, idxSpecial) => {
            const rowNumber = actualRowNumber + idxSpecial + 1;
            return (
                <SpecialPriceTable
                    key={idxSpecial}
                    idxSpecial={rowNumber}
                    startDateSpecial={valSpecial.startDate}
                    endDateSpecial={valSpecial.endDate}
                    price={valSpecial.room.price}
                    specialPrice={valSpecial.priceOnDate}
                    uuidSpecial={valSpecial.uuid}
                    isActiveSpecial={valSpecial.isActive}
                    roomId={valSpecial.id}
                    getSpecialPriceData={getSpecialPriceData}
                />
            );
        });
    };
    const printMaintenanceData = () => {
        const actualRowNumber = pageMaintenance * sizeMaintenance;

        return dataMaintenance.map((valMaintenance, idxMaintenance) => {
            const rowNumber = actualRowNumber + idxMaintenance + 1;

            return (
                <MaintenanceTable
                    key={idxMaintenance}
                    idxMaintenance={rowNumber}
                    startDateMaintenance={valMaintenance.startDate}
                    endDateMaintenance={valMaintenance.endDate}
                    remarks={valMaintenance.remarks}
                    uuidMaintenance={valMaintenance.uuid}
                    isActiveMaintenance={valMaintenance.isActive}
                    roomId={valMaintenance.id}
                    getMaintenanceData={getMaintenanceData}
                />
            );
        });
    };

    function SpecialPriceModal() {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const [specialStartDate, setSpecialStartDate] = useState(null);
        const [specialEndDate, setSpecialEndDate] = useState(null);
        const [normalPrice, setNormalPrice] = useState("")
        const [roomId, setRoomId] = useState("")
        const [price, setPrice] = useState("");
        const [percentage, setPercentage] = useState("");
        const [loading, setLoading] = useState(false);

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
            setNormalPrice(get.data.data.price)
            setRoomId(get.data.data.id)
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
                    (Number(inputPercentage) * normalPrice) /
                    100;
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
                        description: `Created Special Price for ${roomName}`,
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
                    description: `${roomName} special price already exists on the selected date.`,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            } finally {
                getSpecialPriceData();
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
                                            onChange={
                                                handleSpecialStartDateChange
                                            }
                                            dateFormat="yyyy/dd/MM"
                                            minDate={new Date()}
                                            placeholderText="Select date"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Choose End Date</FormLabel>
                                        <DatePicker
                                            selected={specialEndDate}
                                            onChange={
                                                handleSpecialEndDateChange
                                            }
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

    function MaintenanceModal() {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const [maintenanceStartDate, setMaintenanceStartDate] = useState(null);
        const [maintenanceEndDate, setMaintenanceEndDate] = useState(null);
        const [remarks, setRemarks] = useState("");
        const [loading, setLoading] = useState(false);

        const [roomId, setRoomId] = useState("")

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
            setRoomId(get.data.data.id)
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
    useEffect(() => {
        getSpecialPriceData();
        getMaintenanceData();
    }, [pageSpecialPrice, pageMaintenance]);

    return (
        <>
            <Flex minH={"93vh"}>
                <Box>
                    <Sidebar />
                </Box>
                <Box w="full" flex={"5"} px={{ base: "1", sm: "4" }} mt="5">
                    <Flex>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: "2xl", md: "3xl" }}
                            textAlign={{ base: "center", sm: "start" }}
                            mb={"5"}
                        >
                            Special Conditions:{` ${roomName}`}
                        </Heading>
                    </Flex>
                    <Flex
                        flexDir={"column"}
                        justifyItems={"center"}
                        mx={"auto"}
                    >
                        <Box>
                            <Tabs
                                isFitted
                                variant="line"
                                defaultIndex={0}
                                colorScheme="red"
                            >
                                <TabList mb="4">
                                    <Tab>
                                        <Heading
                                            fontWeight={"bold"}
                                            size={"xl"}
                                            ml="4"
                                        >
                                            <Text alignSelf={"center"}>
                                                Special Price
                                            </Text>
                                        </Heading>
                                    </Tab>
                                    <Tab>
                                        <Heading
                                            fontWeight={"bold"}
                                            size={"xl"}
                                            ml="4"
                                        >
                                            <Text>Maintenance</Text>
                                        </Heading>
                                    </Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        {/* TABLE SPECIAL PRICE */}
                                        <Box
                                            style={{
                                                borderRadius: "10px",
                                                boxShadow: "4px 4px 20px gray",
                                            }}
                                            borderRadius={"2xl"}
                                        >
                                            <Box
                                                w={"full"}
                                                h={"55vh"}
                                                display={"flex"}
                                                flexDir={"column"}
                                                justifyContent={"space-between"}
                                            >
                                                <Flex
                                                    justifyContent={"right"}
                                                    alignContent={"center"}
                                                    py={"4"}
                                                    mr={"4"}
                                                >
                                                    {SpecialPriceModal()}
                                                </Flex>

                                                <TableContainer flex={"1"}>
                                                    <Table
                                                        variant="simple"
                                                        color={"#EEEEEE"}
                                                    >
                                                        <Thead>
                                                            <Tr>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    No
                                                                </Th>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Start Date
                                                                </Th>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    End Date
                                                                </Th>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Normal Price
                                                                </Th>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Special
                                                                    Price
                                                                </Th>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                    textAlign={
                                                                        "center"
                                                                    }
                                                                >
                                                                    Controls
                                                                </Th>
                                                            </Tr>
                                                        </Thead>
                                                        {printSpecialPriceData()}
                                                    </Table>
                                                </TableContainer>

                                                <Flex justify="center">
                                                    <Pagination
                                                        paginate={
                                                            paginateSpecialPrice
                                                        }
                                                        size={sizeSpecialPrice}
                                                        totalData={
                                                            totalDataSpecialPrice
                                                        }
                                                    />
                                                </Flex>
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel>
                                        {/* TABLE MAINTENANCE */}
                                        <Box
                                            style={{
                                                borderRadius: "10px",
                                                boxShadow: "4px 4px 20px gray",
                                            }}
                                            borderRadius={"2xl"}
                                        >
                                            <Box
                                                w={"full"}
                                                h={"55vh"}
                                                display={"flex"}
                                                flexDir={"column"}
                                                justifyContent={"space-between"}
                                            >
                                                <Flex
                                                    flexDir={"row"}
                                                    justifyContent={"right"}
                                                    alignContent={"center"}
                                                    py={"4"}
                                                    mr="4"
                                                >
                                                    {MaintenanceModal()}
                                                </Flex>

                                                <TableContainer flex={"1"}>
                                                    <Table
                                                        variant="simple"
                                                        color={"#EEEEEE"}
                                                    >
                                                        <Thead>
                                                            <Tr>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    No
                                                                </Th>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Start Date
                                                                </Th>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    End Date
                                                                </Th>
                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                >
                                                                    Remarks
                                                                </Th>

                                                                <Th
                                                                    fontSize={
                                                                        "xl"
                                                                    }
                                                                    fontWeight={
                                                                        "bold"
                                                                    }
                                                                    textAlign={
                                                                        "center"
                                                                    }
                                                                >
                                                                    Controls
                                                                </Th>
                                                            </Tr>
                                                        </Thead>
                                                        {printMaintenanceData()}
                                                    </Table>
                                                </TableContainer>

                                                <Flex
                                                    justify="center"
                                                    align={"center"}
                                                >
                                                    <Pagination
                                                        paginate={
                                                            paginateMaintenance
                                                        }
                                                        size={sizeMaintenance}
                                                        totalData={
                                                            totalDataMaintenance
                                                        }
                                                    />
                                                </Flex>
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export default RoomConditionList;
