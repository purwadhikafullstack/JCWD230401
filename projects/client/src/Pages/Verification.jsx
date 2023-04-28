import React, { useState } from 'react';
import { Center, Heading } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  HStack,
  FormLabel, FormErrorMessage
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../helper';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from "yup";

export default function Verification() {
  const params = useParams(); //to get token from email link for auth
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(''); //verification code
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  console.log("ini isi token dari params", params); //testing purposes
  console.log("ini isi input field otp code :", verificationCode); //testing purposes

  //1. get current date and count from localStorage 
  const currentDate = localStorage.getItem('currentDate');
  const countSendOTP = parseInt(localStorage.getItem('countSendOTP'));
  //2. get today's date
  const today = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }).slice(0, 10);
  console.log("this is today :", today);
  //3. reset count the next day
  if (currentDate !== today) {
    // if the current date is not today, reset the count to 0
    localStorage.setItem('countSendOTP', '0');
    localStorage.setItem('currentDate', today);
  };
  //4. count function to limit 5 resend otp by date // testing
  const countDate = function () {
    localStorage.setItem('countSendOTP', countSendOTP + 1);
  }

  //Send Verification Email
  const onBtnSendVerifyEmail = async () => {
    try {
      setLoading2(true);
      if (countSendOTP < 5) {
        let response = await axios.post(`${API_URL}/user/sendverificationemail`, {}, {
          headers: {
            Authorization: `Bearer ${params.token}`
          }
        }
        );
        console.log("ini hasil response onbtnSendVerifyEmail :", response);
        alert(response.data.message);
        countDate()
        window.location.reload(); // reloads the page
      } else {
        alert('You have reached the maximum limit of OTP resend requests for today.');
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.log("ini error dari onBtnSendVerifyEmail :", error);
      if (error.response && error.response.status === 401) {
        alert('Your session has expired. Please log in again to resend email to verify your account.');
        navigate('/', { replace: true });
      } else {
        alert(error.response.data.message);
      }
    } finally {
      setLoading2(false);
    }
  };

  //Verify Account 
  const onBtnVerify = async () => {
    try {
      setLoading1(true);
      await formik.validateForm();
            if (!formik.isValid) {
                return;
            }
      let response = await axios.patch(`${API_URL}/user/verifyaccount`,
        {
          otp: formik.values.verificationCode
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
      if (error.response && error.response.status === 401) {
        alert('Your code has expired. Please log in again to resend email to verify your account.');
        navigate('/', { replace: true });
      } else {
        alert(error.response.data.message);
      }
    } finally {
      setLoading1(false); 
  }
  };

  const formik = useFormik({
    initialValues: {
        verificationCode: ""
    },
    onSubmit: onBtnVerify,
    validationSchema: yup.object().shape({
        verificationCode: yup.string()
            .required("OTP code is a required field")
    })
});

const handleForm = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
};

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'gray.50'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={'white'}
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
        >
          We have sent code to your email
        </Center>

        <FormControl>
          <Center>
            <HStack>
              <FormControl isInvalid={formik.errors.verificationCode}>
                <FormLabel>Input your OTP code here :</FormLabel>
                <Input type="text"
                  onChange={handleForm}
                  name="verificationCode"
                />
                 <FormErrorMessage fontSize='xs'>{formik.errors.verificationCode}</FormErrorMessage>
              </FormControl>
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
            isLoading={loading1}
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
            type='button'
            isLoading={loading2}
          >
            Resend OTP
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
