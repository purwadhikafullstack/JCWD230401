import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    Flex, Icon, HStack, Img, Heading
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { MdContentCopy } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';



export default function PaymentDetailComponent() {
    return (
        <>
            {/* Waiting for payment page */}
            <Box
                maxW={'400px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'lg'}
                rounded={'md'}
                overflow={'hidden'}
                >
                <Stack
                    textAlign={'center'}
                    p={3}
                    color={useColorModeValue('gray.800', 'white')}
                    align={'center'}>
                    <Text
                        fontSize={'xs'}
                        fontWeight={500}
                        bg={useColorModeValue('green.50', 'green.900')}
                        p={2}
                        px={3}
                        color={'green.500'}
                        rounded={'full'}>
                        Waiting For Your Payment...
                    </Text>
                    <Stack direction={'column'} align={'center'} justify={'center'}>
                        <Text fontSize={{ base: 'sm' }}>Will expire in :</Text>
                        <Text fontSize={{ base: 'xl'}} fontWeight={800}>
                            02 : 57 : 45
                        </Text>
                        <Text fontSize={{ base: 'sm' }}>Sunday, 16 Aug 2020 12:50 AM</Text>
                    </Stack>
                </Stack>
                <Box 
                bg={useColorModeValue('gray.50', 'gray.900')} 
                px={6} py={6}>
                    <List spacing={3}>
                        <ListItem>
                            <Text textAlign="center" fontSize="sm">
                                Account Name
                            </Text>
                            <Text textAlign="center" fontWeight={'600'} fontSize="md">
                                Anonymous
                            </Text>
                        </ListItem>
                        <Box borderTop={'1px'} borderColor={'gray.300'}></Box>
                        <ListItem>
                            <Flex alignItems="center" justify={'center'}>
                                <Box>
                                </Box>
                                <Box>
                                    <Box>
                                        <Text textAlign="center" fontSize="sm">
                                            Account Number
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text textAlign="center" fontWeight={'600'} fontSize="md">
                                            <ListIcon as={MdContentCopy} color="green.400" fontSize={'xl'} />
                                            0123871210
                                        </Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </ListItem>
                        <Box borderTop={'1px'} borderColor={'gray.300'}></Box>
                        <ListItem>
                            <Flex alignItems="center" justify={'center'}>
                                <Box>
                                </Box>
                                <Box>
                                    <Box>
                                        <Text textAlign="center" fontSize="sm">
                                            Payment Nominal
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text textAlign="center" fontWeight={'600'} fontSize="md">
                                            <ListIcon as={MdContentCopy} color="green.400" fontSize={'xl'} />
                                            IDR 2.500.000
                                        </Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </ListItem>
                    </List>

                    <Button
                        mt={4}
                        w={'full'}
                        bg={'green.400'}
                        color={'white'}
                        _hover={{
                            bg: 'green.500',
                        }}
                        _focus={{
                            bg: 'green.500',
                        }}
                        leftIcon={<Icon as={FiUpload} fontSize={'xl'} />}
                    >
                        <Text textAlign="center" fontWeight={'600'} fontSize="sm">
                        Upload Payment Receipt
                        </Text>
                    </Button>
                    <Button
                        mt={2}
                        w={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        _focus={{
                            bg: 'blue.500',
                        }}
                        leftIcon={<Icon as={AiOutlineEye} fontSize={'xl'} />}
                    >
                         <Text textAlign="center" fontWeight={'600'} fontSize="sm">
                        See your order details
                         </Text>
                    </Button>
                </Box>
            </Box>
            </>
    );
}
