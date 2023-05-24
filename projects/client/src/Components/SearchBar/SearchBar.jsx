import {
    Flex, Text, Box, Heading, Stack, Button, VStack, useBreakpointValue,
    Image, Input,
    List, ListItem
} from "@chakra-ui/react";
import './SearchBar.css'
import React, { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import { API_URL } from "../../helper";
import DatePicker from "react-datepicker";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import moment from "moment";

export default function SearchBar(props) {
    const navigate = useNavigate();
    const checkIn = new Date(props?.stateUseLocation?.inputCheckIn)
    // checkIn.setDate(checkIn.getDate() + 1)
    checkIn.setHours(0, 0, 0, 0);
    const checkOut = new Date(props?.stateUseLocation?.inputCheckOut)
    // checkOut.setDate(checkOut.getDate() + 1)
    checkOut.setHours(0, 0, 0, 0);

    console.log("CheckInnn", checkIn);
    console.log("CheckOuttt", checkOut);
    //For Search Bar
    const [checkInDate, setCheckInDate] = useState(props?.stateUseLocation?.inputCheckIn === "1970-01-01" ? null : checkIn);
    const [checkOutDate, setCheckOutDate] = useState(props?.stateUseLocation?.inputCheckOut === "1970-01-01" ? null : checkOut);
    const currentDate = new Date();
    const minDate = currentDate;
    const [duration, setDuration] = useState(0);
    const [guest, setGuest] = useState(props.guest);
    //Location Search Bar
    const [inputLocation, setInputLocation] = useState("");
    const [showLocation, setShowLocation] = useState([]);
    const [recommendProperty, setRecommendProperty] = useState([]);
    const dispatch = useDispatch();



    //fetch search result (Location Search Bar)
    const onSearch = (searchTerm) => {
        setInputLocation(searchTerm); //if suggestion clicked, it will be put inside the input field
    };

    const getAllLocations = async () => {
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/landing/all-location`, {
                name: showLocation
            })
            setShowLocation(response.data);
        } catch (error) {
            console.log("ini error dari getAllLocations:", error);
        }
    };

    // Jalanin fungsi getAllLocations
    React.useEffect(() => {
        getAllLocations()
    }, []);

    // Get duration from check out - check in 
    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const durationMillisecond = checkOutDate.getTime() - checkInDate.getTime();
            const durationDays = Math.round(durationMillisecond / (24 * 60 * 60 * 1000));
            setDuration(durationDays);
        } else {
            setDuration(0);
        }
    }, [checkInDate, checkOutDate]);

    // For Searchbar Button 
    const handleSearch = () => {
        props.getAllProperty();
    };

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {/* SEARCH BAR */}
            <Box bg="white" borderWidth={"1px"}
                borderColor={{ base: "gray.300" }} w={{ base: "80vw", md: "45vw", lg: "80vw" }} m="30px auto" p="6px 10px 6px 25px" borderRadius="10px" py={{ base: "4", lg: "1.5" }}>
                <Flex align={{ base: "left", lg: "center" }} justify={"space-between"} flexWrap={"wrap"} flexDirection={{ base: "column", lg: "row" }}>
                    <Box
                        flex="1.5"
                        position="relative"
                        py="1"
                    >
                        <Text fontWeight="600">Property</Text>
                        <Input type="text" placeholder="Search property name" variant="none" height="22px" textAlign="left" ml="-4"
                            onChange={(e) => props.setProductName(e.target.value)}
                        />
                    </Box>
                    <Box
                        flex="1.5"
                        position="relative"
                        py="1"
                    >
                        <Text fontWeight="600">Location</Text>
                        <Input type="text" placeholder="Where are you going?" variant="none" height="22px" textAlign="left" ml="-4"
                            onChange={(e) => props.setCity(e.target.value)}
                            defaultValue={props?.stateUseLocation?.inputLocation}
                        />
                    </Box>
                    <Box flex="1" py={{ base: "4", sm: "1" }}>
                        <Text fontWeight="600">Check in</Text>
                        <DatePicker
                            selected={checkInDate}
                            onChange={(date) => {
                                setCheckInDate(date)
                                let tgl = moment(date)
                                props.setInputCheckIn(tgl.format().split('T')[0])
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Choose Date"
                            minDate={minDate}
                            shouldCloseOnSelect={false}
                        />
                    </Box>
                    <Box flex="1" py="1">
                        <Text fontWeight="600">Check out</Text>
                        <DatePicker
                            selected={checkOutDate}
                            onChange={(date) => {
                                setCheckOutDate(date)
                                let tgl = moment(date)
                                props.setInputCheckOut(tgl.format().split('T')[0])
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Choose Date"
                            minDate={checkInDate ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000) : minDate}
                            shouldCloseOnSelect={false}
                        />
                    </Box>
                    <Box flex="1" py="1">
                        <Text fontWeight="600">Guest</Text>
                        <Input type="text" variant="none" placeholder="Add Guest" height="22px" textAlign="left" ml="-4"
                            onChange={(e) => props.setGuest(e.target.value)}
                            defaultValue={props?.stateUseLocation?.guest} />
                    </Box>
                    <Box py="1" align="center">
                        <Button type="button"
                            onClick={handleSearch}
                            isLoading={props.loadingButton}
                            _hover={{ bg: "#D3212D" }} bg="#D3212D" w="55px" h="55px" borderRadius="10%" border="0" outline="none" cursor="pointer">
                            <SearchIcon color="white" />
                        </Button>
                    </Box>
                </Flex>
            </Box>

        </>
    )
}
