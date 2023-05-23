import React, { useEffect, useState } from "react";
import axios from "axios";
import RoomTable from "../../Components/RoomTable";
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
    Heading,
    Text,
    Button,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import Sidebar from "../../Components/Sidebar";

function RoomList(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const param = useParams();
    const navigate = useNavigate();

    const [dataAllRoom, setDataAllRoom] = useState([]);
    const [name, setName] = useState("");
    const [totalData, setTotalData] = React.useState(0);

    const defaultPage = parseInt(params.get("page")) - 1 || 0;
    const defaultSort = params.get("sortby") || "name";
    const defaultOrder = params.get("orderby") || "ASC";
    const defaultFilter = params.get("filter") || "";
    const [page, setPage] = React.useState(defaultPage);
    const [size] = React.useState(10);
    const [sortby, setSortby] = React.useState(defaultSort);
    const [order, setOrder] = React.useState(defaultOrder);
    const [filter, setFilter] = React.useState(defaultFilter);

    console.log("dataAllRoom:", dataAllRoom);

    const printRoomData = () => {
        const actualRowNumber = page * size;
        return dataAllRoom.map((val, idx) => {
            const rowNumber = actualRowNumber + idx + 1;
            return (
                <RoomTable
                    key={val.uuid}
                    idx={rowNumber}
                    name={val.room_category.name}
                    capacity={val.capacity}
                    price={val.price}
                    uuid={val.uuid}
                    getAllRoomList={getAllRoomList}
                />
            );
        });
    };

    const getAllRoomList = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let get = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/room/list?page=${page}&size=${size}&sortby=${name}&order=${order}&name=${filter}&uuid=${param.uuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setDataAllRoom(get.data.data);
            setTotalData(get.data.datanum);
            console.log("get room list", get.data.data);
            console.log("get room list only", get);
        } catch (error) {
            console.log(error);
        }
    };

    const paginate = (pageNumber) => {
        setPage(pageNumber.selected);
        params.set("page", pageNumber.selected + 1);
    };

    useEffect(() => {
        getAllRoomList();
    }, []);

    useEffect(() => {
        getAllRoomList();
    }, []);

    return (
        <>
            <Flex minH={"93vh"}>
                <Box>
                    <Sidebar />
                </Box>
                <Box w="full" flex={"5"} px={{ base: "1", sm: "4" }} mt="5">
                    <Flex justifyContent={"space-between"}>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: "2xl", md: "3xl" }}
                            textAlign={{ base: "center", sm: "start" }}
                            mb={"5"}
                        >
                            Rooms
                        </Heading>
                        <Button
                            color="#D3212D"
                            variant={"outline"}
                            onClick={() => navigate("/room")}
                        >
                            New Room
                        </Button>
                    </Flex>

                    <Box mt="4" w={"full"}>
                        {dataAllRoom.length ? (
                            <TableContainer>
                                <Table variant="simple" color={"#EEEEEE"}>
                                    <Thead>
                                        <Tr>
                                            <Th
                                                fontSize={"lg"}
                                                textAlign={"center"}
                                            >
                                                No
                                            </Th>
                                            <Th
                                                fontSize={"lg"}
                                                textAlign={"center"}
                                            >
                                                Room
                                            </Th>
                                            <Th
                                                fontSize={"lg"}
                                                textAlign={"center"}
                                            >
                                                Capacity
                                            </Th>
                                            <Th
                                                fontSize={"lg"}
                                                textAlign={"center"}
                                            >
                                                Price
                                            </Th>
                                            <Th
                                                fontSize={"lg"}
                                                textAlign={"center"}
                                            >
                                                Controls
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    {printRoomData()}
                                </Table>
                            </TableContainer>
                        ) : (
                            <>
                                <Text>
                                    This Property doesn't have any rooms. Click
                                    "New Room" to add a new room.
                                </Text>
                                <TableContainer>
                                    <Table variant="simple" color={"#EEEEEE"}>
                                        <Thead>
                                            <Tr>
                                                <Th
                                                    fontSize={"lg"}
                                                    textAlign={"center"}
                                                >
                                                    No
                                                </Th>
                                                <Th
                                                    fontSize={"lg"}
                                                    textAlign={"center"}
                                                >
                                                    Room
                                                </Th>
                                                <Th
                                                    fontSize={"lg"}
                                                    textAlign={"center"}
                                                >
                                                    Capacity
                                                </Th>
                                                <Th
                                                    fontSize={"lg"}
                                                    textAlign={"center"}
                                                >
                                                    Price
                                                </Th>
                                                <Th
                                                    fontSize={"lg"}
                                                    textAlign={"center"}
                                                >
                                                    Controls
                                                </Th>
                                            </Tr>
                                        </Thead>
                                        {printRoomData()}
                                    </Table>
                                </TableContainer>
                            </>
                        )}

                        {
                            <Flex justify="center">
                                <Pagination
                                    paginate={paginate}
                                    size={size}
                                    totalData={totalData}
                                />
                            </Flex>
                        }
                    </Box>
                </Box>
            </Flex>
        </>
    );
}

export default RoomList;
