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
// import CategorySlider from './CategorySlider';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/auth';


export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState('outside');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageprofile = useSelector((state) => state.authReducer.image_profile);
  const roleId = useSelector((state) => state.authReducer.roleId);

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
              <Button
                variant={'ghost'}
                size={'sm'}
                mr={4}
                // display={{ base: "none", sm: "none", md: "block" }}
                _hover={'none'}
              >
                Become a Tenant
              </Button>
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
                  display={{ base: "none", sm: "none", md: "block" }}
                  _active={'none'}
                >
                  <HamburgerIcon w={6} h={6} mx={2} my={1} color='black' />
                  <Avatar
                    size={'sm'}
                  // src={imageprofile}
                  />
                </MenuButton>
                {
                  // User
                  roleId == 1 ?
                    <MenuList>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>Bookings</MenuItem>
                      <MenuItem onClick={() => navigate('/changepassword')}>Change Password</MenuItem>
                      <MenuItem
                        onClick={onBtnLogout}
                      >Logout</MenuItem>
                    </MenuList>
                    :
                    // Tenant
                    roleId == 2 ?
                      <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Property</MenuItem>
                        <MenuItem>Report</MenuItem>
                        <MenuItem onClick={() => navigate('/changepassword')}>Change Password</MenuItem>
                        <MenuItem
                          onClick={onBtnLogout}
                        >Logout</MenuItem>
                      </MenuList>
                      :
                      <MenuList>
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
          {/* <CategorySlider /> */}
        </Box>
      </Box>
    </>
  );
}
