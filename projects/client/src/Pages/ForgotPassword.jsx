import React, { useState } from 'react';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { API_URL } from '../helper';


export default function ForgotPassword() {
    const [email, setEmail] = React.useState('');

    const onBtnForgotPassword = async () => {
        try {
            let response = await axios.post(`${API_URL}/user/forgotpw`, {
                email: email
            });
            console.log("ini hasil response onBtnForgotPassword :", response); //testing purposes
            alert(response.data.message);
        } catch (error) {
            console.log("ini error dari onBtnForgotPassword : ", error); //testing purposes
            alert(error.response.data.message);
            alert(error.response.data.error[0].msg);
        }
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Forgot your password?
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    You&apos;ll get an email with a reset link
                </Text>
                <FormControl id="email">
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        onChange = {(e)=> setEmail(e.target.value)}
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={'#D3212D'}
                        color={'white'}
                        _hover={{
                            bg: '#D3212D',
                        }}
                        onClick={onBtnForgotPassword}
                    >
                        Request Reset Password
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}