import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Text,
  Center,
  HStack
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper';
import axios from 'axios';
import { useSelector } from "react-redux";
//moved from Booking component TPK-9


export default function BookingButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const isVerified = useSelector((state) => state.authReducer.isVerified);
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const role = useSelector((state) => state.authReducer.role);
  console.log("ini isi user is Verified ? :", isVerified);
  console.log("ini isi user role ? :", role);


  //inside modal alert cannot continue to transaction page
  const onBtnSendVerifyEmail = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("tempatku_login");
      let response = await axios.post(`${API_URL}/user/send-verification-email`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      console.log("ini hasil response onbtnSendVerifyEmail :", response);
      toast({
        title: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.log("ini error dari onBtnSendVerifyEmail :", error);
      if (error.response && error.response.data.message === "You have reached the maximum limit of OTP resend requests for today.") {
        toast({
          title: 'You have reached the maximum limit of OTP resend requests for today. Please try again tomorrow.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      if (error.response && error.response.status === 401) {
        toast({
          title: 'Your code has expired. Please log in again to resend email to verify your account.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {
        // User
        role == "User" ? (
          //if user isverified false
          !isVerified ? (
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
                      bg={'#D3212D'}
                      color={'white'}
                      _hover={{
                        bg: '#D3212D',
                      }}
                      type='button'
                      onClick={onBtnSendVerifyEmail}
                      isLoading={loading}
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
          )
            :
            (
              //if User isVerified true
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
            ))
          :
          // if not user
          (
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
                  <ModalHeader>Please login to continue</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <p>Please login to your account and continue with your booking.</p>
                    <br />
                    <Center>
                    <Button
                      bg={'#D3212D'}
                      color={'white'}
                      _hover={{
                        bg: '#D3212D',
                      }}
                      type='button'
                      onClick={() => navigate('/')}
                      w='full'
                      mb='2'
                    >
                      Return to Homepage
                    </Button>
                    </Center>
                    <Center>
                      <HStack fontSize='sm' spacing='1'>
                        <Text>New to tempatku?</Text>
                        <Text onClick={() => navigate('/userregister')} color='#0969da'
                          cursor={'pointer'}
                        >
                          Create an account.
                        </Text>
                      </HStack>
                    </Center>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )
      }
    </>
  )
}