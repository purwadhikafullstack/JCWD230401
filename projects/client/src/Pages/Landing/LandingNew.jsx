import {
    Flex, Text, Box, Heading, Link, Stack, Button, VStack, useBreakpointValue,
    InputGroup, InputLeftElement, Image, Input, Menu, MenuButton, MenuList, MenuItem, SimpleGrid, Select,
    Grid, GridItem
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Footer from '../../Components/Footer';
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import BannerImage from "./images/banner.png"
import DatePicker from 'react-datepicker';
import SpecialDeals from "./images/banner-1.png";
import TenantRegisterBanner from "./images/banner-2.png";
import Homestays1 from './images/image-s1.png';
import Apartments1 from './images/image-s2.png';
import Hotels1 from './images/image-s3.png';
import Villas1 from './images/image-s4.png';
import Resorts1 from './images/image-s5.png';
import GuestHouse1 from './images/image-s6.png';
import Jakarta1 from './images/jakarta-1.jpg';
import Canggu1 from './images/canggu-1.jpg';
import Uluwatu1 from './images/uluwatu-1.jpg';
import Kuta1 from './images/kuta-1.jpg';
import Ubud1 from './images/ubud-1.jpg';
import Bandung1 from './images/bandung-1.jpg';
import Bali1 from './images/bali-1.png';
import NusaPenida1 from './images/nusapenida-1.png';
import RecommendPropertyCard from "../../Components/RecommendPropertyCard";


export default function LandingNew() {
    const navigate = useNavigate();
    //For Search Bar
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const currentDate = new Date();
    const minDate = currentDate;
    const [duration, setDuration] = useState(0);
    const [guest, setGuest] = useState(0);

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

    console.log("ini isi guest search input:", guest);

    return (
        <>
            {/* BANNER */}
            <Box>
                <Flex
                    w="full"
                    h="100vh"
                    backgroundImage={BannerImage}
                    backgroundSize="cover"
                    backgroundPosition={"center center"}
                >
                    <VStack
                        w={'full'}
                        justify={'center'}
                        px={useBreakpointValue({ base: 4, md: 8 })}
                        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                        <Stack maxW={'5xl'} align={'center'} spacing={6}>
                            <Text
                                color={'white'}
                                fontWeight={400}
                                lineHeight={1.2}
                                fontSize={useBreakpointValue({ base: '3xl', md: "55px" })}>
                                Find Your Next Stay
                            </Text>
                            {/* SEARCH BAR */}
                            <Box bg="white" w="75vw" m="30px auto" p="6px 10px 6px 30px" borderRadius="10px">
                                <Flex align={'center'} justify={'space-between'} flexWrap="wrap">
                                    <Box
                                        flex="1.5"
                                    >
                                        <Text fontWeight="600">Location</Text>
                                        <Input type="text" placeholder="Where are you going?" variant="none" height="22px" textAlign="left" ml='-4' />
                                    </Box>
                                    <Box flex="1">
                                        <Text fontWeight="600">Check in</Text>
                                        <DatePicker
                                            selected={checkInDate}
                                            onChange={(date) => setCheckInDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Choose Date"
                                            minDate={minDate}
                                            shouldCloseOnSelect={false}
                                        />
                                    </Box>
                                    <Box flex="1">
                                        <Text fontWeight="600">Check out</Text>
                                        <DatePicker
                                            selected={checkOutDate}
                                            onChange={(date) => setCheckOutDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Choose Date"
                                            minDate={checkInDate ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000) : minDate}
                                            shouldCloseOnSelect={false}
                                        />
                                    </Box>
                                    <Box flex="1">
                                        <Text fontWeight="600">Duration</Text>
                                        <Text>{duration} days</Text>
                                    </Box>
                                    <Box flex="1">
                                        <Text fontWeight="600">Guest</Text>
                                        <Input type="text" variant="none" placeholder="Add Guest" height="22px" textAlign="left" ml='-4' onChange={(e) => setGuest(e.target.value)} />
                                    </Box>
                                    <Button type="button" _hover={{ bg: '#D3212D' }} bg="#D3212D" w="55px" h="55px" borderRadius="10%" border="0" outline="none" cursor="pointer">
                                        <SearchIcon color="white" />
                                    </Button>
                                </Flex>
                            </Box>
                        </Stack>
                    </VStack>

                </Flex>
            </Box>
            <Box px="7%">
                {/* SPECIAL DEALS */}
                <Box
                    bgGradient={`linear(to right, #1a6196, transparent), url(${SpecialDeals})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    borderRadius="10px"
                    color="#fff"
                    padding="5%"
                    my={{ base: "40px", md: "80px" }}
                >
                    <Box alignItems="center">
                        <Box
                            bg="#D3212D"
                            borderRadius="8px"
                            color="#fff"
                            display="inline-block"
                            fontSize="18px"
                            marginRight="20px"
                            padding="6px 30px"
                        >
                            HOLIDAY SALE
                        </Box>
                        <Heading
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="500"
                            lineHeight={{ base: "4xl", md: "5.3vw" }}
                            mt="10px"
                        >
                            Special Offers
                        </Heading>
                    </Box>
                    <Text fontSize="18px" mt="10px">
                        Get the best prices on properties and rooms.
                    </Text>
                    <Button
                        bg="none"
                        border="2px solid #fff"
                        borderRadius="8px"
                        color="#fff"
                        fontSize="18px"
                        marginTop="30px"
                        textDecoration="none"
                        _hover={{ bg: "#fff", color: "#1a6196" }}
                        p='6'
                        textAlign='center'
                    >
                        <Text>
                            See Deals
                        </Text>
                    </Button>
                </Box>
                {/* PROPERTY TYPE */}
                <Heading fontSize={{ base: "2xl", md: "4xl" }}
                    fontWeight="500"
                    align='center'
                    textDecoration='underline'
                    style={{ textUnderlineOffset: '0.35em' }}
                >
                    Browse by property type
                </Heading>
                <Box my={{ base: "40px", md: "80px" }} overflowX={'auto'}>
                    <SimpleGrid columns={{ base: 3, md: 3 }} spacing={{ base: 5, lg: 8 }} >
                        <Box position="relative" overflow="hidden" borderRadius="10px" fontSize="18px"
                            transition="opacity 0.3s"
                            _hover={{ opacity: 0.7 }}
                        >
                            <Image src={Hotels1}
                                alt="Hotels" w="100%" borderRadius="10px" />
                            <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" textAlign="center" color="white" fontSize={{ base: "15px", md: "20px", lg: "26px" }}>
                                Hotels
                            </Text>
                        </Box>

                        <Box position="relative" overflow="hidden" borderRadius="10px" fontSize="18px"
                            transition="opacity 0.3s"
                            _hover={{ opacity: 0.7 }}
                        >
                            <Image src={Homestays1}
                                alt="Hotels" w="100%" borderRadius="10px" />
                            <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" textAlign="center" color="white" fontSize={{ base: "15px", md: "20px", lg: "26px" }}>
                                Apartments
                            </Text>
                        </Box>
                        <Box position="relative" overflow="hidden" borderRadius="10px" fontSize="18px"
                            transition="opacity 0.3s"
                            _hover={{ opacity: 0.7 }}
                        >
                            <Image src={GuestHouse1}
                                alt="Hotels" w="100%" borderRadius="10px" />
                            <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" textAlign="center" color="white" fontSize={{ base: "15px", md: "20px", lg: "26px" }}>
                                Villas
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>
                {/* TOP DESTINATIONS */}
                <Heading fontSize={{ base: "2xl", md: "4xl" }}
                    fontWeight="500"
                    align='center'
                    textDecoration='underline'
                    style={{ textUnderlineOffset: '0.35em' }}
                >
                    Top Destinations
                </Heading>
                <Box my={{ base: "40px", md: "80px" }}>
                    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }} >
                        <Box position="relative" textAlign="center" overflow="hidden" borderRadius="10px">
                            <Image src={Kuta1} borderRadius="10px" _hover={{ transform: 'scale(1.1)', transition: '.5s' }} />
                            <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color="#fff" fontSize={{ base: "26px", md: "20px", lg: "26px" }}>Kuta</Text>
                        </Box>
                        <Box position="relative" textAlign="center" overflow="hidden" borderRadius="10px">
                            <Image src={Jakarta1} borderRadius="10px" _hover={{ transform: 'scale(1.1)', transition: '.5s' }} />
                            <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color="#fff" fontSize={{ base: "26px", md: "20px", lg: "26px" }}>Jakarta</Text>
                        </Box>
                        <Box position="relative" textAlign="center" overflow="hidden" borderRadius="10px">
                            <Image src={Uluwatu1} borderRadius="10px" _hover={{ transform: 'scale(1.1)', transition: '.5s' }} />
                            <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color="#fff" fontSize={{ base: "26px", md: "20px", lg: "26px" }}>Uluwatu</Text>
                        </Box>
                        <Box position="relative" textAlign="center" overflow="hidden" borderRadius="10px">
                            <Image src={Ubud1} borderRadius="10px" _hover={{ transform: 'scale(1.1)', transition: '.5s' }} />
                            <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color="#fff" fontSize={{ base: "26px", md: "20px", lg: "26px" }}>Ubud</Text>
                        </Box>
                    </SimpleGrid>
                </Box>
                {/* SPECIAL DEALS */}
                <Box
                    bgGradient={`linear(to right, #3f2321, transparent), url(${TenantRegisterBanner})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    borderRadius="10px"
                    color="#fff"
                    padding="5%"
                    my={{ base: "40px", md: "80px" }}
                >
                    <Box alignItems="center">
                        <Heading
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="500"
                            lineHeight={{ base: "4xl", md: "5.3vw" }}
                            mt="10px"
                        >
                            Sharing<br />Is Earning Now
                        </Heading>
                    </Box>
                    <Text fontSize="18px" mt="10px">
                        Great opportunity to make money by sharing your extra space.
                    </Text>
                    <Button
                        bg="#D3212D"
                        borderRadius="8px"
                        color="#fff"
                        fontSize="18px"
                        marginTop="30px"
                        _hover={{ bg: "#fff", color: "#D3212D" }}
                        p='6'
                        textAlign='center'
                        onClick={() => navigate('/tenantregister')}
                    >
                        <Text>
                            Become a Tenant
                        </Text>
                    </Button>
                </Box>
                {/* PROPERTY RECOMMENDATIONS */}
                <Heading fontSize={{ base: "2xl", md: "4xl" }}
                    fontWeight="500"
                    align='center'
                    textDecoration='underline'
                    style={{ textUnderlineOffset: '0.35em' }}
                >
                    Recommended for you
                </Heading>
                <Box my={{ base: "40px", md: "80px" }}>
                    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 1 }} >
                        <RecommendPropertyCard />
                        <RecommendPropertyCard />
                        <RecommendPropertyCard />
                        <RecommendPropertyCard />
                    </SimpleGrid>
                </Box>
            </Box>
            {/* FOOTER */}
            <Box
                bottom="0"
                left="0"
                right="0">
                <Footer />
            </Box>
        </>
    )
}