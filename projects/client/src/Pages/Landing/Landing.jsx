import {
    Flex, Text, Box, Heading, Stack, Button, VStack, useBreakpointValue,
    Image, Input,
    List, ListItem
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../../helper';
import BannerImage from "./images/banner.png"
import DatePicker from 'react-datepicker';
import SpecialDeals from "./images/banner-1.png";
import TenantRegisterBanner from "./images/banner-2.png";
import Apartment1 from './images/image-s1.png';
import Hotels1 from './images/image-s3.png';
import Villas1 from './images/image-s4.png';
import Jakarta1 from './images/jakarta-1.jpg';
import Uluwatu1 from './images/uluwatu-1.jpg';
import Kuta1 from './images/kuta-1.jpg';
import Ubud1 from './images/ubud-1.jpg';
import Yogyakarta1 from './images/yogyakarta-1.jpg';
import RecommendPropertyCard from "../../Components/RecommendPropertyCard";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { loginActionGoogle } from "../../reducers/auth";


export default function LandingNew() {
    const navigate = useNavigate();
    //For Search Bar
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [inputCheckIn, setInputCheckIn] = useState('');
    const [inputCheckOut, setInputCheckOut] = useState('');
    const currentDate = new Date();
    const minDate = currentDate;
    const [duration, setDuration] = useState(0);
    const [guest, setGuest] = useState(0);
    //Location Search Bar
    const [inputLocation, setInputLocation] = useState('');
    const [showLocation, setShowLocation] = useState([]);
    const [recommendProperty, setRecommendProperty] = useState([]);
    const dispatch = useDispatch();


    //API to fetch search result (Location Search Bar)
    const onSearch = (searchTerm) => {
        setInputLocation(searchTerm); //if suggestion clicked, it will be put inside the input field
        // console.log("Ini adalah search : ", searchTerm);
    };

    const getAllLocations = async () => {
        try {
            let response = await axios.post(`${API_URL}/landing/all-location`, {
                name: showLocation
            })
            // console.log("ini response.data dari getAllLocations 🪶 : ", response.data[0].name);
            // console.log("ini response.data dari getAllLocations 🪶 : ", response.data);
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

    // Check in Check out Button
    const OnBtnCheckIn = () => {
        setInputCheckIn('date');
    };

    const OnBtnCheckOut = () => {
        setInputCheckOut('date');
    };

    // For Search Button
    const handleSearch = () => {
        navigate('/property', {
            state: {
                inputLocation: inputLocation,
                inputCheckIn: inputCheckIn,
                inputCheckOut: inputCheckOut,
                guest: guest
            }
        })
    };

    const getRecommendProperty = async () => {
        try {
            let response = await axios.get(`${API_URL}/landing/property-recommendation`);
            console.log("ini response dari getRecommendProperty :", response.data);
            setRecommendProperty(response.data);
        } catch (error) {
            console.log("ini error dari getRecommendProperty:", error);
        }
    };
    console.log("ini isi RecommendProperty:", recommendProperty);

    //kirim via props ke recommendpropertycard
    const printRecommendProperty = () => {
        return recommendProperty.map((val, idx) => {
            // capitalize 1st letter, lowercase rest
            const regency = val.room.property.property_location.regency.name
                .toLowerCase()
                .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
            return <RecommendPropertyCard
                property={val.room.property.property}
                uuid={val.room.property.uuid}
                picture={val.room.property.picture_properties[0]?.picture}
                rating={parseFloat(val.average_rating).toFixed(2)}
                regency={regency}
                country={val.room.property.property_location.country}
                price={Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val.room?.lowest_price)}
            />
        })
    };

    // Jalanin fungsi getRecommendProperty
    useEffect(() => {
        getRecommendProperty()
    }, []);

    //react-slick slider category
    const settingsCategory = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    //react-slick slider destinations
    const settingsDestinations = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    //react-slick slider property recommendation
    const settingsRecommendation = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    const googlelogin = async () => {
        try {
            let response = await axios.get(`${API_URL}/auth/login/success`, {
                withCredentials: true,
            });
            // console.log("ini respon.data.user dari googlelogin :", response.data.getuser[0]);
            // console.log("ini respon.data dari googlelogin :", response.data);
            const cookieValue = document.cookie;
            console.log("ini isi dari cookieValue :", cookieValue);
            console.log("tipe data cookieValue :", typeof cookieValue);
            // Find the index of the equals sign (=)
            var equalsIndex = cookieValue.indexOf("=");
            // Remove the substring starting from the equals sign
            var token = cookieValue.substring(equalsIndex + 1);
            console.log("ini token dari cookie google login:", token);
            //pengen set token di local storage
            localStorage.setItem("tempatku_login", token); 
            dispatch(loginActionGoogle(response.data));
        } catch (error) {
            console.log("error googlelogin: ", error);
        }
    };

    React.useEffect(() => {
        googlelogin();
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <>
            {/* BANNER */}
            <Box mb={{base:'40px',md:'80px'}}> 
                <Flex
                    w="full"
                    h={{ base: "80vh", lg: "100vh" }}
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
                            <Box bg="white" w={{ base: "80vw", md: "45vw", lg: "80vw" }} m="30px auto" p="6px 10px 6px 25px" borderRadius="10px" py={{base:'4', lg:'1.5'}}>
                                <Flex align={{ base: 'left', lg: 'center' }} justify={'space-between'} flexWrap={"wrap"} flexDirection={{ base: "column", lg: "row" }}>
                                    <Box
                                        flex="1.5"
                                        position="relative"
                                        py='1'
                                    >
                                        <Text fontWeight="600">Location</Text>
                                        <Input type="text" placeholder="Where are you going?" variant="none" height="22px" textAlign="left" ml='-4'
                                            onChange={(e) => setInputLocation(e.target.value)}
                                            value={inputLocation}
                                        />
                                        {/* DROP DOWN */}
                                        <Box position="absolute" top="100%" left="0%" bgColor={'white'} borderBottomLeftRadius={'lg'} borderBottomRightRadius={'lg'} zIndex={9999} cursor='pointer'>
                                            <List>
                                                {showLocation.filter(item => {
                                                    const searchTerm = inputLocation.toLowerCase(); //yg kita tulis di input location
                                                    const name = item.name.toLowerCase();  //dari backend name of regency
                                                    return (searchTerm && name.includes(searchTerm) && name !== searchTerm);
                                                }
                                                ).slice(0, 4) //will show only first 4 items di location input field
                                                    .map((item) =>
                                                    (<ListItem py='2' px='6'
                                                        onClick={() => onSearch(item.name
                                                            .toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()))}
                                                        className="dropdown-row"
                                                        key={item.id} // so each drop down has an unique identifier
                                                    >{item.name
                                                        .toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())}</ListItem>))}
                                            </List>
                                        </Box>
                                    </Box>
                                    <Box flex="1" py='1'>
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
                                    <Box flex="1" py='1'>
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
                                    <Box flex="1" py='1'>
                                        <Text fontWeight="600">Duration</Text>
                                        <Text>{duration} days</Text>
                                    </Box>
                                    <Box flex="1" py='1'>
                                        <Text fontWeight="600">Guest</Text>
                                        <Input type="text" variant="none" placeholder="Add Guest" height="22px" textAlign="left" ml='-4' onChange={(e) => setGuest(e.target.value)} />
                                    </Box>
                                    <Box py='1' align='center'>
                                        <Button type="button"
                                            onClick={handleSearch}
                                            _hover={{ bg: '#D3212D' }} bg="#D3212D" w="55px" h="55px" borderRadius="10%" border="0" outline="none" cursor="pointer">
                                            <SearchIcon color="white" />
                                        </Button>
                                    </Box>
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
                    minH={'sm'}
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
                            fontWeight="500"
                        >
                            HOLIDAY SALE
                        </Box>
                        <Heading
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="500"
                            lineHeight={{ base: "4xl", md: "5.3vw" }}
                            mt="10px"
                        >
                            <Text py={{base:'0',md:'2', lg:'0'}}>Special Offers</Text>
                            <Text py={{base:'0',md:'2', lg:'0'}}>For You</Text>
                        </Heading>
                    </Box>
                    <Box maxW={'xl'}>
                    <Text fontSize={{base:'sm', sm:'18px'}} mt="10px">
                    During our exclusive holiday sale, we are thrilled to present you with an array of special offers! Take advantage of this limited-time promotion, get the best prices on properties and rooms here.
                    </Text>
                    </Box>
                </Box>
                {/* PROPERTY TYPE */}
                <Heading fontSize={{ base: "2xl", md: "4xl" }}
                    fontWeight="700"
                    align='center'
                    textDecoration='underline'
                    style={{ textUnderlineOffset: '0.35em' }}
                >
                    Browse by Property Type
                </Heading>
                <Text fontWeight="700" align='center' mt="14px" fontSize={{base:'sm', lg:'md'}}>Enjoy your stay in our fine selection of properties</Text>
                <Box my={{ base: "40px", md: "80px" }} px={2}>
                    <Slider {...settingsCategory} prevArrow={<FaChevronLeft color="#E2E8F0" />} nextArrow={<FaChevronRight color="#E2E8F0" />}>
                        <Box p='2'>
                            <Link to={{
                                pathname: "/property/filter",
                                state: { category: "Hotel" }
                            }} >
                                <Box position="relative" overflow="hidden" borderRadius="10px" fontSize="18px"
                                    transition="opacity 0.3s"
                                    cursor='pointer'
                                >
                                    <Image src={Hotels1} _hover={{ transform: 'scale(1.1)', transition: '.5s' }}
                                        alt="Hotels" w="100%" borderRadius="10px" />
                                    <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" textAlign="center" color="white" fontSize={{ base: "26px", md: "20px", lg: "20px" }} fontWeight="500">
                                        HOTELS
                                    </Text>
                                </Box>
                            </Link>
                        </Box>
                        <Box p='2'>
                            <Link to={{
                                pathname: "/property/filter",
                                state: { category: "Apartment" }
                            }} >
                                <Box position="relative" overflow="hidden" borderRadius="10px" fontSize="18px"
                                    transition="opacity 0.3s"
                                    cursor='pointer'
                                >
                                    <Image src={Apartment1} _hover={{ transform: 'scale(1.1)', transition: '.5s' }}
                                        alt="Hotels" w="100%" borderRadius="10px" />
                                    <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" textAlign="center" color="white" fontSize={{ base: "26px", md: "20px", lg: "20px" }} fontWeight="500">
                                        APARTMENTS
                                    </Text>
                                </Box>
                            </Link>
                        </Box>
                        <Box p='2'>
                            <Link to={{
                                pathname: "/property/filter",
                                state: { category: "Villa" }
                            }} >
                                <Box position="relative" overflow="hidden" borderRadius="10px" fontSize="18px"
                                    transition="opacity 0.3s"
                                    cursor='pointer'
                                >
                                    <Image src={Villas1} _hover={{ transform: 'scale(1.1)', transition: '.5s' }}
                                        alt="Hotels" w="100%" borderRadius="10px" />
                                    <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" textAlign="center" color="white" fontSize={{ base: "26px", md: "20px", lg: "20px" }} fontWeight="500">
                                        VILLAS
                                    </Text>
                                </Box>
                            </Link>
                        </Box>
                    </Slider>
                </Box>
                {/* TOP DESTINATIONS */}
                <Heading fontSize={{ base: "2xl", md: "4xl" }}
                    fontWeight="700"
                    align='center'
                    textDecoration='underline'
                    style={{ textUnderlineOffset: '0.35em' }}
                >
                    Top Destinations
                </Heading>
                <Text fontWeight="700" align='center' mt="14px" fontSize={{base:'sm', lg:'md'}}>Discover our properties in big cities of Indonesia</Text>
                <Box my={{ base: "40px", md: "80px" }} px={2}>
                    <Slider {...settingsDestinations} prevArrow={<FaChevronLeft color="#E2E8F0" />} nextArrow={<FaChevronRight color="#E2E8F0" />}>
                        <Box p='2'>
                            <Link to={{
                                pathname: "/property/filter",
                                state: { inputLocation: "KOTA DENPASAR" }
                            }} >
                                <Box position="relative" textAlign="center" overflow="hidden" borderRadius="10px" cursor='pointer' boxShadow={'xs'}>
                                    <Image src={Kuta1} borderRadius="10px" _hover={{ transform: 'scale(1.1)', transition: '.5s' }} />
                                    <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color="#fff" fontSize={{ base: "26px", md: "20px", lg: "20px" }} fontWeight="500">
                                        DENPASAR
                                        </Text>
                                </Box>
                            </Link>
                        </Box>
                        <Box p='2'>
                            <Link to={{
                                pathname: "/property/filter",
                                state: { inputLocation: "KOTA JAKARTA" }
                            }} >
                                <Box position="relative" textAlign="center" overflow="hidden" borderRadius="10px" cursor='pointer' boxShadow={'xs'}>
                                    <Image src={Jakarta1} borderRadius="10px" _hover={{ transform: 'scale(1.1)', transition: '.5s' }} />
                                    <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color="#fff" fontSize={{ base: "26px", md: "20px", lg: "20px" }} fontWeight="500">
                                        JAKARTA
                                        </Text>
                                </Box>
                            </Link>
                        </Box>
                        <Box p='2'>
                            <Link to={{
                                pathname: "/property/filter",
                                state: { inputLocation: "KOTA BOGOR" }
                            }} >
                                <Box position="relative" textAlign="center" overflow="hidden" borderRadius="10px" cursor='pointer' boxShadow={'xs'}>
                                    <Image src={Uluwatu1} borderRadius="10px" _hover={{ transform: 'scale(1.1)', transition: '.5s' }} />
                                    <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color="#fff" fontSize={{ base: "26px", md: "20px", lg: "20px" }} fontWeight="500">
                                        BOGOR
                                        </Text>
                                </Box>
                            </Link>
                        </Box>
                        <Box p='2'>
                            <Link to={{
                                pathname: "/property/filter",
                                state: { inputLocation: "KOTA BANDUNG" }
                            }} >
                                <Box position="relative" textAlign="center" overflow="hidden" borderRadius="10px" cursor='pointer' boxShadow={'xs'}>
                                    <Image src={Ubud1} borderRadius="10px" _hover={{ transform: 'scale(1.1)', transition: '.5s' }} />
                                    <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color="#fff" fontSize={{ base: "26px", md: "20px", lg: "20px" }} fontWeight="500">
                                        BANDUNG
                                        </Text>
                                </Box>
                            </Link>
                        </Box>
                        <Box p='2'>
                            <Link to={{
                                pathname: "/property/filter",
                                state: { inputLocation: "KOTA YOGYAKARTA" }
                            }} >
                                <Box position="relative" textAlign="center" overflow="hidden" borderRadius="10px" cursor='pointer' boxShadow={'xs'}>
                                    <Image src={Yogyakarta1} borderRadius="10px" _hover={{ transform: 'scale(1.1)', transition: '.5s' }} />
                                    <Text position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color="#fff" fontSize={{ base: "26px", md: "20px", lg: "20px" }} fontWeight="500">
                                    YOGYAKARTA
                                        </Text>
                                </Box>
                            </Link>
                        </Box>
                    </Slider>
                </Box>
                {/* TENANT REGISTER BANNER */}
                <Box
                    bgGradient={`linear(to right, #3f2321, transparent), url(${TenantRegisterBanner})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    borderRadius="10px"
                    color="#fff"
                    padding="5%"
                    my={{ base: "40px", md: "80px" }}
                    minH={'sm'}
                >
                    <Box alignItems="center">
                        <Heading
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="500"
                            lineHeight={{ base: "4xl", md: "5.3vw" }}
                            mt="10px"
                        >
                            <Text py={{base:'0',md:'2', lg:'0'}}>Sharing</Text>
                            <Text py={{base:'0',md:'2', lg:'0'}}>Is Earning Now</Text>
                        </Heading>
                    </Box>
                    <Text fontSize={{base:'sm', sm:'18px'}} mt="10px">
                        Great opportunity to make money by sharing your extra space.
                    </Text>
                    <Button
                        bg="#D3212D"
                        borderRadius="8px"
                        color="#fff"
                        fontSize={{base:'sm', sm:'18px'}}
                        marginTop="30px"
                        _hover={{ bg: "#fff", color: "#D3212D" }}
                        p={{base:'3', sm:'6'}}
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
                    fontWeight="700"
                    align='center'
                    textDecoration='underline'
                    style={{ textUnderlineOffset: '0.35em' }}
                >
                    Recommended for You
                </Heading>
                <Text fontWeight="700" align='center' mt="14px" fontSize={{base:'sm', lg:'md'}}>Discover our properties with the best ratings</Text>
                <Box my={{ base: "40px", md: "80px" }} px={2}>
                    <Slider {...settingsRecommendation} prevArrow={<FaChevronLeft color="#E2E8F0" />} nextArrow={<FaChevronRight color="#E2E8F0" />}>
                        {printRecommendProperty()}
                    </Slider>
                    <Box align='center'>
                        <Button
                            bg="#D3212D"
                            borderRadius="8px"
                            bgColor="white"
                            fontSize={{base:'sm', sm:'18px'}}
                            marginTop="30px"
                            variant='outline'
                            borderWidth="1px"
                            color="#D3212D"
                            borderColor="#D3212D"
                            _hover={{ bg: "#D3212D", color: "white" }}
                            p={{base:'3', sm:'6'}}
                            textAlign='center'
                            onClick={() => navigate('/property')}
                        >
                            <Text>
                                See more properties
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}