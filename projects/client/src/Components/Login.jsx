import { Flex, Box, FormControl, Divider, Icon, Card, CardBody, FormLabel, Input, InputGroup, HStack, Center, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple, FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { TbHomeHeart } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import { loginAction } from '../reducers/auth';


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailOrPhone, setEmailOrPhone] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onBtnLogin = async () => {
        try {
            if (emailOrPhone == "" || password == "") {
                alert('Fill in all the fields❗')
            } else {
                let response = await axios.post(`${API_URL}/user/auth`, {
                    email: emailOrPhone.includes('@') ? emailOrPhone : "",
                    phone: !emailOrPhone.includes('@') ? emailOrPhone : "",
                    password: password
                });
                // console.log("response.data dari login : ", response.data)
                // console.log("response.data dari login roleId : ", response.data.roleId)
                if (response.data.length == 0) {
                    alert('Account not found ❌');
                } else {
                    alert('Login success ✅');
                    //simpen ke LOCALSTORAGE browser u/ KEEPLOGIN
                    localStorage.setItem('tempatku_login', response.data.token);
                    //simpen response.data ke reducer
                    dispatch(loginAction(response.data))
                    if (response.data.roleId == 1) {
                        navigate('/', { replace: true });
                    } else if (response.data.roleId == 2) {
                        navigate('/dashboard', { replace: true });
                    } else {
                        navigate('/', { replace: true });
                    }
                }
            }
        } catch (error) {
            console.log("ini error dari onBtnLogin : ", error);
            alert(error.response.data.message);
            alert(error.response.data.error[0].msg);
            alert(error.response.data.error[2].msg);
        }
    }

    return (
        <Flex
            maxH={'100vh'}
            // align={'center'}
            justify={'center'}
        >
            <Stack mx={'auto'} minW={{ base: 'sm', md: 'md' }} px={6}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    // boxShadow={'xs'}
                    px={4}
                >
                    <Stack mt='4' alignItems={'center'}>
                        <Icon fontSize="50px" as={TbHomeHeart}
                            color='#D3212D'
                        />
                    </Stack>
                    <Stack mb='8'>
                        <Text fontSize='3xl' fontWeight='semibold' style={{ display: 'flex' }} m='auto'>Login to tempatku</Text>
                    </Stack>
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel size='sm'>Email or Phone Number</FormLabel>
                            {/* Input Email or Phone Number */}
                            <Input type="text" borderColor='#d0d7de'
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <HStack justify='space-between'>
                                <FormLabel>Password</FormLabel>
                                <Button
                                    as='a'
                                    variant='link'
                                    size='xs'
                                    color='#0969da'
                                    fontWeight='500'
                                    onClick={() => navigate('/forgotpassword')}
                                >
                                    Forgot password?
                                </Button>
                            </HStack>
                            <InputGroup borderColor='#d0d7de'>
                                {/* Input Password */}
                                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
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
                        </FormControl>
                        <Stack spacing={0}>
                        </Stack>
                        <Stack pb={0}>
                            <Center>
                                <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>
                                    <Button
                                        loadingText="Submitting"
                                        type='button'
                                        w={'full'}
                                        bg={'#D3212D'}
                                        color={'white'}
                                        _hover={{
                                            bg: '#D3212D',
                                        }}
                                        onClick={onBtnLogin}
                                    >
                                        Login
                                    </Button>
                                    <Flex alignItems="center" w='full' py='4'>
                                        <Divider color="black" thickness="2px" />
                                        <Text mx="2" fontSize="sm">or</Text>
                                        <Divider color="black" thickness="2px" />
                                    </Flex>
                                    {/* Google */}
                                    <Button 
                                   
                                    w={'full'} variant={'outline'} leftIcon={<FcGoogle />} borderColor='#d0d7de' _hover={'none'}>
                                        <Center>
                                            <Text>Continue with Google</Text>
                                        </Center>
                                    </Button>
                                    {/* Facebook */}
                                    <Button w={'full'} variant='outline' leftIcon={<FaFacebook color='#4267B2' />} borderColor='#d0d7de' _hover={'none'}>
                                        <Center>
                                            <Text>Continue with Facebook</Text>
                                        </Center>
                                    </Button>

                                    <Stack
                                        // pt='4' 
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
                                                        <Text onClick={() => navigate('/userregister')} color='#0969da'
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
        </Flex>
    );
}
