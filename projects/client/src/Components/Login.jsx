import { Flex, Box, FormControl, Divider, Image, Icon, Card, CardBody, FormLabel, Input, InputGroup, HStack, Center, InputRightElement, Stack, Button, Heading, Text, Link, useToast, FormErrorMessage } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { TbHomeHeart } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import { loginAction } from '../reducers/auth';
import { useFormik } from 'formik';
import * as yup from "yup";
import Logo from '../assets/logotempatku.png';

export default function Login(props) {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();

    const onBtnLogin = async () => {
        try {
            setLoading(true);
            await formik.validateForm(); // trigger form validation
            if (!formik.isValid) {
                return;
            }
            let response = await axios.post(`${API_URL}/user/auth`, {
                email: formik.values.emailOrPhone,
                phone: formik.values.emailOrPhone,
                password: formik.values.password
            });
            console.log("response.data dari login : ", response.data)
            // console.log("response.data dari login role : ", response.data.role)
            toast({
                title: 'Login success',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            //simpen ke LOCALSTORAGE browser u/ KEEPLOGIN
            localStorage.setItem('tempatku_login', response.data.token);
            //simpen response.data ke reducer
            dispatch(loginAction(response.data))
            if (response.data.role == "User") {
                navigate('/', { replace: true });
            } else if (response.data.role == "Tenant") {
                navigate('/dashboard', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.log("ini error dari onBtnLogin : ", error);
            if (error.response && !error.response.data.message) {
                toast({
                    title: 'Login failed',
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

    const formik = useFormik({
        initialValues: {
            emailOrPhone: "",
            password: ""
        },
        onSubmit: onBtnLogin,
        validationSchema: yup.object().shape({
            emailOrPhone: yup.string().required("Please enter a valid email address or phone number").test('valid-email-or-phone', 'Please enter a valid email address or phone number', function (value) {
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                const phoneRegex = /^\+?[0-9]{8,14}$/;
                return emailRegex.test(value) || phoneRegex.test(value);
            }),
            password: yup
                .string()
                .required("Password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                ),
        })
    });

    const handleForm = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    const signInWithGoogle = () => {
        window.open(`${API_URL}/auth/google`, "_self", 'toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto')
    };

    return (
        <Flex
            maxH={'100vh'}
            justify={'center'}
        >
            <form onSubmit={formik.handleSubmit}>
                <Stack mx={'auto'} minW={{ base: 'sm', md: 'md' }} px={6}>
                    <Box
                        rounded={'lg'}
                        bg={'white'}
                        // boxShadow={'xs'}
                        px={4}
                    >
                        <Stack mt='4' alignItems={'center'}>
                            {/* <Icon fontSize="50px" as={TbHomeHeart}
                                color='#D3212D'
                            /> */}
                            <Image src={Logo} alt='tempatku logo' boxSize='50px' />
                        </Stack>
                        <Stack mb='8'>
                            <Text fontSize='3xl' fontWeight='semibold' style={{ display: 'flex' }} m='auto'>Login to tempatku</Text>
                        </Stack>
                        <Stack spacing={4}>
                            <FormControl id="email" isInvalid={formik.errors.emailOrPhone}>
                                <FormLabel size='sm'>Email or Phone Number</FormLabel>
                                {/* Input Email or Phone Number */}
                                <Input type="text" borderColor='#d0d7de'
                                    onChange={handleForm}
                                    name="emailOrPhone" //identifier formik
                                />
                                <FormErrorMessage fontSize='xs'>{formik.errors.emailOrPhone}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="password" isInvalid={formik.errors.password}>
                                <HStack justify='space-between'>
                                    <FormLabel>Password</FormLabel>
                                    <Button
                                        as='a'
                                        variant='link'
                                        size='xs'
                                        color='#0969da'
                                        fontWeight='500'
                                        onClick={() => {
                                            props.onCloseModal()
                                            navigate('/forgotpassword')
                                        }}
                                    >
                                        Forgot password?
                                    </Button>
                                </HStack>
                                <InputGroup borderColor='#d0d7de'>
                                    {/* Input Password */}
                                    <Input type={showPassword ? 'text' : 'password'}
                                        onChange={handleForm}
                                        name="password" //identifier formik
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
                            <Stack spacing={0}>
                            </Stack>
                            <Stack pb={0}>
                                <Center>
                                    <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>
                                        <Button
                                            type='button'
                                            w={'full'}
                                            bg={'#D3212D'}
                                            color={'white'}
                                            _hover={{
                                                bg: '#D3212D',
                                            }}
                                            onClick={onBtnLogin}
                                            isLoading={loading}
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            onClick={signInWithGoogle}
                                            w={'full'} variant={'outline'} leftIcon={<FcGoogle />} borderColor='#d0d7de' _hover={'none'}>
                                            <Center>
                                                <Text>Continue with Google</Text>
                                            </Center>
                                        </Button>

                                        <Stack
                                            pb='2'
                                        >
                                            <Card
                                                variant='none'
                                                borderColor='#d0d7de'

                                            >
                                                <CardBody>
                                                    <Center>
                                                        <HStack fontSize='sm' spacing='1'>
                                                            <Text>New to tempatku?</Text>
                                                            <Text onClick={() => {
                                                                props.onCloseModal()
                                                                navigate('/userregister')
                                                            }
                                                            } color='#0969da'
                                                                cursor={'pointer'}
                                                            >
                                                                Create an account.
                                                            </Text>
                                                        </HStack>
                                                    </Center>
                                                </CardBody>
                                            </Card>
                                        </Stack>
                                    </Stack>
                                </Center>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Flex>
    );
}
