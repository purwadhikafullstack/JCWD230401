import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
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

   //1. get current date and count from localStorage 
  const countSendOTP = parseInt(localStorage.getItem('countSendOTP')); 
  const currentDate = localStorage.getItem('currentDate'); 

   //2. get today's date
   const today = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}).slice(0, 10);
   console.log("this is today :", today);

   //3. reset count the next day
   if (currentDate !== today) {
     // if the current date is not today, reset the count to 0
     localStorage.setItem('countSendOTP', '0');
     localStorage.setItem('currentDate', today);
   }; 

  //4. count function to limit 5 resend otp by date 
  const countDate = function () {
    localStorage.setItem('countSendOTP', countSendOTP + 1);
  }

  //inside modal alert cannot continue to transaction page
  const onBtnSendVerifyEmail = async () => {
    try {
      setLoading(true);
      if (countSendOTP < 5) {
        let token = localStorage.getItem("tempatku_login");
        let response = await axios.post(`${API_URL}/user/sendverificationemail`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        );
        console.log("ini hasil response onbtnSendVerifyEmail :", response); 
        alert(response.data.message);
        countDate() 
      } else {
        alert('You have reached the maximum limit of OTP resend requests for today.');
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.log("ini error dari onBtnSendVerifyEmail :", error);
      navigate('/transactionpage');
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