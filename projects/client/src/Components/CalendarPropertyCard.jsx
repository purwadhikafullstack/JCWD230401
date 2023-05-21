import React from "react";
import {
    Box,
    Center,
    Text,
    Image, Flex
} from "@chakra-ui/react";
import axios from "axios";
import { StarIcon } from "@chakra-ui/icons";
import noimage from "../assets/noimage.png";
import { Link } from "react-router-dom";

export default function CalendarPropertyCard(props) {

    return (
        <Center
            p="1"
        >
            <Link to="#">
                <Box
                    role={"group"}
                    px={{ base: "2", md: "2", lg: "2" }}
                    py={{ base: "2", md: "2", lg: "2" }}
                    maxW={{ base: "350px", md: "330px", lg: "330px" }}
                    w={"full"}
                    bg="white"
                    borderWidth={"1px"}
                    borderColor={{base:"white", sm:"gray.300"}}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={0}
                >
                    <Box
                        rounded={"lg"}
                        pos={"relative"}
                        height={"230px"}
                    >
                        <Image
                            rounded={"lg"}
                            height={{ base: "300px", lg: "230px" }}
                            objectFit={"cover"}
                            src={!props.picture ? noimage : `${process.env.REACT_APP_API_IMG_URL}${props.picture}`}
                            aspectRatio={1}
                        />
                    </Box>
                    <Box
                        pt={{ base: "20", lg: "2" }}
                        px="2"
                        align={"start"}
                    >
                        <Text fontWeight={600} fontSize={{ base: "lg", lg: "sm" }} isTruncated>
                            {props.property}
                        </Text>
                        <Text fontWeight={"normal"} fontSize={{base:"sm", lg:"xs"}} color="gray.500">
                            {props.regency}, {props.country}
                        </Text>
                        <Flex justifyContent={"space-between"}>
                            <Text fontWeight={600} fontSize={{base:"sm", lg:"xs"}} textAlign={"left"} display="flex">
                                {props.price}
                                <Text fontWeight={"normal"} pl="1" fontSize={{base:"sm", lg:"xs"}}>
                                    / night
                                </Text>
                            </Text>
                        </Flex>
                            <Flex alignItems={"center"} justifyContent="flex-start">
                                <Box>
                                    <StarIcon color={"yellow.500"} fontSize={{ base: "lg", lg: "sm" }} mb="1" />
                                </Box>
                                <Text fontWeight={600} fontSize={{ base: "lg", lg: "sm" }} textAlign="right" ml="1">
                                    {props.rating}
                                </Text>
                            </Flex>
                    </Box>
                </Box>
            </Link>
        </Center>
    );
}
