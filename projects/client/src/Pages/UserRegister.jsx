import React, { useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Text, HStack, Box, Center, Card, CardBody, InputGroup, InputRightElement, useDisclosure, FormErrorMessage
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import Userregisterbanner from '../assets/userregisterbanner.jpg';
import { FcGoogle } from 'react-icons/fc';
import { useFormik } from 'formik';
import * as yup from "yup";



export default function UserRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();


    const onBtnRegister = async () => {
        try {
            await formik.validateForm();
            if (!formik.isValid) {
                return; 
            }
            let response = await axios.post(`${API_URL}/user/register`, {
                name: formik.values.name,
                phone: formik.values.phone,
                email: formik.values.email,
                password: formik.values.password,
                confirmationPassword: formik.values.passwordConfirmation
            }
            );
            console.log("ini hasil response onbtnregister :", response); //testing purposes
            console.log("ini hasil response onbtnregister message from be :", response.data.message); //testing purposes
            if (response.data.success) {
                alert(response.data.message);
            }
            // navigate('/', { replace: true }); --> jangan ktnya bikin bug 
        } catch (error) {
            console.log("ini error dari onBtnRegister : ", error); //testing purposes
            alert(error.response.data.message);
            alert(error.response.data.error[0].msg);
            alert(error.response.data.error[1].msg);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        },
        onSubmit: onBtnRegister,
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .required("Name is a required field")
                .matches(
                    /^[a-zA-Z ]+$/,
                    "Name must only contain letters and spaces"
                ),
            phone: yup
                .string()
                .required("Phone is a required field")
                .matches(
                    /^\+?[0-9]{8,14}$/,
                    "Please enter a valid phone number"
                ),
            email: yup
                .string()
                .required("Email is a required field")
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    "Please enter a valid email address"
                ),
            password: yup
                .string()
                .required("Password is a required field")
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
                .oneOf([yup.ref('password'), null], 'Passwords must match'), //check if the value matches "password" field
        })
    });

    const handleForm = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    return (
        <Stack minH={{ lg: '100vh' }}
            direction={{ base: 'column', md: 'column', lg: 'row' }}
        >
            <Flex
                p={{ base: '8', sm: '0' }}
                flex={1}
                align={'center'} justify={'center'}
            // py='20'
            >
                <Stack spacing={0} w={'full'} maxW={{ base: 'sm' }}>
                    <Heading fontSize={'3xl'} fontWeight='semibold'
                        my='8'
                    >Register to tempatku</Heading>
                    <Stack spacing={2}>
                        <HStack>
                            <Box>
                                {/* NAME */}
                                <FormControl id="name" isInvalid={formik.errors.name}>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text"
                                        onChange={handleForm}
                                        name="name" 
                                    />
                                     <FormErrorMessage fontSize='xs'>{formik.errors.name}</FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box>
                                {/* PHONE */}
                                <FormControl id="phone" isInvalid={formik.errors.phone}>
                                    <FormLabel>Phone number</FormLabel>
                                    <Input type="text"
                                        onChange={handleForm}
                                        name="phone" 
                                    />
                                     <FormErrorMessage fontSize='xs'>{formik.errors.phone}</FormErrorMessage>
                                </FormControl>
                            </Box>
                        </HStack>
                        {/* EMAIL */}
                        <FormControl id="email" isInvalid={formik.errors.email}>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"
                                onChange={handleForm}
                                name="email"
                            />
                             <FormErrorMessage fontSize='xs'>{formik.errors.email}</FormErrorMessage>
                        </FormControl>
                        {/* PASSWORD */}
                        <FormControl id="password" isInvalid={formik.errors.password}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                {/* Input Password */}
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleForm}
                                    name="password" 
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        _hover={'none'}
                                        _active={'none'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage fontSize='xs'>{formik.errors.password}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="confirmation_password" isInvalid={formik.errors.passwordConfirmation}>
                            <FormLabel>Confirmation Password</FormLabel>
                            <InputGroup>
                                {/* Input Password Confirmation*/}
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
                    </Stack>
                    <Stack
                        pt='8'
                    >
                        <Button bg={'#D3212D'} color={'white'} variant={'solid'}
                            _hover={{
                                bg: '#D3212D',
                            }}
                            onClick={onBtnRegister}
                        >
                            Register
                        </Button>

                        {/* Google */}
                        <Button
                            w={'full'} variant={'outline'} leftIcon={<FcGoogle />} borderColor='#d0d7de' _hover={'none'}>
                            <Center>
                                <Text>Continue with Google</Text>
                            </Center>
                        </Button>
                        {/* Login */}
                    </Stack>
                    <Stack
                        pb='6'
                        px='10'
                    >
                        <Card variant='none' borderColor='#d0d7de' mt='2'>
                            <CardBody>
                                <Center>
                                    <HStack fontSize='sm'
                                    >
                                        <Text>Have an account?</Text>
                                        {/* usenavigate ke landing, tp login nya ada di landing page modal, hrs bikin modal login lsg kebuka in order to have this  */}
                                        <Text onClick={() => {
                                            navigate('/');
                                            // onOpen();
                                        }} color='#0969da'
                                            cursor={'pointer'}
                                        >
                                            Login.
                                        </Text>
                                    </HStack>
                                </Center>
                            </CardBody>
                        </Card>
                    </Stack>
                </Stack>
            </Flex>
            <Flex
                flex={1}
                display={{ base: 'flex', sm: 'flex' }}
            >
                <Image
                    alt={'User Register Page Image'}
                    objectFit={'cover'}
                    src={Userregisterbanner}

                />
            </Flex>
        </Stack>
    );
}