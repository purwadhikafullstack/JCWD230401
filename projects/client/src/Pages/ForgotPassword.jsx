import React, { useState } from 'react';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    FormErrorMessage,
    useToast,
    Box,
    HStack
} from '@chakra-ui/react';
import axios from 'axios';
import { API_URL } from '../helper';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const onBtnForgotPassword = async () => {
        try {
            setLoading(true); //before making the api call
            await formik.validateForm();
            if (!formik.isValid) {
                return;
            }
            let response = await axios.post(`${API_URL}/user/forgot-password`, {
                email: formik.values.email
            });
            console.log("ini hasil response onBtnForgotPassword :", response); //testing purposes
            toast({
                title: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.log("ini error dari onBtnForgotPassword : ", error); //testing purposes
            if (error.response && !error.response.data.message) {
                toast({
                    title: 'Request reset password failed',
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
            setLoading(false); //after call is complete
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: onBtnForgotPassword,
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .required("Email is a required field")
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    "Please enter a valid email address"
                ),
        })
    });

    const handleForm = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    return (
        <Flex
            minH={{base:'50vh', sm:'100vh'}}
            align={{base:'none', sm:'center'}}
            justify={'center'}
            bg={'white'}
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={'white'}
                rounded={'xl'}
                p={6}
                my={12}
                borderWidth={'1px'}
                borderColor={{base:'white', sm:'gray.300'}}
            >
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Forgot your password?
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={'gray.800'}>
                    You&apos;ll get an email with a reset link
                </Text>
                <FormControl id="email" isInvalid={formik.errors.email}>
                    <Input
                        placeholder="email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        onChange={handleForm}
                        name="email"
                    />
                    <FormErrorMessage fontSize='xs'>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={'#D3212D'}
                        color={'white'}
                        _hover={{
                            bg: '#D3212D',
                        }}
                        onClick={onBtnForgotPassword}
                        isLoading={loading}
                    >
                        Request Reset Password
                    </Button>
                    <HStack fontSize='sm'
                    >
                        <Text>Return to</Text>
                        <Text onClick={() => {
                            navigate('/');
                        }} color='#0969da'
                            cursor={'pointer'}
                        >
                            Homepage
                        </Text>
                    </HStack>
                </Stack>
            </Stack>
        </Flex>
    );
}