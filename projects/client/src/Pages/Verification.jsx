import React, { useState } from 'react';
import { Center, Heading } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../helper';
import axios from 'axios';

export default function Verification() {
  const params = useParams(); //to get token from email link for auth
  const navigate = useNavigate();
  const [pin, setPin] = useState(''); //verification code
  console.log("ini isi token dari params", params);

  const handlePinChange = (e, index) => {
    const newPin = [...pin];
    newPin[index] = e.target.value;
    setPin(newPin.join(''));
    console.log("isi pin joined :", newPin.join(''));
  }

  const onBtnVerify = async () => {
    try {
      let response = await axios.patch(`${API_URL}/user/verifyaccount`,
        {
          otp: pin
        }
        , {
          headers: {
            Authorization: `Bearer ${params.token}`
          }
        }
      );
      console.log("ini hasil response onbtnverify :", response); //testing purposes
      alert(response.data.message);
      navigate('/', { replace: true });
    } catch (error) {
      console.log("ini error dari onBtnVerify :", error);
      alert(error.response.data.message);
    }
  }

  // count function to limit 5 resend otp by date 
  const countDate = function() {
    const currentDate = new Date();
    const dateLocalStrg = localStorage.getItem("date");
    let count = 0;
    
    if (dateLocalStrg) {
    count = parseInt(localStorage.getItem("count"));
    } else {
    localStorage.setItem("date", currentDate.toISOString());
    localStorage.setItem("count", count);
    }
    
    count++;
    console.log("udah kirim ke berapa kali nya hari ini:", count); 
    localStorage.setItem("count", count);
    localStorage.setItem("date", currentDate.setDate(currentDate.getDate() + count));
    
    console.log("Current date:", dateLocalStrg);
    

    if (count === 5) {
      alert("account verification code can only be sent 5 times a day")
    }
    }

  //resend otp
  const onBtnSendVerifyEmail = async () => {
    try {
      const count = parseInt(localStorage.getItem("count"));
      if (count < 5) {
      let response = await axios.post(`${API_URL}/user/sendverificationemail`, {}, {
        headers: {
          Authorization: `Bearer ${params.token}`
        }
      }
      );
      console.log("ini hasil response onbtnSendVerifyEmail :", response); //testing purposes
      alert(response.data.message);
      // count the date up to 5 times
      countDate();
    } else {
      alert("account verification email can only be sent 5 times a day");
    }
    } catch (error) {
      // Check for token expiration
      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please log in again to get a new verification email.");
        navigate('/'); // Redirect the user to the login page
      } else {
        navigate('/transactionpage');
      }
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Account
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          align='center'
        >
          We have sent the verification code to your email
        </Center>

        <FormControl>
          <Center>
            <HStack>
              <PinInput>
                <PinInputField value={pin[0]} onChange={(e) => handlePinChange(e, 0)} />
                <PinInputField value={pin[1]} onChange={(e) => handlePinChange(e, 1)} />
                <PinInputField value={pin[2]} onChange={(e) => handlePinChange(e, 2)} />
                <PinInputField value={pin[3]} onChange={(e) => handlePinChange(e, 3)} />
              </PinInput>
            </HStack>
          </Center>
          <Center
            fontSize={{ base: 'xs', sm: 'sm' }}
            fontWeight="thin"
            my={2}
          >
            the code is valid for 24 hours
          </Center>
        </FormControl>
        <Stack spacing={2}>
          <Button
            bg={'#D3212D'}
            color={'white'}
            _hover={{
              bg: '#D3212D',
            }}
            type='button'
            onClick={onBtnVerify}
          >
            Verify
          </Button>
          <Button
            bg={'none'}
            color={'#D3212D'}
            variant='outline'
            _hover={{
              color: '#D3212D',
            }}
            borderColor={'#D3212D'}
            onClick={onBtnSendVerifyEmail}
          >
            Resend OTP
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
