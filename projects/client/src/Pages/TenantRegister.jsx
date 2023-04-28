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
    FormErrorMessage,
    Text, Icon, HStack, Box, Divider, Center, Card, CardBody, InputGroup, InputRightElement, useDisclosure
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../helper';
import { FiUpload } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as yup from "yup";

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
    const [loading, setLoading] = React.useState(false);

    console.log("isi fileimage: ", fileImage);
    const onBtnRegister = async () => {
        try {
             setLoading(true);
            await formik.validateForm();
            let formData = new FormData();
            formData.append(
                "data",
                JSON.stringify({
                    name: formik.values.name,
                    email: formik.values.email,
                    phone: formik.values.phone,
                    password: formik.values.password,
                    confirmationPassword: formik.values.passwordConfirmation
                })
            );
            //1. function that will read the file image and return a Promise that resolves with the base64 data:
             const toBase64 = (file) =>
                new Promise((resolve, reject) => {
                    //FileReader API which allows you to read the contents of files asynchronously.
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            const fileBase64 = await toBase64(formik.values.fileImage);
            formData.append("images", fileBase64);
            console.log("ini isi dari formData", formData);
            if (!formik.isValid) {
                return;  //gak jalan axios kalo formiknya blom bener tp keluar yup messagenya
            }
            let response = await axios.post(`${API_URL}/user/registerastenant`,
                formData
            );
            console.log("ini hasil response onbtnregister :", response); //testing purposes
            console.log("ini hasil response onbtnregister message from be :", response.data.message); //testing purposes
            if (response.data.success) {
                alert(response.data.message);
            }
        } catch (error) {
            console.log("ini error dari onBtnRegister : ", error); //testing purposes
            alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            fileImage: ""
        },
        onSubmit: onBtnRegister, // ini paling terakhir (gk jadi) krn dia synchronous
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
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
            fileImage: yup
                .mixed()
                .required("KTP photo is a required field")
                .test(
                    'fileSize',
                    'File size must be less than 1MB',
                    (value) => value && value.size <= 1000000
                )
                .test(
                    'fileFormat',
                    'Only jpg, jpeg, and png formats are allowed',
                    (value) =>
                        value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type)
                )
        }),

    });

    const handleForm = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    //untuk upload ktp
    const onChangeFile = (event) => {
        console.log("ini isi dari event.target.files onchangefile :", event.target.files);
        formik.setFieldValue(event.target.name, event.target.files[0]); //change to setFileImage
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
                    >Register as a Tenant</Heading>
                    <Stack spacing={2}>
                        <HStack>
                            <Box>
                                {/* NAME */}
                                <FormControl isInvalid={formik.errors.name}>
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
                                <FormControl isInvalid={formik.errors.phone}>
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
                        <FormControl isInvalid={formik.errors.email}>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"
                                onChange={handleForm}
                                name="email"
                            />
                            <FormErrorMessage fontSize='xs'>{formik.errors.email}</FormErrorMessage>
                        </FormControl>
                        {/* PASSWORD */}
                        <FormControl isInvalid={formik.errors.password}>
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
                        <FormControl isInvalid={formik.errors.passwordConfirmation}>
                            <FormLabel>Confirmation Password</FormLabel>
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
                        {/* UPLOAD ID CARD */}
                        <FormControl isInvalid={formik.errors.fileImage}>
                            <FormLabel>Upload a photo of your KTP

                            <Text fontSize='xs'>( Image size: max. 1 MB , Image format: .jpg, .jpeg, .png )</Text>
                            </FormLabel>
                            <Image
                                boxSize='200px'
                                objectFit='cover'
                                src={formik.values.fileImage
                                    ? URL.createObjectURL(
                                        formik.values.fileImage
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
                                    name="fileImage"
                                ></Input>
                            </Button>
                            <FormErrorMessage fontSize='xs'>{formik.errors.fileImage}</FormErrorMessage>
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
                            isLoading={loading}
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