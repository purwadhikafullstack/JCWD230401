import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Link, Avatar, Icon, useDisclosure, Modal, ModalOverlay, ModalCloseButton, ModalBody, ModalFooter, Button, ModalContent
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { RiSuitcaseLine } from "react-icons/ri";
// import Login from '../pages/Login';

export default function NavbarMobile() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState('outside');
    return (
        <Box
            boxShadow={'xs'}
            minH='5vh'
            display={{ base: 'block', sm: 'none' }}
            position="fixed"
            bottom="0"
            bg='white'
            w='full'
        >
            <Container
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Stack direction={'row'}
                    justifyContent='space-evenly'
                    spacing={'10'}
                >
                    {/* Landing Page */}
                    <Box direction='row'>
                        <Link>
                            <Icon as={AiOutlineSearch} fontSize='2xl'></Icon>
                            <Text fontSize='2xs' mt='-1.5'>Explore</Text>
                        </Link>
                    </Box>
                    {/* Favorites Page */}
                    <Box direction='row'>
                        <Link>
                            <Icon as={AiOutlineHeart} fontSize='2xl'></Icon>
                            <Text fontSize='2xs' mt='-1.5'>Saved</Text>
                        </Link>
                    </Box>
                    {/* Orders/Transactions Page */}
                    <Box direction='row' >
                        <Link>
                            <Icon as={RiSuitcaseLine} fontSize='2xl' ml='2'></Icon>
                            <Text fontSize='2xs' mt='-1.5'>Bookings</Text>
                        </Link>
                    </Box>
                    {/* Profile Page */}
                    <Box direction='row' onClick={onOpen}>
                        <Link>
                            <Avatar
                                size={'xs'}
                                src={
                                    'avatar-1.jpg'
                                }
                            // ml='0.5'
                            />
                            <Text fontSize='2xs'>Login</Text>
                        </Link>
                        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={scrollBehavior} >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalCloseButton />
                                <ModalBody>
                                    {/* <Login /> */}
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}