import React, { useRef, useState } from 'react';
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    Text, Icon, HStack, Box, Divider, Center, Card, CardBody, InputGroup, InputRightElement, useDisclosure
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import { FiUpload } from 'react-icons/fi';


export default function TenantRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fileImage, setFileImage] = useState(null);  //state for idcard
    const inputFile = useRef(null);
    const [image, setImage] = useState("https://fakeimg.pl/350x200/");

    //untuk upload ktp
    const onChangeFile = (event) => {
        console.log("ini isi dari event.target.files onchangefile :", event.target.files);
        setFileImage(event.target.files[0]); //change to setFileImage
    };

    const onBtnRegister = async () => {
        try {
            let formData = new FormData();
            formData.append("image_ktp", fileImage);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("password", password);
            formData.append("confirmationPassword", passwordConfirmation);
            console.log("ini isi dari formData", formData);
            let response = await axios.post(`${API_URL}/user/registerastenant`,
                formData
            );
            console.log("ini hasil response onbtnregister :", response); //testing purposes
            console.log("ini hasil response onbtnregister message from be :", response.data.message); //testing purposes
            if (response.data.success) {
                alert(response.data.message);
            }
            navigate('/', { replace: true });
        } catch (error) {
            console.log("ini error dari onBtnRegister : ", error); //testing purposes
            alert(error.response.data.message);
            alert(error.response.data.error[0].msg);
            alert(error.response.data.error[1].msg);
        }
    }

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
                    >Register as a Tenant</Heading>
                    <Stack spacing={2}>
                        <HStack>
                            <Box>
                                {/* NAME */}
                                <FormControl id="Name">
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                {/* PHONE */}
                                <FormControl id="phonenumber">
                                    <FormLabel>Phone number</FormLabel>
                                    <Input type="text"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                        {/* EMAIL */}
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        {/* PASSWORD */}
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                {/* Input Password */}
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
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
                        </FormControl>
                        <FormControl id="confirmation_password">
                            <FormLabel>Confirmation Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPasswordConfirmation ? 'text' : 'password'} onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                        </FormControl>
                        {/* UPLOAD ID CARD */}
                        <FormControl id="upload-id-card">
                            <FormLabel>Upload your id card</FormLabel>
                            <Image
                                boxSize='200px'
                                objectFit='cover'
                                src={fileImage
                                    ? URL.createObjectURL(
                                        fileImage
                                    )
                                    : image}
                                w='full'
                            />
                            <Button fontFamily={'heading'} bg={'gray.200'} color={'gray.800'} w='full'
                                leftIcon={<Icon as={FiUpload} ml='8' fontSize={'2xl'} />}
                                variant={"link"}
                                onClick={() =>
                                    inputFile.current.click()
                                }
                            >
                                {/* Upload your id card */}
                                <Input
                                    my='4'
                                    ml='6'
                                    type="file"
                                    id="file"
                                    ref={inputFile}
                                    // style={{ display: "none" }}
                                    onChange={onChangeFile}
                                    accept="image/*"
                                    variant='unstyled'
                                ></Input>
                            </Button>
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
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />
            </Flex>
        </Stack>
    );
}