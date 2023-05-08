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
  useToast
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
  console.log("ini isi user is Verified ? :", isVerified);

  //inside modal alert cannot continue to transaction page
  const onBtnSendVerifyEmail = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("tempatku_login");
      let response = await axios.post(`${API_URL}/user/sendverificationemail`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      console.log("ini hasil response onbtnSendVerifyEmail :", response);
      // alert(response.data.message);
      toast({
        title: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.log("ini error dari onBtnSendVerifyEmail :", error);
      // navigate('/transactionpage');
      if (error.response && error.response.data.message === "You have reached the maximum limit of OTP resend requests for today.") {
        toast({
          title: 'You have reached the maximum limit of OTP resend requests for today. Please try again tomorrow.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } 
      if (error.response && error.response.status === 401){ 
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
          :
          //if isVerified true
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