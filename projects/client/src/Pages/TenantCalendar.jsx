import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Flex, Stack, Text, UnorderedList, OrderedList, ListItem, Modal, Button, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar";
import { API_URL } from '../helper';
import axios from 'axios';

function TenantCalendar() {
  const [roomOrders, setRoomOrders] = useState([]);
  const [roomMaintenances, setRoomMaintenances] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);

  //1. axios booked and under maintenance
  const getRoomOrders = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      let response = await axios.post(`${API_URL}/calendar/room-orders`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoomOrders(response.data)
      // console.log("response getRoomOrders :", response.data); //testing purposes
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

  //3. Print room orders and under maintenances for calendar
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
    // console.log("printRoomMaintenances print: ", print);
    return print;
  };

  //4. Format calendar
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


  //1. axios available rooms
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
      console.log("response.data onBtnAvailableRooms :", response.data); //testing purposes
      setAvailableRooms(response.data);
    } catch (error) {
      console.log("ini error dari onBtnAvailableRooms :", error);
    }
  };

  //2. print available rooms
  console.log("ini isi dari availableRooms :", availableRooms); // testing for map 
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
    console.log("printAvailableRooms print: ", print);
    return print;
  }

  //3. Date Click calendar 
  const openModal = () => {
    setModalIsOpen(true);
  };

  const dateClick = async (e) => {
    const selectedDate = e.dateStr;
    setSelectedDate(selectedDate);
    onBtnAvailableRooms(selectedDate); //get the available rooms data from the server
    openModal();
    console.log("ini isi selectedDate: ", selectedDate);
  };

  //right side bar info
  const printThisMonthsBookings = () => {
    return roomOrders.map((val, idx) => {
      const { start_date, end_date, room } = val;
      const name = room ? room.room_category.name : "Room not available";
      const property = room && room.property ? room.property.property : "Property not available";
      const startDate = new Date(start_date).toLocaleDateString('id-ID');
      const endDate = new Date(end_date).toLocaleDateString('id-ID');
      if (!room) {
        return;
      }
      return (
        <ListItem key={idx} fontSize={'sm'}>
          {name}, {property} ({startDate} to {endDate})
        </ListItem>
      );
    });
  };
  const printThisMonthsMaintenances = () => {
    return roomMaintenances.map((val, idx) => {
      const { startDate, endDate, room } = val;
      const name = room ? room.room_category.name : "Room not available";
      const property = room && room.property ? room.property.property : "Property not available";
      const startDateFormat = new Date(startDate).toLocaleDateString('id-ID');
      const endDateFormat = new Date(endDate).toLocaleDateString('id-ID');
      if (!room) {
        return;
      }
      return (
        <ListItem key={idx} fontSize={'sm'}>
          {name}, {property} ({startDateFormat} to {endDateFormat})
        </ListItem>
      );
    });
  };

  return (
    <Flex
      minH={'100vh'}
      // align={'center'}
      // justify={'center'}
      // p={12}
    >
      <Box>
        <Sidebar />
      </Box>
      <Box w='full' flex='5' px='4' mt='10'>
        <Fullcalendar
          w='full'
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
          dayMaxEvents={2} // set the max number of events displayed per day to 1
          dateClick={dateClick}
        />
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Available Properties & Rooms on {selectedDate} :</ModalHeader>
            <ModalBody>
              <OrderedList>
                {printAvailableRooms().map((val, idx) => {
                  return (
                    <li key={idx}>
                      {val.property}: {val.name}, {val.price}, {val.capacity} adults, {val.description}</li>
                  );
                })}
              </OrderedList>
            </ModalBody>
            <ModalFooter>
              <Button color='white' bg='blue.500'
                _hover={{
                  bg: 'blue.600',
                }}
                onClick={() => {
                  setModalIsOpen(false);
                }} variant='solid'>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Box>
      <Box p={12} flex='1' >
        <Stack spacing={12} align={'start'} mb={5}>
          <Box>
            <Text fontWeight={'semibold'}>Bookings:</Text>
            <Box overflowY={'auto'} height='200px'>
              <UnorderedList mt='2'>
                {printThisMonthsBookings()}
              </UnorderedList>
            </Box>
          </Box>
          <Box>
            <Text fontWeight={'semibold'}>Under Maintenances:</Text>
            <Box overflowY={'auto'} height='200px'>
              <UnorderedList mt='2'>
                {printThisMonthsMaintenances()}
              </UnorderedList>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default TenantCalendar;