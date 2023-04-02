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
  } from '@chakra-ui/react';
import React from 'react';
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper';
import axios from 'axios';

export default function Booking() {
  const navigate = useNavigate();

  const onBtnBooking = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      let response = await axios.post(`${API_URL}/user/sendverificationemail`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      console.log("ini hasil response onbtnbooking :", response); //testing purposes
      alert(response.data.message);
    } catch (error) {
      console.log("ini error dari onBtnBooking :", error);
      // alert(error.response.data.message); // not needed continue to transaction page immediately
      navigate('/transactionpage')
    }
  }
    return (
        <>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}
          w='400px'
          border='1px'
          borderColor={'gray.200'}
          >
          <Stack spacing={4}>
            <HStack justifyContent={'space-between'}>
              <Box>
                <FormControl id="checkin">
                  <FormLabel>Check in</FormLabel>
                  <Input type="date" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="checkout">
                  <FormLabel>Check out</FormLabel>
                  <Input type="date" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="guests">
              <FormLabel>Guests</FormLabel>
              <Input type="text" placeholder='number of guests' />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                bg={'#D3212D'}
                color={'white'}
                _hover={{
                  bg: '#D3212D',
                }}
                type='button'
                onClick={onBtnBooking}
                >
                Book now
              </Button>
            </Stack>
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