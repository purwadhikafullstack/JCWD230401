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
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper';
import { useFormik } from 'formik';
import * as yup from "yup";

export default function ChangePassword() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [oldPassword, setOldPassword] = React.useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPassword, setNewPassword] = React.useState('');
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const onBtnChangePassword = async () => {
        try {
            setLoading(true);
            let token = localStorage.getItem("tempatku_login");
            await formik.validateForm(); 
            if (!formik.isValid) {
                return; 
            }
            let response = await axios.patch(`${API_URL}/user/changepw`,
                {
                    password: formik.values.oldPassword,
                    newPassword: formik.values.newPassword,
                    confirmationPassword: formik.values.passwordConfirmation
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            console.log("ini hasil response onbtnchangepassword :", response); //testing purposes
            console.log("ini hasil response onbtnchangepassword message from be :", response.data.message); //testing purposes
            alert(response.data.message);
            navigate('/');
        } catch (error) {
            console.log("ini error dari onBtnChangePassword : ", error); //testing purposes
            alert(error.response.data.message);
            alert(error.response.data.error[0].msg);
        } finally {
            setLoading(false); 
        }
    }

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            passwordConfirmation: ""
        },
        onSubmit: onBtnChangePassword,
        validationSchema: yup.object().shape({
            oldPassword: yup
                .string()
                .required("Old password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                ),
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
                <FormControl id="password" isInvalid={formik.errors.oldPassword}>
                    {/* Old Password Field */}
                    <FormLabel>Old Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showOldPassword ? 'text' : 'password'}
                            onChange={handleForm}
                            name="oldPassword" 
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                _hover={'none'}
                                _active={'none'}
                                onClick={() =>
                                    setShowOldPassword((showOldPassword) => !showOldPassword)
                                }>
                                {showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                        <FormErrorMessage fontSize='xs'>{formik.errors.oldPassword}</FormErrorMessage>
                </FormControl>
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
                <Stack spacing={6}>
                    <Button
                        bg={'#D3212D'}
                        color={'white'}
                        _hover={{
                            bg: '#D3212D',
                        }}
                        onClick={onBtnChangePassword}
                        isLoading={loading}
                    >
                        Change Password
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
