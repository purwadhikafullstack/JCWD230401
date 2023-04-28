import React from 'react';
import {
  Icon,
  Text,
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
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


export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState('outside');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageprofile = useSelector((state) => state.authReducer.image_profile);
  const role = useSelector((state) => state.authReducer.role);

  const onBtnLogout = () => {
    localStorage.removeItem('tempatku_login');
    dispatch(logoutAction());
    navigate('/', { replace: true });
  }

  return (
    <>
      <Box
        // position="fixed"
        w='full' bg='white' zIndex={1}>
        <Box boxShadow={'xs'} px={{ base: '4', sm: '10' }}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
              {/* Logo Tempatku */}
              <Icon fontSize="40px" as={TbHomeHeart}
                color='#D3212D'
                display={{

                  // base: "none", sm: "none", md: "block" 

                }}
              />
              <Text
                display={{

                  // base: "none", sm: "none", md: "block" 

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
              <Menu >
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
                  <Avatar
                    size={'sm'}
                    src={imageprofile ? `${API_URL_IMG}${imageprofile}` : ""}
                  />
                </MenuButton>
                {
                  // User
                  role == "User" ?
                    <MenuList zIndex={9999}>
                      <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
                      <MenuItem onClick={() => navigate('/editprofile')}>Profile</MenuItem>
                      <MenuItem>Bookings</MenuItem>
                      <MenuItem onClick={() => navigate('/changepassword')}>Change Password</MenuItem>
                      <MenuItem
                        onClick={onBtnLogout}
                      >Logout</MenuItem>
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
                        <MenuItem onClick={() => navigate('/tenantcalendar')}>Calendar</MenuItem>
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
                              <ModalCloseButton />
                              <ModalBody>
                                <Login />
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
