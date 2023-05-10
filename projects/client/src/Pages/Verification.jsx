import React, { useState } from 'react';
import { Center, Heading } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  HStack,
  FormLabel, FormErrorMessage, useToast
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../helper';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from "yup";

export default function Verification() {
  const params = useParams(); //to get token from email link for auth
  const navigate = useNavigate();
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const toast = useToast();
  console.log("ini isi token dari params", params); //testing purposes

  //Send Verification Email
  const onBtnSendVerifyEmail = async () => {
    try {
      setLoading2(true);
      let response = await axios.post(`${API_URL}/user/sendverificationemail`, {}, {
        headers: {
          Authorization: `Bearer ${params.token}`
        }
      }
      );
      console.log("ini hasil response onbtnSendVerifyEmail :", response);
      toast({
        title: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log("ini error dari onBtnSendVerifyEmail :", error);
      if (error.response && error.response.data.message === "You have reached the maximum limit of OTP resend requests for today.") {
        toast({
          title: 'You have reached the maximum limit of OTP resend requests for today. Please try again tomorrow.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else if (error.response && error.response.status === 401) {
        toast({
          title: 'Your session has expired. Please log in again to resend email to verify your account.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        navigate('/', { replace: true });
      } else {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
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
      toast({
        title: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate('/', { replace: true });
    } catch (error) {
      console.log("ini error dari onBtnVerify :", error);
      if (error.response && !error.response.data.message) {
        toast({
          title: 'Verify account failed',
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
        navigate('/', { replace: true });
      } else {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
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
      bg={'white'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={'white'}
        rounded={'xl'}
        borderWidth={'1px'}
        borderColor='gray.300'
        // boxShadow={'xs'}
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
