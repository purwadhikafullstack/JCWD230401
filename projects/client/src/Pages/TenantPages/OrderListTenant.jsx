import React, { useState, useEffect } from 'react'
import {
    Flex, Text, Box, Heading, Link, Stack, useColorModeValue, Input, Button, FormControl, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot,
    Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, MenuDivider
} from '@chakra-ui/react';
// import Sidebar from '../../Components/Sidebar/Sidebar'
// import CardOrderListTenant from '../../Components/TenantComponents/CardOrderListTenant'
import axios from 'axios'
import { API_URL, countDays, formatDateIndo, formatRupiah } from '../../helper'
import Sidebar from '../../Components/Sidebar';
import OrderListCardTenant from '../../Components/TenantComponents/OrderListCardTenant';
import { FaFilter } from 'react-icons/fa';
import Pagination from '../../Components/Pagination';


export default function OrderListTenant() {
    // TOKEN
    let token = localStorage.getItem("tempatku_login");

    // PAGINATION ACTIONS NEEDED
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(5)
    const [sortBy, setSortBy] = useState('id')
    const [order, setOrder] = useState('DESC')
    const [totalData, setTotalData] = useState(0)
    const paginate = (pageNumber) => {
        setPage(pageNumber.selected + 1)
    }

    // DATA FROM getActionsNeeded
    const [actionsNeeded, setActionsNeeded] = useState([]) // all response
    const getActionsNeeded = async () => {
        let get = await axios.get(`${API_URL}/order/getactionsneeded?page=${page}&size=${size}&sortby=${sortBy}&order=${order}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setActionsNeeded(get.data.rows);
        setTotalData(get.data.count);
    }
    console.log("actionsNeeded", actionsNeeded);

    const printCardOrderList = () => {
        return actionsNeeded.map((val, idx) => {
            return <Box p='2' key={idx}>
                <OrderListCardTenant username={val.transaction.user.user_detail.name} userPicture={val.transaction.user.user_detail.image_profile} createdAtTransaction={val.transaction.createdAt} propertyName={val.room.property.property} roomName={val.room.room_category.name} regency={val.room.property.property_location.regency.name} country={val.room.property.property_location.country} startDate={val.start_date} endDate={val.end_date} roomPrice={val.price} />
            </Box>
        })
    }

    // PAGINATION SUMMARY
    const [pageSummary, setPageSummary] = useState(1)
    const [sizeSummary, setSizeSummary] = useState(4)
    const [sortBySummary, setSortBySummary] = useState('id')
    const [orderSummary, setOrderSummary] = useState('DESC')
    const [totalDataSummary, setTotalDataSummary] = useState(0)
    const paginateSummary = (pageNumber) => {
        setPageSummary(pageNumber.selected + 1)
    }

    const [dataSummary, setDataSummary] = useState([])
    const getSummary = async () => {
        let get = await axios.get(`${API_URL}/order/getsummary?page=${pageSummary}&size=${sizeSummary}&sortby=${sortBySummary}&order=${orderSummary}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setDataSummary(get.data.rows);
        setTotalDataSummary(get.data.count);
    }
    console.log("SUMMARY", dataSummary);

    const printTableSummary = () => {
        return dataSummary.map((val, idx) => {
            return (
                <Tr>
                    <Td>{val.transaction.invoice_number}</Td>
                    <Td>{val.transaction.user.user_detail.name}</Td>
                    <Td>{val.room.property.property}</Td>
                    <Td>{val.room.room_category.name}</Td>
                    <Td>{formatDateIndo(val.start_date)}</Td>
                    <Td>{countDays(val.start_date, val.end_date)}</Td>
                    <Td>{formatRupiah(val.price * countDays(val.start_date, val.end_date))}</Td>
                    <Td>{val.transaction.transaction_status.status}</Td>
                    <Td><Button variant={'outline'} colorScheme='red'>Cancel</Button></Td>
                </Tr>
            )
        })
    }

    useEffect(() => {
        getActionsNeeded();
    }, [page, size, sortBy, order])

    useEffect(() => {
        getSummary();
    }, [pageSummary, sizeSummary, sortBySummary, orderSummary])
    return (
        // <Flex>
        //     {/* SIDEBAR */}
        //     <Box>
        //         <Sidebar />
        //     </Box>

        //     {/* CONTENT */}
        //     <Box mx='10' border='1px solid black' minHeight={'100vh'} w='full'>
        //         <Text>Order List</Text>
        //         <Box border='1px solid red' shadow={'xl'} rounded={'xl'} p='3' m='5'>
        //             <Text>Actions Needed</Text>
        //             <Flex flexDir={'column'} w='full' alignItems={'center'}>
        //                 <Flex justifyContent={'space-evenly'} gap='2'>
        //                     <CardOrderListTenant />
        //                     <CardOrderListTenant />
        //                     <CardOrderListTenant />
        //                     <CardOrderListTenant />
        //                     <CardOrderListTenant />
        //                 </Flex>
        //                 <Box>
        //                     Pagination
        //                 </Box>
        //             </Flex>
        //         </Box>
        //     </Box>

        // </Flex>

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
                <Box w='full' flex='5' px={{ base: "1", sm: "4" }} mt='5'>
                    <Heading lineHeight={1.1} mb='5' fontSize={{ base: '2xl', md: '3xl' }} textAlign={{ base: 'center', sm: 'start' }} >
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
                            <Flex align={'center'} overflowX={'auto'}>
                                {/* Client Order List Card */}
                                {actionsNeeded.length ? printCardOrderList() : <Text>Takdee Orderann cekguu</Text>}
                            </Flex>
                            <Flex justify={'center'}>
                                <Pagination size={size}
                                    totalData={totalData}
                                    paginate={paginate} />
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
                                <Menu closeOnSelect={false}>
                                    <MenuButton as={Button}
                                        bg={'#D3212D'}
                                        color={'white'}
                                        _hover={{
                                            bg: '#D3212D',
                                        }}
                                        leftIcon={<FaFilter />} >
                                        Filter
                                    </MenuButton>
                                    <MenuList minWidth='240px'>
                                        <MenuOptionGroup defaultValue='desc' title='Order' type='radio'>
                                            <MenuItemOption value='desc'
                                                onClick={() => {
                                                    setSortBySummary("id");
                                                    setOrderSummary("DESC");
                                                }} >
                                                Newest
                                            </MenuItemOption>
                                            <MenuItemOption value='asc'
                                                onClick={() => {
                                                    setSortBySummary("id");
                                                    setOrderSummary("ASC");
                                                }} >
                                                Oldest
                                            </MenuItemOption>

                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>
                            </Stack>
                            <TableContainer overflowX={'auto'} overflowY={'auto'}>
                                <Table variant='striped' >
                                    <Thead>
                                        <Tr>
                                            <Th>Invoice Number</Th>
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
                                        {printTableSummary()}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Flex justify={'center'}>
                                <Pagination
                                    size={sizeSummary}
                                    totalData={totalDataSummary}
                                    paginate={paginateSummary} />
                            </Flex>
                        </Stack>
                    </Box>
                </Box>
            </Flex>
        </>

    )
}
