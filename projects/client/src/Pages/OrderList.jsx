import { Flex, Text, Box, Heading, Link, Stack, useColorModeValue, Input, Button, FormControl, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';
import React from 'react';
import Sidebar from "../Components/Sidebar";
import OrderListCard from '../Components/OrderListCard';
import { FaFilter } from 'react-icons/fa';

export default function OrderList() {
    return (
        <>
            <Flex
                minH={'100vh'}
            // align={'center'}
            // justify={'center'}
            // p={12}
            >
                {/* Left Content */}
                <Box>
                    <Sidebar />
                </Box>
                {/* Right Content */}
                <Box w='full' flex='5'  px={{base:"1",sm:"4"}} mt='5'>
                    <Heading lineHeight={1.1} mb='5' fontSize={{ base: '2xl', md: '3xl' }} textAlign={{base:'center', sm:'start'}} >
                        Order List
                    </Heading>
                    {/* Actions Needed */}
                    <Box w='full'>
                        <Stack
                            spacing={4}
                            w={'full'}
                            maxW={'1000px'}
                            rounded={'xl'}
                            boxShadow={'lg'}
                            border='1px'
                            borderColor='gray.300'
                            p={6}
                            my={2}

                        >
                            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                                Action(s) Needed
                            </Heading>
                            <Flex align={'center'} justify={'space-between'} overflowX={'auto'}>
                                {/* Client Order List Card */}
                                <Box p='2'>
                                    <OrderListCard />
                                </Box>
                                <Box p='2'>
                                    <OrderListCard />
                                </Box>
                                <Box p='2'>
                                    <OrderListCard />
                                </Box>
                                <Box p='2'>
                                    <OrderListCard />
                                </Box>
                            </Flex>
                        </Stack>
                    </Box>
                    {/* Summary */}
                    <Box>
                        <Stack
                            spacing={4}
                            w={'full'}
                            maxW={'1000px'}
                            rounded={'xl'}
                            boxShadow={'lg'}
                            border='1px'
                            borderColor='gray.300'
                            p={6}
                            my={2}
                        >
                            <Stack align={'center'} justify={'space-between'} direction={'row'} >
                                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                                    Summary
                                </Heading>
                                <Button
                                    bg={'#D3212D'}
                                    color={'white'}
                                    _hover={{
                                        bg: '#D3212D',
                                    }}
                                    leftIcon={<FaFilter />}
                                >
                                    Filter
                                </Button>
                            </Stack>
                            <TableContainer overflowX={'auto'} overflowY={'auto'}>
                                <Table variant='striped' >
                                    <Thead>
                                        <Tr>
                                            <Th>User</Th>
                                            <Th>Property</Th>
                                            <Th>Room</Th>
                                            <Th>Start Date</Th>
                                            <Th>Night(s)</Th>
                                            <Th>Price</Th>
                                            <Th>Status</Th>
                                            <Th>Edit</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Ann</Td>
                                            <Td>Springville Apartment</Td>
                                            <Td>Deluxe Room</Td>
                                            <Td>01/01/2023</Td>
                                            <Td>5</Td>
                                            <Td>IDR 3.000.000</Td>
                                            <Td>Processed</Td>
                                            <Td>Edit</Td>
                                        </Tr>
                                        <Tr>
                                        <Td>Ann</Td>
                                            <Td>Springville Apartment</Td>
                                            <Td>Deluxe Room</Td>
                                            <Td>01/01/2023</Td>
                                            <Td>5</Td>
                                            <Td>IDR 3.000.000</Td>
                                            <Td>Cancelled</Td>
                                            <Td>Edit</Td>
                                        </Tr>
                                        <Tr>
                                        <Td>Ann</Td>
                                            <Td>Springville Apartment</Td>
                                            <Td>Deluxe Room</Td>
                                            <Td>01/01/2023</Td>
                                            <Td>5</Td>
                                            <Td>IDR 3.000.000</Td>
                                            <Td>Processed</Td>
                                            <Td>Edit</Td>
                                        </Tr>
                                        <Tr>
                                        <Td>Ann</Td>
                                            <Td>Springville Apartment</Td>
                                            <Td>Deluxe Room</Td>
                                            <Td>01/01/2023</Td>
                                            <Td>5</Td>
                                            <Td>IDR 3.000.000</Td>
                                            <Td>Processed</Td>
                                            <Td>Edit</Td>
                                        </Tr>
                                    </Tbody>
                    
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}