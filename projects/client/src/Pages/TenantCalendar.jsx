import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
    Box,
    Flex,
    Stack,
    Text,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar/Sidebar";
import axios from "axios";

function TenantCalendar() {
    const [roomOrders, setRoomOrders] = useState([]);
    const [roomMaintenances, setRoomMaintenances] = useState([]);

    //1. axios
    const getRoomOrders = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/calendar/getroomorders`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRoomOrders(response.data);
            console.log("response getRoomOrders :", response.data); //testing purposes
        } catch (error) {
            console.log("ini error dari getRoomOrders :", error);
        }
    };

    const getRoomMaintenances = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/calendar/getroommaintenance`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRoomMaintenances(response.data);
            console.log("response getRoomMaintenances :", response.data); //testing purposes
        } catch (error) {
            console.log("ini error dari getRoomMaintenances :", error);
        }
    };

    //2. Jalani fungsi api
    React.useEffect(() => {
        getRoomOrders();
    }, []);
    React.useEffect(() => {
        getRoomMaintenances();
    }, []);

    //3. Print room orders and under maintenances
    const printRoomOrders = () => {
        let print = roomOrders.map((val, idx) => {
            const { start_date, end_date, room } = val;
            const name = room ? room.room_category.name : "Room not available";
            if (!room) {
                return null;
            }
            return { start_date, end_date, name: name };
        });
        return print;
    };
    const printRoomMaintenances = () => {
        let print = roomMaintenances.map((val, idx) => {
            const { startDate, endDate, room } = val;
            const name = room ? room.room_category.name : "Room not available";
            if (!room) {
                return null;
            }
            return { startDate, endDate, name: name };
        });
        console.log("printRoomMaintenances print: ", print);
        return print;
    };

    //4. Format calendar
    const roomEvents1 = printRoomOrders()
        .filter((val) => val !== null)
        .map((val) => {
            const startDate = new Date(val.start_date);
            const endDate = new Date(val.end_date);
            endDate.setDate(endDate.getDate() + 1);

            return {
                title: `${val.name} booked`,
                start: startDate.toISOString().split("T")[0],
                end: endDate.toISOString().split("T")[0],
            };
        });

    const roomEvents2 = printRoomMaintenances()
        .filter((val) => val !== null)
        .map((val) => {
            const startDate = new Date(val.startDate);
            const endDate = new Date(val.endDate);
            endDate.setDate(endDate.getDate() + 1);

            return {
                title: `${val.name} under maintenance`,
                start: startDate.toISOString().split("T")[0],
                end: endDate.toISOString().split("T")[0],
            };
        });

    const roomEvents = [...roomEvents1, ...roomEvents2];

    //right side bar info
    const printThisMonthsBookings = () => {
        return roomOrders.map((val, idx) => {
            const { start_date, end_date, room } = val;
            const name = room ? room.room_category.name : "Room not available";
            const startDate = new Date(start_date).toLocaleDateString("id-ID");
            const endDate = new Date(end_date).toLocaleDateString("id-ID");
            if (!room) {
                return null;
            }
            return (
                <ListItem key={idx} fontSize={"sm"}>
                    {name} ({startDate} to {endDate})
                </ListItem>
            );
        });
    };
    const printThisMonthsMaintenances = () => {
        return roomMaintenances.map((val, idx) => {
            const { startDate, endDate, room } = val;
            const name = room ? room.room_category.name : "Room not available";
            const startDateFormat = new Date(startDate).toLocaleDateString(
                "id-ID"
            );
            const endDateFormat = new Date(endDate).toLocaleDateString("id-ID");
            if (!room) {
                return null;
            }
            return (
                <ListItem key={idx} fontSize={"sm"}>
                    {name} ({startDateFormat} to {endDateFormat})
                </ListItem>
            );
        });
    };

    return (
        <Flex
            minH={"100vh"}
            // align={'center'}
            // justify={'center'}
            p={12}
        >
            <Box flex="1">
                <Sidebar />
            </Box>
            <Box w="full" flex="5" px="4">
                <Fullcalendar
                    w="full"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    height={"90vh"}
                    events={roomEvents}
                />
            </Box>
            <Box p={12} flex="1">
                <Stack spacing={12} align={"start"} mb={5}>
                    <Box>
                        <Text fontWeight={"semibold"}>Bookings:</Text>
                        <UnorderedList mt="2">
                            {printThisMonthsBookings()}
                        </UnorderedList>
                    </Box>
                    <Box>
                        <Text fontWeight={"semibold"}>Under Maintenances:</Text>
                        <UnorderedList mt="2">
                            {printThisMonthsMaintenances()}
                        </UnorderedList>
                    </Box>
                </Stack>
            </Box>
        </Flex>
    );
}

export default TenantCalendar;
