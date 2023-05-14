import React, { useRef, useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Avatar,
    useToast, AvatarBadge, IconButton, Link, Divider,
    Center, Radio, RadioGroup, Box, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, FormErrorMessage
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { API_URL, API_URL_IMG } from '../helper';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from "yup";
import { BsShieldExclamation, BsShieldCheck } from 'react-icons/bs';
import { decodeToken } from "react-jwt";

export default function EditProfile(props) {
    const currentName = useSelector((state) => state.authReducer.name);
    const currentEmail = useSelector((state) => state.authReducer.email);
    const currentGender = useSelector((state) => state.authReducer.gender);
    const currentBirth = useSelector((state) => state.authReducer.birth);
    const currentProfileImage = useSelector((state) => state.authReducer.image_profile);
    const role = useSelector((state) => state.authReducer.role);
    const isVerified = useSelector((state) => state.authReducer.isVerified);
    const [gender, setGender] = useState(currentGender);
    const [birth, setBirth] = useState(currentBirth);
    const modalProfileImage = useDisclosure()
    const [profileImage, setProfileImage] = useState(null);
    const inputFile = useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const toast = useToast();

    console.log("ini isi dari role edit profile:", role); //testing
    console.log(currentGender);
    console.log(currentBirth);


    const handleGenderChange = (value) => {
        setGender(value);
        formik.setFieldValue('gender', value);
        console.log("ini isi value gender change:", value);
    }

    const handleBirthChange = (event) => {
        const selectedDate = event.target.value;
        setBirth(selectedDate);
        formik.setFieldValue("birth", selectedDate);
        console.log("ini isi selectedDate:", selectedDate);
        console.log("ini type data selectedDate:", typeof selectedDate);
    }

    const onBtnEditProfile = async () => {
        try {
            setLoading1(true);
            await formik.validateForm();
            let token = localStorage.getItem("tempatku_login");
            if (formik.values.name.trim() === "") {
                formik.setErrors({ name: "Name is a required field" });
                return;
            }
            if (formik.values.email.trim() === "") {
                formik.setErrors({ email: "Email is a required field" });
                return;
            }
            if (!formik.isValid) {
                return;
            }
            let response = await axios.patch(`${API_URL}/user/edit-profile`,
                {
                    name: formik.values.name,
                    email: formik.values.email,
                    gender: gender,
                    birth: birth,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            console.log("response onbtneditprofile :", response); //testing purposes
            console.log("response onbtneditprofile message from be :", response.data.message); //testing purposes
            toast({
                title: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            props.keeplogin(); //refresh once updated
        } catch (error) {
            console.log("ini error dari onBtnEditProfile : ", error); //testing purposes
            if (error.response && !error.response.data.error) {
                toast({
                    title: error.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: error.response.data.error[0].msg,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } finally {
            setLoading1(false);
        }
    };

    const onBtnSendVerifyEmail = async () => {
        try {
            setLoading(true);
            let token = localStorage.getItem("tempatku_login");
            let response = await axios.post(`${API_URL}/user/send-verification-email`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            console.log("ini hasil response onbtnSendVerifyEmail :", response);
            toast({
                title: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            console.log("ini error dari onBtnSendVerifyEmail :", error);
            if (error.response && error.response.data.message === "You have reached the maximum limit of OTP resend requests for today.") {
                toast({
                    title: 'You have reached the maximum limit of OTP resend requests for today. Please try again tomorrow.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
            if (error.response && error.response.status === 401) {
                toast({
                    title: 'Your code has expired. Please log in again to resend email to verify your account.',
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
            name: currentName || "",
            email: currentEmail || "",
            gender: currentGender || "",
            birth: currentBirth || "",
        },
        onSubmit: onBtnEditProfile,
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .required("Name is a required field")
                .matches(
                    /^[a-zA-Z ]+$/,
                    "Name must only contain letters and spaces"
                ),
            email: yup
                .string()
                .required("Email is a required field")
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    "Please enter a valid email address"
                ),
            gender: yup
                .string()
                .required("Gender is a required field")
                .oneOf(["Male", "Female"], "Invalid gender"),
            birth: yup
                .string()
                .required("Birthdate is a required field")
                .test(
                    "age",
                    "You must be at least 18 years old.",
                    function (value) {
                        const currentDate = new Date();
                        const birthdate = new Date(value);
                        const minimumAgeDate = new Date(
                            currentDate.getFullYear() - 18,
                            currentDate.getMonth(),
                            currentDate.getDate()
                        );
                        return birthdate <= minimumAgeDate;
                    }
                )
                .max(new Date(), "Birthdate cannot past today.")
        })
    });

    const handleForm = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    //untuk change state image profile
    const onChangeFile = (event) => {
        console.log("ini isi dari event.target.files onchangefile :", event.target.files);
        modalProfileImage.onOpen();
        setProfileImage(event.target.files[0]);
    };

    const onBtnEditProfileImage = async () => {
        try {
            setLoading2(true);
            let token = localStorage.getItem("tempatku_login");
            let formData = new FormData();
            // image max size is 1 MB
            if (profileImage.size > 1000000) {
                throw new Error("Image size should not exceed 1MB");
            }
            // image has to be .jpg .png .gif (.jpg = .jpeg)
            if (
                !["image/jpg", "image/png", "image/jpeg", "image/gif"].includes(profileImage.type)
            ) {
                throw new Error("Only .jpg, .png, .gif, and .jpeg format allowed!");
            }
            formData.append("image_profile", profileImage);
            console.log("ini isi dari formData", formData);
            console.log("ini tipe dari image_profile :", profileImage.type)
            let response = await axios.patch(`${API_URL}/user/update-profile-image`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("response onbtneditprofileimage :", response);
            console.log("response onbtneditprofileimage message be :", response.data.message);
            toast({
                title: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            modalProfileImage.onClose();
            // Wrap props.keeplogin() in a Promise and use the then() method to handle it
            new Promise((resolve, reject) => {
                props.keeplogin() //refresh profpic once updated
                    .then(resolve)
                    .catch(reject);
            });
        } catch (error) {
            console.log("ini error dari onBtnEditProfileImage : ", error);
            toast({
                title: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading2(false);
        }
    };

    const onBtnShowKTP = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let response = await axios.get(`${API_URL}/user/show-ktp`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("response.data onbtnshowktp :", response.data);
            console.log("tipe data response.data onbtnshowktp :", typeof response.data);

            //1. decrypt base64
            const decryptbase64 = decodeToken(response.data);
           
            console.log("ini imagektp base64 di decrypt:", decryptbase64);
            console.log("ini imagektp base64Data base64 di decrypt:", decryptbase64.base64Data);

            //2. Decode Base64 string into binary data
            const binaryData = atob(decryptbase64.base64Data);

            //3. Convert the binary data into an array of numeric values
            const array = [];
            for (let i = 0; i < binaryData.length; i++) {
                array.push(binaryData.charCodeAt(i));
            }

            //4. Create Blob object from the num val array, with specified MIME type
            const blob = new Blob([new Uint8Array(array)], { type: "image/png" });

            //5. Create a URL from the Blob object
            const imageUrl = URL.createObjectURL(blob);

            //6. Open the image in a new tab
            window.open(imageUrl, "_blank");
        } catch (error) {
            console.log("ini error dari onBtnShowKTP : ", error);
            alert(error.message)
        }
    };

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={'white'}
            >
                <Stack
                    bg='white'
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    rounded={'xl'}
                    borderWidth={'1px'}
                    borderColor={{ base: 'white', sm: 'gray.300' }}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} align='center' mb='4'>
                        Profile Page
                    </Heading>
                    <FormControl id="userName">
                        {/* <FormLabel>User Icon</FormLabel> */}
                        <Stack
                            direction={['column']}
                            spacing={6}
                        >
                            <Center>
                                <Avatar size="xl"
                                    src={currentProfileImage == null ? "https://ionicframework.com/docs/img/demos/avatar.svg" : currentProfileImage && currentProfileImage.includes('http') ? currentProfileImage : `${API_URL_IMG}${currentProfileImage}` ? `${API_URL_IMG}${currentProfileImage}` : "https://ionicframework.com/docs/img/demos/avatar.svg"}
                                >
                                    {!isVerified && role == "User" ?
                                        <AvatarBadge
                                            as={IconButton}
                                            size="sm"
                                            rounded="full"
                                            bottom="-1px"
                                            right="-3px"
                                            colorScheme="red"
                                            aria-label="remove Image"
                                            icon={<BsShieldExclamation />}
                                        /> :
                                        isVerified && role == "User" ?
                                            <AvatarBadge
                                                as={IconButton}
                                                size="sm"
                                                rounded="full"
                                                bottom="-1px"
                                                right="-3px"
                                                colorScheme="green"
                                                aria-label="remove Image"
                                                icon={<BsShieldCheck />}
                                            /> :
                                            <AvatarBadge display={{ base: 'none' }} />
                                    }
                                </Avatar>
                            </Center>
                            <Box w="full">
                                <Center w="full"
                                >
                                    <Button w="full" onClick={() =>
                                        inputFile.current.click()}>Change Profile Photo
                                        <Input
                                            my='4'
                                            ml='6'
                                            type="file"
                                            id="file"
                                            ref={inputFile}
                                            style={{ display: "none" }}
                                            onChange={onChangeFile}
                                            accept="image/*"
                                            variant='unstyled'
                                        ></Input>
                                    </Button>
                                </Center>
                                <Text fontSize='xs' pt='1'>Image size: max. 1 MB</Text>
                                <Text fontSize='xs'>Image format: .jpg, .jpeg, .png, .gif</Text>
                                {!isVerified && role == "User" ?
                                    <div>
                                        <Box py='2'>
                                            <Divider />
                                        </Box>
                                        <Box pb='2'>
                                            <Text fontSize='xs'>Your account has not been verified yet. Click the button to verify and enjoy tempatku has to offer.</Text>
                                        </Box>
                                        <Box>
                                            <Button
                                                onClick={onBtnSendVerifyEmail}
                                                isLoading={loading}
                                                colorScheme='green'
                                            >Verify Account</Button>
                                        </Box>
                                        <Box py='2'>
                                            <Divider />
                                        </Box>
                                    </div>
                                    :
                                    isVerified && role == "User" ?
                                        <div>
                                            <Box py='2'>
                                                <Divider />
                                            </Box>
                                            <Text fontSize='xs'>Your account is verified.</Text>
                                            <Box py='2'>
                                                <Divider />
                                            </Box>
                                        </div>
                                        :
                                        <Text fontSize='xs'></Text>
                                }
                            </Box>
                        </Stack>
                        {/* Modal Open */}
                        <Modal isOpen={modalProfileImage.isOpen} onClose={modalProfileImage.onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Change Profile Photo</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody textAlign='center'>
                                    <Avatar objectFit='cover' size='2xl' src={profileImage ? URL.createObjectURL(profileImage) : ''}></Avatar>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='red' mr={3} onClick={() => {
                                        modalProfileImage.onClose();
                                        setProfileImage(null);
                                    }} variant='solid'>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={onBtnEditProfileImage}
                                        isLoading={loading2}
                                        colorScheme='green'
                                        variant='outline'
                                    >Save</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </FormControl>
                    <FormControl id="Name" isInvalid={formik.errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder={currentName}
                            _placeholder={{ color: 'black' }}
                            type="text"
                            onChange={handleForm}
                            name="name"
                        />
                        <FormErrorMessage fontSize='xs'>{formik.errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="email" isInvalid={formik.errors.email}>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder={currentEmail}
                            _placeholder={{ color: 'black' }}
                            type="email"
                            onChange={handleForm}
                            name="email"
                        />
                        <FormErrorMessage fontSize='xs'>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="gender" isInvalid={formik.errors.gender}>
                        <FormLabel>Gender</FormLabel>
                        <Box justifyContent='space-between'>
                            <RadioGroup
                                value={formik.values.gender}
                                onChange={handleGenderChange}
                                name="gender"
                            >
                                <Radio value="Male" mr={2}>Male</Radio>
                                <Radio value="Female">Female</Radio>
                            </RadioGroup>
                        </Box>
                        <FormErrorMessage fontSize='xs'>{formik.errors.gender}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="birth" isInvalid={formik.errors.birth}>
                        <FormLabel>Birthdate</FormLabel>
                        <Input
                            placeholder={currentBirth} 
                            _placeholder={{ color: 'gray.800' }}
                            type="date"
                            value={formik.values.birth}
                            onChange={handleBirthChange}
                            name="birth"
                        />
                        <FormErrorMessage fontSize='xs'>{formik.errors.birth}</FormErrorMessage>
                    </FormControl>
                    {
                        // Tenant
                        role == "Tenant" ? (
                            <Stack spacing={3} direction={['column']}>
                                <Button
                                    bg={'#D3212D'}
                                    color={'white'}
                                    _hover={{
                                        bg: '#D3212D',
                                    }}
                                    type='button'
                                    w='full'
                                    onClick={onBtnEditProfile}
                                    isLoading={loading1}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant={'outline'}
                                    color={'#D3212D'}
                                    _hover={{
                                        bg: 'gray.200',
                                    }}
                                    type='button'
                                    w='full'
                                    borderColor='#D3212D'
                                    onClick={onBtnShowKTP}
                                >
                                    Show KTP Photo
                                </Button>
                            </Stack>
                        ) : (
                            // User
                            <Stack spacing={3} direction={['column']}>
                                <Button
                                    bg={'#D3212D'}
                                    color={'white'}
                                    _hover={{
                                        bg: '#D3212D',
                                    }}
                                    type='button'
                                    w='full'
                                    onClick={onBtnEditProfile}
                                    isLoading={loading1}
                                >
                                    Save
                                </Button>
                            </Stack>
                        )
                    }
                </Stack>
            </Flex>
        </>
    )
}