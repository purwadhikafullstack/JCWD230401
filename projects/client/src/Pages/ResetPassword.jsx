import React, { useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    InputGroup, InputRightElement, FormErrorMessage
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../helper';
import { useFormik } from 'formik';
import * as yup from "yup";

export default function ResetPassword() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPassword, setNewPassword] = React.useState('');
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate();
    const params = useParams(); //data token di params

    const onBtnResetPassword = async () => {
        try {
            await formik.validateForm();
            if (!formik.isValid) {
                return; 
            }
            let response = await axios.patch(`${API_URL}/user/resetpw`, {
                newPassword: formik.values.newPassword,
                confirmationPassword: formik.values.passwordConfirmation,
                otp: verificationCode
            }, {
                headers: {
                    Authorization: `Bearer ${params.token}`
                }
            });
            console.log("ini hasil response onbtnresetpassword :", response); //testing purposes
            alert(response.data.message);
            navigate('/', { replace: true });
        } catch (error) {
            console.log("ini error dari onBtnResetPassword : ", error);
            alert(error.response.data.message);
            alert(error.response.data.error[0].msg); //error msg validator new pw
            alert(error.response.data.error[1].msg); //error msg validator confirmation pw
        }
    }

    console.log("ini isi params :", params); //testing purposes

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            passwordConfirmation: ""
        },
        onSubmit: onBtnResetPassword,
        validationSchema: yup.object().shape({
            newPassword: yup
                .string()
                .required("New password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                )
                .test(
                    "different from old password",
                    "New password must be different from old password",
                    function (value) {
                        return value !== this.parent.oldPassword;
                    }
                ),
            passwordConfirmation: yup
                .string()
                .required("Confirmation password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                )
                .oneOf([yup.ref('newPassword'), null], 'Passwords must match'), //check if the value matches "password" field
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
                <FormControl>
                <FormLabel>To complete your password reset, please enter the OTP code sent to your email below :</FormLabel>
                <Input type="text"
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
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
                    >
                        Reset Password
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
