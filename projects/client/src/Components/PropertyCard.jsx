import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Flex,
    HStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { capitalizeFirstWord, formatRupiah } from "../helper";
import Carousel from "./Carousel";
import noimage from "../assets/noimage.png"

const IMAGE =
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";

export default function PropertyCard(props) {
    console.log("propsss location", props.location);
    return (
        <Center
            p="1"
        >
            <Link to={`/property/detail/${props.uuid}`}
                state={{ inputCheckIn: props.inputCheckIn, inputCheckOut: props.inputCheckOut }}
            >
                <Box
                    role={"group"}
                    px={{ base: "2", md: "2", lg: "2" }}
                    py={{ base: "2", md: "2", lg: "2" }}
                    maxW={{ base: "350px", md: "330px", lg: "330px" }}
                    w={"full"}
                    bg="white"
                    borderWidth={"1px"}
                    borderColor={{ base: "white", sm: "gray.300" }}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={0}
                    overflow='hidden'
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
                        <Text fontWeight={600} fontSize={{ base: "lg", lg: "sm" }} isTruncated
                            noOfLines={1}
                        >
                            {props.property}
                        </Text>
                        <Text fontWeight={"normal"} fontSize={{ base: "sm", lg: "xs" }} color="gray.500">
                            {capitalizeFirstWord(props.location)}, {props.country}
                        </Text>
                        <Flex justifyContent={"space-between"}>
                            <Text fontWeight={600} fontSize={{ base: "sm", lg: "xs" }} textAlign={"left"} display="flex">
                                {formatRupiah(props.price)}
                                <Text fontWeight={"normal"} pl="1" fontSize={{ base: "sm", lg: "xs" }}>
                                    / night
                                </Text>
                            </Text>
                            <Flex alignItems={"center"} justifyContent="center">
                                <Box>
                                    <StarIcon color={"yellow.500"} fontSize={{ base: "lg", lg: "sm" }} mb="1" />
                                </Box>
                                <Text fontWeight={600} fontSize={{ base: "lg", lg: "sm" }} textAlign="right" ml="1">
                                    {props.rating ? (parseFloat(props.rating).toFixed(1)) : (<Text>No Rating</Text>)}
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Link>
        </Center>
    );
}