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
import Pagination from "../../Components/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SpecialPriceTable from "../../Components/SpecialPriceTable";
import MaintenanceTable from "../../Components/MaintenanceTable";
import SpecialPriceModal from "../../Components/SpecialPriceModal";
import MaintenanceModal from "../../Components/SpecialPriceModal";
import Sidebar from "../../Components/Sidebar";
import Loading from "../../Components/Loading";

function RoomConditionList(props) {
    const [loadingPage, setLoadingPage] = useState(true);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const params1 = useParams();

    const toast = useToast();

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
            // setLoadingPage(false);
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

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1700);
    }, []);

    useEffect(() => {
        getSpecialPriceData();
        getMaintenanceData();
    }, [pageSpecialPrice, pageMaintenance]);

    if (loadingPage === true) {
        return <Loading />;
    }
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
                                            borderColor={"gray.300"}
                                            borderWidth={"1px"}
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
                                                    <SpecialPriceModal
                                                        roomname={roomName}
                                                        getSpecialPriceData={
                                                            getSpecialPriceData
                                                        }
                                                    />
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
                                            borderColor={"gray.300"}
                                            borderWidth={"1px"}
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
                                                    <MaintenanceModal />
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
