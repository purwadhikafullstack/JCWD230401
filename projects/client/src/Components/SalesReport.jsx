import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Flex,
    Text,
    Container,
    CardBody,
    Card,
    Input,
} from "@chakra-ui/react";
import MyChart from "./MyChart";
import { API_URL } from "../helper";

function SalesReport() {
    const today = new Date()
        .toLocaleString("sv", { timeZone: "Asia/Jakarta" })
        .split(" ")[0];

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [dataChart, setDataChart] = useState([]);
    const [income, setIncome] = useState(0);

    let totalincome = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(income);

    const getIncome = async () => {
        try {
            let get = await axios.get(
                `${API_URL}/report/income?start=${startDate}&end=${endDate}`
            );

            setIncome(get.data.income);
        } catch (error) {
            console.log(error);
        }
    };

    const getInfo = async () => {
        try {
            let get = await axios.get(`${API_URL}/report/chart`);
            setDataChart(get.data.data);
            console.log("getinfooo", get.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getIncome();
    }, [startDate, endDate]);

    useEffect(() => {
        getInfo();
    }, []);

    const shadowBox = { borderRadius: "10px", boxShadow: "1px 1px 5px gray" };

    return (
        <Container>
            <Box
                display="flex"
                flexDir={{ base: "column", md: "row", lg: "row" }}
                justifyContent={{
                    base: "flex-start",
                    md: "space-between",
                    lg: "space-between",
                }}
            >
                <Box
                    display={{ base: "block", md: "flex", lg: "flex" }}
                    flexDir="column"
                    justifyContent="center"
                    w={{ base: "100%", md: "2xl", lg: "2xl" }}
                >
                    <Card mt="4" w="full" style={shadowBox} borderRadius="2xl">
                        <CardBody>
                            <Box>
                                <Box
                                    display={{
                                        base: "block",
                                        md: "flex",
                                        lg: "flex",
                                    }}
                                    justifyContent={{
                                        base: "flex-start",
                                        md: "space-between",
                                        lg: "space-between",
                                    }}
                                    alignItems={{
                                        base: "flex-start",
                                        md: "center",
                                        lg: "center",
                                    }}
                                    flexDir={{
                                        base: "column",
                                        md: "row",
                                        lg: "row",
                                    }}
                                    py={{ base: "1", md: "1", lg: "1" }}
                                >
                                    <Text
                                        color="#D3212D"
                                        fontSize={{
                                            base: "3xl",
                                            md: "4xl",
                                            lg: "4xl",
                                        }}
                                        fontWeight="extrabold"
                                        w={{ base: "100%", md: "xl", lg: "xl" }}
                                        opacity="inherit"
                                    >
                                        My Balance
                                    </Text>

                                    <Flex flexDir={"column"}>
                                        <Flex>
                                            <Text
                                                fontSize={"12px"}
                                                letterSpacing={"tighter"}
                                            >
                                                *Choose a date / date range
                                            </Text>
                                        </Flex>
                                        <Flex
                                            ml={{
                                                base: "0",
                                                md: "auto",
                                                lg: "auto",
                                            }}
                                        >
                                            <Box display="flex" my="auto">
                                                <Input
                                                    type="date"
                                                    mr={{
                                                        base: "4px",
                                                        md: "3",
                                                    }}
                                                    mb={{ base: "0", md: "0" }}
                                                    width={{
                                                        base: "100%",
                                                        md: "auto",
                                                    }}
                                                    maxW={{
                                                        base: "150px",
                                                        md: "unset",
                                                    }}
                                                    onChange={(e) =>
                                                        setStartDate(
                                                            e.target.value
                                                        )
                                                    }
                                                    defaultValue={today}
                                                    focusBorderColor="#D3212D"
                                                    borderColor="#D3212D"
                                                    borderWidth="2px"
                                                    _placeholder={{
                                                        color: "#D3212D",
                                                    }}
                                                    letterSpacing={"tighter"}
                                                    fontWeight={"semibold"}
                                                    _hover={""}
                                                />
                                                <Input
                                                    type="date"
                                                    ml={{
                                                        base: "4px",
                                                        md: "3",
                                                    }}
                                                    width={{
                                                        base: "100%",
                                                        md: "auto",
                                                    }}
                                                    maxW={{
                                                        base: "150px",
                                                        md: "unset",
                                                    }}
                                                    onChange={(e) =>
                                                        setEndDate(
                                                            e.target.value
                                                        )
                                                    }
                                                    defaultValue={today}
                                                    focusBorderColor="#D3212D"
                                                    borderColor="#D3212D"
                                                    borderWidth="2px"
                                                    _placeholder={{
                                                        color: "#D3212D",
                                                    }}
                                                    letterSpacing={"tighter"}
                                                    fontWeight={"semibold"}
                                                    _hover={""}
                                                />
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </Box>

                                <Box
                                    fontSize={{
                                        base: "3xl",
                                        md: "5xl",
                                        lg: "5xl",
                                    }}
                                    fontWeight="bold"
                                    letterSpacing="tighter"
                                >
                                    {totalincome}
                                </Box>
                            </Box>
                        </CardBody>
                    </Card>

                    <Box
                        mt={{ base: "8", md: "8", lg: "8" }}
                        style={shadowBox}
                        borderRadius="2xl"
                    >
                        <MyChart datachart={dataChart} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default SalesReport;
