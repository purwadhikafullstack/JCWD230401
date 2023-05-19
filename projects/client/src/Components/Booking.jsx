import React, { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper';
import axios from 'axios';
import { useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function Booking(props) {
    // Get current date
    const currentDate = new Date();
    // Set the minDate prop to the current date to disable yesterday and earlier dates
    const minDate = currentDate;

    console.log("date use location  CI", props.inputCheckIn)
    console.log("date use location CO", props.inputCheckOut)

    return (
        <>
            <Box
                rounded={'lg'}
                boxShadow={'lg'}
                p={8}
                w='450px'
                border='1px'
                borderColor={'gray.200'}
            >
                <Stack spacing={4}>
                    <HStack justifyContent={'space-between'} w='50%'>
                        <Box >
                            <FormControl id="checkin">
                                <FormLabel>Check in</FormLabel>
                                <Box border="1px"
                                    borderColor='gray.300'
                                    borderRadius="md"
                                    py="1"
                                    pl='4'
                                >
                                    <DatePicker
                                        selected={!props.inputCheckIn ? currentDate : new Date(props.inputCheckIn)}
                                        onChange={(date) => props.setInputCheckIn(new Date(date).toISOString().split('T')[0])}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Choose Date"
                                        minDate={minDate}
                                        shouldCloseOnSelect={false}
                                    />
                                </Box>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="checkout">
                                <FormLabel>Check out</FormLabel>
                                <Box border="1px"
                                    borderColor='gray.300'
                                    borderRadius="md"
                                    py="1" pl='4'>
                                    <DatePicker
                                        selected={!props.inputCheckOut ? new Date(currentDate).getTime() + 24 * 60 * 60 * 1000 : new Date(props.inputCheckOut)}
                                        onChange={(date) => props.setInputCheckOut(new Date(date).toISOString().split('T')[0])}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Choose Date"
                                        minDate={props.inputCheckIn ? new Date(new Date(props.inputCheckIn).getTime() + 24 * 60 * 60 * 1000) : undefined}
                                        shouldCloseOnSelect={false}
                                    />
                                </Box>
                            </FormControl>
                        </Box>
                    </HStack>
                    <FormControl id="guests">
                        <FormLabel>Guests</FormLabel>
                        <Input type="number" placeholder='number of guests' />
                    </FormControl>
                    <Stack pt={2}>
                        <Text align={'center'}>
                            You won't be charged yet
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}