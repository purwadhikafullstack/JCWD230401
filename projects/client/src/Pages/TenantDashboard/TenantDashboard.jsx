import "./TenantDashboard.css";
import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Flex, Stack, Text, OrderedList, Heading, Modal, Button, ModalOverlay, ModalContent, Card, CardHeader, CardBody, ModalHeader, ModalBody, ModalFooter, StackDivider } from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar";
import { API_URL } from '../../helper';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CalendarPropertyCard from "../../Components/CalendarPropertyCard";

function TenantDashboard() {
  const name = useSelector((state) => state.authReducer.name);
  const [roomOrders, setRoomOrders] = useState([]);
  const [roomMaintenances, setRoomMaintenances] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formatSelectedDate, setFormatSelectedDate] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [propertyListing, setPropertyListing] = useState([]);

  //get booked and under maintenance rooms
  const getRoomOrders = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      let response = await axios.post(`${API_URL}/calendar/room-orders`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoomOrders(response.data)
    } catch (error) {
      console.log("ini error dari getRoomOrders :", error);
    }
  };

  const getRoomMaintenances = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      let response = await axios.post(`${API_URL}/calendar/room-maintenances`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoomMaintenances(response.data)
    } catch (error) {
      console.log("ini error dari getRoomMaintenances :", error);
    }
  };

  React.useEffect(() => {
    getRoomOrders();
  }, []);

  React.useEffect(() => {
    getRoomMaintenances();
  }, []);

  //Print room orders and under maintenances for calendar
  const printRoomOrders = () => {
    let print = roomOrders.map((val, idx) => {
      const { start_date, end_date, room } = val;
      const name = room ? room.room_category.name : "Room not available";
      const property = room && room.property ? room.property.property : "Property not available";
      if (!room) {
        return null;
      }
      return { start_date, end_date, name: name, property: property };
    });
    return print;
  };
  const printRoomMaintenances = () => {
    let print = roomMaintenances.map((val, idx) => {
      const { startDate, endDate, room } = val;
      const name = room ? room.room_category.name : "Room not available";
      const property = room && room.property ? room.property.property : "Property not available";
      if (!room) {
        return null;
      }
      return { startDate, endDate, name: name, property: property };
    });
    return print;
  };

  // Format calendar events
  const roomEvents1 = printRoomOrders().filter(val => val !== null).map((val) => {
    const startDate = new Date(val.start_date);
    const endDate = new Date(val.end_date);
    endDate.setDate(endDate.getDate() + 1);

    return {
      title: `${val.property}: ${val.name} booked`,
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
    }
  });

  const roomEvents2 = printRoomMaintenances().filter(val => val !== null).map((val) => {
    const startDate = new Date(val.startDate);
    const endDate = new Date(val.endDate);
    endDate.setDate(endDate.getDate() + 1);

    return {
      title: `${val.property}: ${val.name} under maintenance`,
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
    }
  });

  const roomEvents = [...roomEvents1, ...roomEvents2];


  //get available rooms
  const onBtnAvailableRooms = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      let response = await axios.post(`${API_URL}/calendar/available-rooms`, {
        date: selectedDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailableRooms(response.data);
    } catch (error) {
      console.log("ini error dari onBtnAvailableRooms :", error);
    }
  };

  const printAvailableRooms = () => {
    let print = availableRooms.map((val, idx) => {
      return {
        property: val.property.property,
        name: val.room_category.name,
        description: val.description,
        price: Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val.price),
        capacity: val.capacity,
      };
    });
    return print;
  }

  const dateClick = async (e) => {
    const selectedDate = e.dateStr;
    const date = new Date(selectedDate);
    const formatSelectedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`; //DD-MM-YYYY
    setFormatSelectedDate(formatSelectedDate);
    setSelectedDate(selectedDate);
    openModal();
  };
  
  React.useEffect(() => {
    onBtnAvailableRooms();
  }, [selectedDate]);
  
  // Date Click calendar 
  const openModal = () => {
    setModalIsOpen(true);
  };


  //get property listings
  const getMyProperty = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      let response = await axios.get(`${API_URL}/calendar/property-listing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("ini response getmyproperty :", response.data);
      setPropertyListing(response.data);
    } catch (error) {
      console.log("ini error dari getmyproperty:", error);
    }
  };

  const printMyProperty = () => {
    return propertyListing.map((val, idx) => {
      const regency = val.property_location?.regency.name
        .toLowerCase()
        .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
      const rating = parseFloat(val.rooms[0]?.reviews[0]?.average_rating);
      const averageRating = isNaN(rating) ? "No Ratings" : rating.toFixed(2);
      return <CalendarPropertyCard
        uuid={val.uuid}
        property={val.property}
        picture={val.picture_properties[0]?.picture}
        regency={regency}
        country={val.property_location?.country}
        price={Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val.rooms[0]?.lowest_price)}
        rating={averageRating}
      />
    })
  };
 
  React.useEffect(() => {
    getMyProperty();
  }, []);

  //react-slick slider property listing
  const numberOfProperties = propertyListing.length;
  let slidesToShowValue = 3;
  if (numberOfProperties === 1) {
    slidesToShowValue = 1;
  } else if (numberOfProperties === 2) {
    slidesToShowValue = 2;
  };
  const settingsMyProperty = {
    infinite: true,
    slidesToShow: slidesToShowValue,
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

  return (
    <Flex
      minH={'100vh'}
      px={2}
    >
      <Box>
        <Sidebar />
      </Box>
      <Box w='50vw' flex='5' px={{ base: '4', sm: '10' }} bg={'white'} >
        <br />
        <Heading mb={{ base: '8', sm: '10' }} textAlign={{ base: 'center', sm: 'left' }} >
          Welcome, {name} 👋
        </Heading>
        <Box p={{ base: '2', sm: '10' }} bg={'white'} rounded={'xl'} borderWidth={'1px'}
          borderColor={{ base: 'white', sm: 'gray.300' }}
        >
          {/* MY PROPERTY */}
          <Box>
            <Text fontSize={{ base: '20', sm: '28' }} fontWeight={'semibold'} mb={{ base: '6', sm: '10' }} textAlign={{ base: 'center', sm: 'left' }}>Your Property Listings</Text>
            {propertyListing.length === 0 ? (
              <Text>No property listings yet</Text>
            ) : (
              <Slider {...settingsMyProperty} prevArrow={<FaChevronLeft color="#E2E8F0" />} nextArrow={<FaChevronRight color="#E2E8F0" />}>
                {printMyProperty()}
              </Slider>
            )}
          </Box>
        </Box>
        <br />
        <Box p={{ base: '2', sm: '10' }} bg={'white'} rounded={'xl'} borderWidth={'1px'}
          borderColor={{ base: 'white', sm: 'gray.300' }}
        >
          <Text fontSize={{ base: '20', sm: '28' }} fontWeight={'semibold'} mb={{ base: '6', sm: '10' }} textAlign={{ base: 'center', sm: 'left' }}>See Availability by Calendar Date</Text>
          <Fullcalendar
            className="my-calendar"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height={"90vh"}
            events=
            {roomEvents}
            dayMaxEvents={2} // max number of events displayed per day
            dateClick={dateClick}
          />
          <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} scrollBehavior={'inside'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontWeight={'semibold'}>
                <Text fontSize={'xl'} px='4' pt='4'>
                  Available Properties & Rooms
                </Text>
                <Text fontSize={'xl'} px='4'>
                  {formatSelectedDate} :
                </Text>
              </ModalHeader>
              <ModalBody>
                <OrderedList p='4' m='auto'>
                  {printAvailableRooms().map((val, idx) => {
                    return (
                      <Card mb='2' borderColor={'gray.300'} borderWidth={'1px'} boxShadow={'none'}>
                        <CardHeader>
                          <Heading size='md'>{val.property}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                              <Heading size='xs' textTransform='uppercase'>
                                Room Name
                              </Heading>
                              <Text pt='2' fontSize='sm'>
                                {val.name}
                              </Text>
                            </Box>
                            <Box>
                              <Heading size='xs' textTransform='uppercase'>
                                Price
                              </Heading>
                              <Text pt='2' fontSize='sm'>
                                {val.price}
                              </Text>
                            </Box>
                            <Box>
                              <Heading size='xs' textTransform='uppercase'>
                                Capacity
                              </Heading>
                              <Text pt='2' fontSize='sm'>
                                {val.capacity} adults
                              </Text>
                            </Box>
                            <Box>
                              <Heading size='xs' textTransform='uppercase'>
                                Description
                              </Heading>
                              <Text pt='2' fontSize='sm'>
                                {val.description}
                              </Text>
                            </Box>
                          </Stack>
                        </CardBody>
                      </Card>
                    );
                  })}
                </OrderedList>
              </ModalBody>
              <ModalFooter>
                <Button color='white' bg='#D3212D'
                  _hover={{
                    bg: '#D3212D',
                  }}
                  onClick={() => {
                    setModalIsOpen(false);
                  }} variant='solid'
                  _active={{
                    bg: '#D3212D',
                    transform: 'scale(0.98)',
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <br />
      </Box>
    </Flex>
  );
}

export default TenantDashboard;