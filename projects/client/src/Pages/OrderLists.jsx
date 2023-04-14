import {
    Box,
    Button,
    Container,
    Flex,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItem,
    MenuDivider,
    Select,
    Image,
    Stack,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import CardOrderList from '../Components/CardOrderList'
import Pagination from '../Components/Pagination'
import { API_URL } from '../helper'



export default function OrderLists() {
    let token = localStorage.getItem("tempatku_login");

    // PAGINATION
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(1)
    const [transactionStatusId, setTransactionStatusId] = useState('')
    const [invoice, setInvoice] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [order, setOrder] = useState('DESC')
    const [start, setStart] = useState('2000-01-01')
    const [end, setEnd] = useState('2030-01-01')
    const [totalData, setTotalData] = useState(0)


    const paginate = (pageNumber) => {
        setPage(pageNumber.selected + 1)
        console.log(pageNumber.selected + 1)
    }

    const [orderList, setOrderList] = useState([])
    const getOrderList = async () => {
        let get = await axios.get(`${API_URL}/order/getallorder?page=${page}&size=${size}&status=${transactionStatusId}&invoice=${invoice}&sortby=${sortBy}&order=${order}&start=${start}&end=${end}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("gett order listt", get.data)
        setOrderList(get.data.data);
        setTotalData(get.data.datanum);
    }
    console.log("order list", orderList.rows);

    const printOrderList = () => {
        return orderList?.rows?.map((val, idx) => {
            return (
                <Link to={`/payment/detail/${val.transaction.uuid}`}>
                    <CardOrderList property={val.room.property.property} capacity={val.room.capacity} room={val.room.room_category.name} price={val.price} end_date={val.end_date} start_date={val.start_date} status={val.transaction.transaction_status.status} invoice={val.transaction.invoice_number} roomPicture={val.room.picture_rooms} />
                </Link>
            )
        })
    }

    useEffect(() => {
        getOrderList();
    }, [page, size, sortBy, order, start, end, transactionStatusId, invoice])
    return (
        <Container maxW={'7xl'}>
            {/* TITLE & FILTER */}
            <Flex justifyContent={'space-between'} alignItems='center' my='5'>
                <Text fontWeight={'bold'} fontSize={'3xl'}>My order</Text>
                <Flex gap='3'>
                    <Input type='text' placeholder='Invoice number' onChange={(e) => setInvoice(e.target.value)} />
                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button}>
                            Filter
                        </MenuButton>
                        <MenuList minWidth='240px'>
                            <MenuOptionGroup title='Filter by'>
                                <MenuItem>
                                    <Input type='date' onChange={(e) => setStart(e.target.value)} />
                                    <Input type='date' onChange={(e) => setEnd(e.target.value)} />
                                </MenuItem>
                            </MenuOptionGroup>
                            <MenuOptionGroup title='Sort by'>
                                <MenuItem onClick={() => {
                                    setSortBy("start_date");
                                    setOrder("DESC");
                                }}>
                                    Last Date
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    setSortBy("start_date");
                                    setOrder("ASC");
                                }}>
                                    First Date
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    setSortBy("id");
                                    setOrder("DESC");
                                }}>
                                    Last Invoice
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    setSortBy("id");
                                    setOrder("ASC");
                                }}>
                                    First Invoice
                                </MenuItem>
                            </MenuOptionGroup>
                            <MenuDivider />
                            <MenuOptionGroup title='Status'>
                                <Select placeholder='Select transaction status' variant='unstyled' pl='9'
                                    onChange={(e) => setTransactionStatusId(e.target.value)}
                                >
                                    <option value='1'>Waiting for payment</option>
                                    <option value='2'>Waiting for confirmation</option>
                                    <option value='3'>Paid</option>
                                    <option value='4'>Reject</option>
                                    <option value='5'>Canceled</option>
                                </Select>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>

                </Flex>
            </Flex>

            {/* CARD ORDER LIST */}
            <Flex flexDir={'column'} gap={'3'}>
                {printOrderList()}
            </Flex>

            {/* PAGINATION */}
            <Flex justifyContent={'center'} mb='20'>
                <Pagination
                    size={size}
                    totalData={totalData}
                    paginate={paginate}
                />
            </Flex>
        </Container>
    )
}
