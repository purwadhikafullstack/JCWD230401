import React, { useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    InputGroup, InputRightElement, FormErrorMessage, useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../helper';
import { useFormik } from 'formik';
import * as yup from "yup";

export default function ResetPassword() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const navigate = useNavigate();
    const params = useParams(); //data token di params
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();

    const onBtnResetPassword = async () => {
        try {
            setLoading(true);
            await formik.validateForm();
            if (!formik.isValid) {
                return;
            }
            let response = await axios.patch(`${API_URL}/user/resetpw`, {
                newPassword: formik.values.newPassword,
                confirmationPassword: formik.values.passwordConfirmation,
                otp: formik.values.verificationCode
            }, {
                headers: {
                    Authorization: `Bearer ${params.token}`
                }
            });
            console.log("ini hasil response onbtnresetpassword :", response); //testing purposes
            // alert(response.data.message);
            toast({
                title: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/', { replace: true });
        } catch (error) {
            console.log("ini error dari onBtnResetPassword : ", error);
            if (error.response && !error.response.data.message) {
                toast({
                    title: 'Reset password failed',
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
    }

    console.log("ini isi params :", params); //testing purposes

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            passwordConfirmation: "",
            verificationCode: ""
        },
        onSubmit: onBtnResetPassword,
        validationSchema: yup.object().shape({
            newPassword: yup
                .string()
                .required("New password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                ),
            passwordConfirmation: yup
                .string()
                .required("Confirmation password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                )
                .oneOf([yup.ref('newPassword'), null], 'Passwords must match'), //check if the value matches "password" field
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
                maxW={'md'}
                bg={'white'}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Enter new password
                </Heading>
                {/* New Password Field */}
                <FormControl id="newpassword" isInvalid={formik.errors.newPassword}>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showNewPassword ? 'text' : 'password'}
                            onChange={handleForm}
                            name="newPassword"
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                _hover={'none'}
                                _active={'none'}
                                onClick={() =>
                                    setShowNewPassword((showNewPassword) => !showNewPassword)
                                }>
                                {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage fontSize='xs'>{formik.errors.newPassword}</FormErrorMessage>
                </FormControl>
                {/* Confirm New Password  */}
                <FormControl id="confirmation_password" isInvalid={formik.errors.passwordConfirmation}>
                    <FormLabel>Confirm New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            onChange={handleForm}
                            name="passwordConfirmation"
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                _hover={'none'}
                                _active={'none'}
                                onClick={() =>
                                    setShowPasswordConfirmation((showPasswordConfirmation) => !showPasswordConfirmation)
                                }>
                                {showPasswordConfirmation ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage fontSize='xs'>{formik.errors.passwordConfirmation}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.verificationCode}>
                    <FormLabel>To complete your password reset, please enter the OTP code sent to your email below :</FormLabel>
                    <Input type="text"
                        onChange={handleForm}
                        name="verificationCode"
                    />
                    <FormErrorMessage fontSize='xs'>{formik.errors.verificationCode}</FormErrorMessage>
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={'#D3212D'}
                        color={'white'}
                        _hover={{
                            bg: '#D3212D',
                        }}
                        type='button'
                        onClick={onBtnResetPassword}
                        isLoading={loading}
                    >
                        Reset Password
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
