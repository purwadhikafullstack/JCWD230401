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


export default function Booking() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const isVerified = useSelector((state) => state.authReducer.isVerified);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  // Get current date
  const currentDate = new Date();
  // Set the minDate prop to the current date to disable yesterday and earlier dates
  const minDate = currentDate;

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
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    dateFormat="dd/MM/yyyy"
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
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Choose Date"
                    minDate={checkInDate ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000) : undefined}
                    shouldCloseOnSelect={false}
                  />
                </Box>
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="guests">
            <FormLabel>Guests</FormLabel>
            <Input type="text" placeholder='number of guests' />
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