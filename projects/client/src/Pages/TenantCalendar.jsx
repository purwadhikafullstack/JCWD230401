import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar/Sidebar";


function TenantCalendar() {
  return (
    <Flex
    minH={'100vh'}
            // align={'center'}
            // justify={'center'}
            p={12}
    >
    <Box flex='1'>
<Sidebar />
    </Box>
    <Box w='full' flex='5' px='4'>
      <Fullcalendar
       w='full'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        />
    </Box>
    <Box p={12} flex='1'>

        <Stack spacing={12} align={'start'} mb={5}>
          <Box>
            <Text >All Rooms :</Text>
          </Box>
          <Box>
            <Text >Available Rooms :</Text>
          </Box>
          <Box>
            <Text >Fully Booked :</Text>
          </Box>
          </Stack>
    </Box>
        </Flex>
  );
}

export default TenantCalendar;