import { Flex, Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerCalendar(props) {
    
    return <>
        <Flex gap='3'>
            <Box>
                <Text >Check In : <span style={{ fontWeight: 'bold' }}>{props.startDate?.toDateString()}</span></Text>
                <DatePicker
                    selected={props.startDate}
                    onChange={(date) => props.setStartDate(date)}
                    minDate={new Date()}
                    inline
                    />
            </Box>
            <Box>
                <Text >Check Out : <span style={{ fontWeight: 'bold' }}>{props.endDate?.toDateString()}</span></Text>
                <DatePicker
                    selected={props.endDate}
                    onChange={(date) => props.setEndDate(date)}
                    minDate={props.startDate}
                    inline
                />
            </Box>
        </Flex>

    </>
}
