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
import React from 'react';
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper';
import axios from 'axios';
import { useSelector } from "react-redux";
//moved from Booking component TPK-9


export default function BookingButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const isVerified = useSelector((state) => state.authReducer.isVerified);

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
    alert("Maximum amount reached. account verification code can only be sent 5 times a day.")
  }
  }

  //inside modal alert cannot continue to transaction page
  const onBtnSendVerifyEmail = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      const count = parseInt(localStorage.getItem("count"));
      if (count < 5) {
      let response = await axios.post(`${API_URL}/user/sendverificationemail`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
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
    <>
      {
        //if user isverified false
        !isVerified ?
          <>
            <Button
              loadingText="Submitting"
              bg={'#D3212D'}
              color={'white'}
              _hover={{
                bg: '#D3212D',
              }}
              type='button'
              onClick={onOpen}
            >
              Book now
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Please verify your account!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <p>You need to verify your email address before you can make a booking.
                    Click the button below an we will send you an email to verify your account</p>
                  <br />
                  <Button
                    loadingText="Submitting"
                    bg={'#D3212D'}
                    color={'white'}
                    _hover={{
                      bg: '#D3212D',
                    }}
                    type='button'
                    onClick={onBtnSendVerifyEmail}
                    w='full'
                  >
                    Resend Verification Email
                  </Button>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          :
          //if isverified true
          <>
            <Button
              loadingText="Submitting"
              bg={'#D3212D'}
              color={'white'}
              _hover={{
                bg: '#D3212D',
              }}
              type='button'
              onClick={() => navigate('/transactionpage')}
            >
              Book now
            </Button>
          </>
      }
    </>
  )
}