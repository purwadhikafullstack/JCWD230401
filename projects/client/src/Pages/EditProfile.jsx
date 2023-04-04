import React, { useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center, VStack, Radio, RadioGroup, Box
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { API_URL } from '../helper';
import axios from 'axios';



export default function EditProfile() {
    const currentName = useSelector((state) => state.authReducer.name);
    const currentEmail = useSelector((state) => state.authReducer.email);
    const currentGender = useSelector((state) => state.authReducer.gender);
    const currentBirth = useSelector((state) => state.authReducer.birth);
    const [name, setName] = useState(currentName);
    const [email, setEmail] = useState(currentEmail);
    const [gender, setGender] = useState(currentGender);
    const [birth, setBirth] = useState(currentBirth);

    const handleGenderChange = (value) => {
        setGender(value);
    }

    const handleBirthChange = (event) => {
        const selectedDate = event.target.value;
        setBirth(selectedDate);
        console.log(selectedDate);
    }

    const onBtnEditProfile = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let response = await axios.patch(`${API_URL}/user/editprofile`,
                {
                    name: name,
                    email: email,
                    gender: gender,
                    birth: birth,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            console.log("ini hasil response onbtneditprofile :", response); //testing purposes
            console.log("ini hasil response onbtneditprofile message from be :", response.data.message); //testing purposes
            alert(response.data.message);
        } catch (error) {
            console.log("ini error dari onBtnEditProfile : ", error); //testing purposes
            // alert(error.response.data.message);
            alert(error.response.data.error[0].msg);
        }
    }

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={'gray.50'}
            >
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">
                        {/* <FormLabel>User Icon</FormLabel> */}
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src="https://ionicframework.com/docs/img/demos/avatar.svg">
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="red"
                                        aria-label="remove Image"
                                        icon={<SmallCloseIcon />}
                                    />
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <Button w="full">Change Profile Image</Button>
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl id="userName">
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder={currentName}
                            _placeholder={{ color: 'gray.800' }}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder={currentEmail}
                            _placeholder={{ color: 'gray.800' }}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="gender">
                        <FormLabel>Gender</FormLabel>
                        <Box justifyContent='space-between'>
                            <RadioGroup
                                value={gender} onChange={handleGenderChange}
                            >
                                <Radio value="Male" mr={2}>Male</Radio>
                                <Radio value="Female">Female</Radio>
                            </RadioGroup>
                        </Box>
                    </FormControl>
                    <FormControl id="birth">
                        <FormLabel>Birthdate</FormLabel>
                        <Input
                            placeholder={currentBirth} //your current birthdate
                            _placeholder={{ color: 'gray.800' }}
                            type="date"
                            value={birth}
                            onChange={handleBirthChange}
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        {/* <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
                            Cancel
                        </Button> */}
                        <Button
                            bg={'#D3212D'}
                            color={'white'}
                            _hover={{
                                bg: '#D3212D',
                            }}
                            type='button'
                            w='full'
                            onClick={onBtnEditProfile}
                        >
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    )
}