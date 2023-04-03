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


export default function Booking() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const isVerified = useSelector((state) => state.authReducer.isVerified);

  //inside modal alert cannot continue to transaction page
  const onBtnSendVerifyEmail = async () => {
    try {
      let token = localStorage.getItem("tempatku_login");
      let response = await axios.post(`${API_URL}/user/sendverificationemail`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      console.log("ini hasil response onbtnSendVerifyEmail :", response); //testing purposes
      alert(response.data.message);
    } catch (error) {
      console.log("ini error dari onBtnSendVerifyEmail :", error);
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
                          Send Verification Email
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