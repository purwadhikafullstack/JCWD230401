import React from 'react';
import {
  Icon,
  Text,
  Box,
  Flex,
  Avatar,
  HStack,
  Link, Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, InputGroup, Input, InputRightElement
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { TbHomeHeart } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/auth';
import { API_URL, API_URL_IMG } from '../helper';
import axios from 'axios';
import Logo from '../assets/logotempatku.png';
import { Route, Routes, useLocation } from "react-router-dom"; // bisa pake ini buat nyambungin register sama login pop up modal


export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState('outside');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageprofile = useSelector((state) => state.authReducer.image_profile);
  const role = useSelector((state) => state.authReducer.role);
  const password = useSelector((state) => state.authReducer.password);
  const { pathname } = useLocation();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  // console.log("ini isi modalIsOpen :", modalIsOpen);
  // console.log("ini isi password useSelector buat google:", password);
  console.log("ini isi imageprofile useSelector:", imageprofile);
  // console.log("tipe data imageprofile", typeof imageprofile);

  // Login Page Modal
  const onOpenModal = () => {
    onOpen();
    setModalIsOpen(true);
  };
  
  const onCloseModal = () => {
    onClose();
    setModalIsOpen(false);
  };

  React.useEffect(() => {
    if (pathname === '/') {
      onOpenModal();
    }
  }, [pathname]);

  const onBtnLogout = () => {
    localStorage.removeItem('tempatku_login');
    dispatch(logoutAction());
    navigate('/', { replace: true });
  };

  const onBtnLogoutGoogle = async () => {
    try {
      const cookieValue = document.cookie;
      console.log("ini isi dari cookieValue :", cookieValue);
      console.log("tipe data cookieValue :", typeof cookieValue);
      let response = await axios.get(`${API_URL}/auth/logout`, {
        headers: {
          Cookie: cookieValue,
        }
      });
      document.cookie = "googleAuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch(logoutAction());
      localStorage.removeItem('tempatku_login');
      navigate('/', { replace: true });
      // console.log("ini respon dari googlelogout :", response);
    } catch (error) {
      console.log("ini error dari onBtnGoogleLogout : ", error);
    }
  };

  return (
    <>
      <Box
        // position="fixed"
        w='full' bg='white' zIndex={1}
        borderBottomWidth={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
      >
        <Box boxShadow={'xs'} px={{ base: '4', sm: '10' }}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
              {/* Logo Tempatku */}
              {
                role == "User" ?
                  <Image src={Logo} alt='tempatku logo' boxSize='50px' onClick={() => navigate('/')} />
                  :
                  role == "Tenant" ?
                    <Image src={Logo} alt='tempatku logo' boxSize='50px' onClick={() => navigate('/dashboard')} />
                    :
                    <Image src={Logo} alt='tempatku logo' boxSize='50px' onClick={() => navigate('/')} />
              }
              <Text
                display={{
                  base: "none", sm: "none", md: "block"
                }}
                fontSize="23px"
                fontWeight="600"
              >
                tempatku
              </Text>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
              </HStack>
            </HStack>

            <Flex alignItems={'center'}>

              {/* Become TENANT */}
              {
                // User
                role == "User" ?
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    mr={4}
                    _hover={'none'}
                    display={{ base: "none", sm: "none", md: "block" }}
                    onClick={() => navigate('/tenantregister')}
                  >
                    Become a Tenant
                  </Button>
                  :
                  // Tenant
                  role == "Tenant" ?
                    <Button
                      variant={'ghost'}
                      size={'sm'}
                      mr={4}
                      display={{ base: "none" }}
                      _hover={'none'}
                      onClick={() => navigate('/tenantregister')}
                    >
                      Become a Tenant
                    </Button>
                    :
                    <Button
                      variant={'ghost'}
                      size={'sm'}
                      mr={4}
                      _hover={'none'}
                      display={{ base: "none", sm: "none", md: "block" }}
                      onClick={() => navigate('/tenantregister')}
                    >
                      Become a Tenant
                    </Button>
              }

              {/* Main Menu */}
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  border='1px'
                  color='gray.300'
                  p='1'
                  // display={{ base: "none", sm: "none", md: "block" }}
                  _active={'none'}
                >
                  <HamburgerIcon w={6} h={6} mx={2} my={1} color='black' />
                  {/* kondisi dia logout gaada data login default image , klo ga login avatar chakra ui nya ilangin , gunain role sama user selector */}
                  {
                    // User
                    role == "User" ?
                      <Avatar
                        size={'sm'}
                        src={imageprofile == null ? "https://ionicframework.com/docs/img/demos/avatar.svg" : imageprofile && imageprofile.includes('http') ? imageprofile : `${API_URL_IMG}${imageprofile}` ? `${API_URL_IMG}${imageprofile}` : "https://ionicframework.com/docs/img/demos/avatar.svg"}
                      />
                      :
                      // Tenant
                      role == "Tenant" ?
                        <Avatar
                          size={'sm'}
                          src={imageprofile == null ? "https://ionicframework.com/docs/img/demos/avatar.svg" : imageprofile && imageprofile.includes('http') ? imageprofile : `${API_URL_IMG}${imageprofile}` ? `${API_URL_IMG}${imageprofile}` : "https://ionicframework.com/docs/img/demos/avatar.svg"}
                        />
                        :
                        <Avatar
                          size={'sm'}
                          src={"https://ionicframework.com/docs/img/demos/avatar.svg"}
                        />
                  }
                </MenuButton>
                {
                  // User
                  role == "User" ?
                    <MenuList zIndex={9999}>
                      <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
                      <MenuItem onClick={() => navigate('/editprofile')}>Profile</MenuItem>
                      <MenuItem>Bookings</MenuItem>

                      {password === "NULL" ? (
                        <div>
                          <MenuItem
                            onClick={onBtnLogoutGoogle}
                          >Logout</MenuItem>
                        </div>
                      ) : (
                        <div>

                          <MenuItem onClick={() => navigate('/changepassword')}>Change Password</MenuItem>
                          <MenuItem
                            onClick={onBtnLogout}
                          >Logout</MenuItem>
                        </div>
                      )}
                    </MenuList>
                    :
                    // Tenant
                    role == "Tenant" ?
                      <MenuList zIndex={9999}>
                        <MenuItem onClick={() => navigate('/dashboard')}>Dashboard</MenuItem>
                        <MenuItem onClick={() => navigate('/editprofile')}>Profile</MenuItem>
                        <MenuItem onClick={() => navigate('/changepassword')}>Change Password</MenuItem>
                        <MenuItem>Manage Property / Rooms</MenuItem>
                        <MenuItem>Transaction</MenuItem>
                        <MenuItem>Report</MenuItem>
                        <MenuItem
                          onClick={onBtnLogout}
                        >Logout</MenuItem>
                      </MenuList>
                      :
                      <MenuList zIndex={9999}>
                        <MenuItem onClick={onOpen} maxH={'100vh'}>Login
                          <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={scrollBehavior} >
                            <ModalOverlay />
                            <ModalContent>
                              <ModalCloseButton onClose={onCloseModal} />
                              <ModalBody>
                                {/* login modal */}
                                <Login onOpenModal={onOpenModal} onCloseModal={onCloseModal} /> 
                              </ModalBody>
                            </ModalContent>
                          </Modal>
                        </MenuItem>
                        <MenuItem
                          onClick={() => navigate('/userregister')}
                        >Register</MenuItem>
                      </MenuList>
                }
              </Menu>
            </Flex>
          </Flex>
        </Box>
        <Box>
        </Box>
      </Box>
    </>
  );
}
