import {
    Box,
    Flex,
    Text,
    Button,
    Input,
    Stack,
    List,
    ListItem,
    ListIcon,
    useColorModeValue,
    Icon,
    HStack,
    Img,
    Heading,
    Center,
} from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react'
import { BiTimeFive } from "react-icons/bi";
import Countdown, { zeroPad } from "react-countdown";
import axios from 'axios';
import { API_URL } from '../helper';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { FiUpload } from 'react-icons/fi';
import { MdContentCopy } from 'react-icons/md';


export default function PaymentDetail() {
    // console.log(Date.now())
    // console.log(Date.now())
    const params = useParams();
    let token = localStorage.getItem("tempatku_login");
    const [data, setData] = useState([])
    const [expiredTime, setExpiredTime] = useState(null)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState(0)
    const [bank, setBank] = useState(null)
    const [transactionStatus, setTransactionStatus] = useState(null)
    const getTransactionTimeAndBank = async () => {
        let get = await axios.post(`${API_URL}/transaction/detail`, {
            uuid: params.uuid
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("getttttt", get)
        setData(get.data);
        setExpiredTime(get.data.timeAndPrice[0].createdAt)
        setStartDate(get.data.timeAndPrice[0].orders[0].start_date)
        setEndDate(get.data.timeAndPrice[0].orders[0].end_date)
        setPrice(get.data.timeAndPrice[0].orders[0].price)
        setBank(get.data.bank[0].user_detail)
        setTransactionStatus(get.data.timeAndPrice[0].transaction_status.status)
    }

    const diff = new Date(endDate) - new Date(startDate)
    const days = (diff / 86400000);

    const addTwoHours = new Date(expiredTime).getTime() + 7200000
    console.log("addTwoHours", new Date(addTwoHours).toISOString())


    // BUAT API LAGI UNTUK CEK SAAT COMPLETED TRANSACTIONNYA UDAH DI BAYAR APA BELOM
    // KALO BELOM, EXECUTE API UNTUK UPDATE transaction_statusId di tabel transaction
    console.log("dataa", data);
    console.log("timeee", expiredTime);
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <Stack
                    textAlign={'center'}
                    p={6}
                    align={'center'}>
                    <Text
                        fontSize={'sm'}
                        fontWeight={500}
                        p={2}
                        px={3}
                        color={'green.500'}
                        rounded={'full'}>
                        Your Payment...
                    </Text>
                    <Stack direction={'column'} align={'center'} justify={'center'}>
                        <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight={800}>
                            Transaction time has expired!
                        </Text>
                        <Text fontSize={{ base: 'xl', md: '2xl' }}>{new Date(addTwoHours).toString('en-US', { timeZone: 'Asia/Jakarta' }).split('G')[0]}</Text>
                    </Stack>
                </Stack>
            )
        } else {
            return (
                // <Box>
                //     <Flex justify={'center'} alignItems='center' flexDir={'column'}>
                //         <Text fontSize='8xl'><BiTimeFive /></Text>
                //         <Text fontSize='2xl'>Waiting For Your Payment...</Text>
                //         <Text color={'red'} fontSize='2xl'>
                //             {zeroPad(hours, [2])}:{zeroPad(minutes, [2])}:{zeroPad(seconds, [2])}
                //         </Text>
                //     </Flex>
                // </Box>

                <Stack
                    textAlign={'center'}
                    p={6}
                    align={'center'}>
                    <Text
                        fontSize={'sm'}
                        fontWeight={500}
                        p={2}
                        px={3}
                        color={'green.500'}
                        rounded={'full'}>
                        Waiting For Your Payment...
                    </Text>
                    <Stack direction={'column'} align={'center'} justify={'center'}>
                        <Text fontSize={{ base: 'xl', md: '2xl' }}>Will expire in :</Text>
                        <Text fontSize={{ base: '4xl', md: '6xl' }} fontWeight={800}>
                            {zeroPad(hours, [2])}:{zeroPad(minutes, [2])}:{zeroPad(seconds, [2])}
                        </Text>
                        <Text fontSize={{ base: 'xl', md: '2xl' }}>{new Date(addTwoHours).toString('en-US', { timeZone: 'Asia/Jakarta' }).split('G')[0]}</Text>
                    </Stack>
                </Stack>
            );
        }
    };

    const CountDownWrapper = () => <Countdown
        date={new Date(expiredTime).getTime() + 7200000}
        renderer={renderer}
        zeroPadDays={2}
    />
    const MemoCountDown = React.memo(CountDownWrapper)

    const inputImagePayment = useRef()
    const [fileImagePayment, setFileImagePayment] = useState(null)

    console.log("fileImagePayment", fileImagePayment)
    const [message, setMessage] = useState('')
    const uploadImagePayment = async () => { // TANYA CARA GABUNGIN FUNGSI INI DI ONCLICK INPUT GMN ???
        try {
            let formData = new FormData();
            formData.append('images', fileImagePayment)

            let add = await axios.post(`${API_URL}/transaction/uploadimagepayment/${params.uuid}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (add.data.success) {
                // setFileImagePayment(null);
                setMessage("Image Uploaded")
            }
        } catch (error) {

        }
    }

    const onChangeImagePayment = (event) => {
        const maxSize = 1 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            alert("You can only upload files that are lower than 1MB in size.")
        } else {
            setFileImagePayment(event.target.files[0]);
            uploadImagePayment();
        }
    }


    useEffect(() => {
        getTransactionTimeAndBank();
    }, [])
    // const []
    return (
        // <Box mt='3'>
        //     {/* COUNTDOWN */}
        //     <MemoCountDown />
        //     <Box border={'1px solid black'} maxWidth='xl' mx='auto' h='sm'>
        //         <Flex justifyContent={'center'} alignItems='center' flexDir={'column'} gap='5' h='full'>
        //             <Text>Total payment : {days * price}</Text>
        //             <Text>Nama rek : {bank?.name}</Text>
        //             <Text>No rek : {bank?.account_number}</Text>
        //             <Button
        //                 colorScheme={'red'}
        //                 variant='link'
        //                 onClick={() => inputImagePayment.current.click()}>
        //                 <Input type={'file'} display='none' id='file' ref={inputImagePayment}
        //                     onChange={onChangeImagePayment} />
        //                 Upload photo
        //             </Button>
        //             {message == '' ? null : <Text>{message}</Text>}
        //             <Link to='/order/list'>
        //                 <Button>See your order list</Button>
        //             </Link>
        //         </Flex>
        //     </Box>
        // </Box>

        <Box
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
            p={5}
        >

            {/* Waiting for payment page */}
            <Box
                maxW={'500px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'lg'}
                rounded={'md'}
                overflow={'hidden'}
            >
                {/* <Stack
                    textAlign={'center'}
                    p={6}
                    color={useColorModeValue('gray.800', 'white')}
                    align={'center'}>
                    <Text
                        fontSize={'sm'}
                        fontWeight={500}
                        bg={useColorModeValue('green.50', 'green.900')}
                        p={2}
                        px={3}
                        color={'green.500'}
                        rounded={'full'}>
                        Waiting For Your Payment...
                    </Text>
                    <Stack direction={'column'} align={'center'} justify={'center'}>
                        <Text fontSize={{ base: 'xl', md: '2xl' }}>Will expire in :</Text>
                        <Text fontSize={{ base: '4xl', md: '6xl' }} fontWeight={800}>
                            02 : 57 : 45
                        </Text>
                        <Text fontSize={{ base: 'xl', md: '2xl' }}>Sunday, 16 Aug 2020 12:50 AM</Text>
                    </Stack>
                </Stack> */}
                <MemoCountDown />
                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={5}>
                    <List spacing={6}>
                        <ListItem>
                            <Text textAlign="center">
                                Account Name
                            </Text>
                            <Text textAlign="center" fontWeight={'600'} fontSize="2xl">
                                {bank?.name}
                            </Text>
                        </ListItem>
                        <Box borderTop={'2px'} borderColor={'gray.300'}></Box>
                        <ListItem>
                            {/* BUAT USECLIPBOARD UNTUK TOMBOL COPY */}
                            <Flex alignItems="center" justify={'center'}>
                                <Box>
                                </Box>
                                <Box>
                                    <Box>
                                        <Text textAlign="center">
                                            Account Number
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text textAlign="center" fontWeight={'600'} fontSize="2xl">
                                            <ListIcon as={MdContentCopy} color="green.400" fontSize={'2xl'} />
                                            {bank?.account_number}
                                        </Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </ListItem>
                        <Box borderTop={'2px'} borderColor={'gray.300'}></Box>
                        <ListItem>
                            <Flex alignItems="center" justify={'center'}>
                                <Box>
                                </Box>
                                <Box>
                                    <Box>
                                        <Text textAlign="center">
                                            Payment Nominal
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text textAlign="center" fontWeight={'600'} fontSize="2xl">
                                            <ListIcon as={MdContentCopy} color="green.400" fontSize={'2xl'} />
                                            IDR {days * price}
                                        </Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </ListItem>
                        <Box borderTop={'2px'} borderColor={'gray.300'}></Box>
                        <ListItem>
                            <Flex alignItems="center" justify={'center'}>
                                <Box>
                                </Box>
                                <Box>
                                    <Box>
                                        <Text textAlign="center">
                                            Payment status
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text textAlign="center" fontWeight={'600'} fontSize="2xl">
                                            {transactionStatus}
                                        </Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </ListItem>
                    </List>

                    {/* BUAT KONDISI KALO EXPIRED UDAH LEWAT BUTTON NYA ILANG */}
                    <Button
                        mt={10}
                        w={'full'}
                        bg={'green.400'}
                        color={'white'}
                        // rounded={'xl'}
                        _hover={{
                            bg: 'green.500',
                        }}
                        _focus={{
                            bg: 'green.500',
                        }}
                        leftIcon={<Icon as={FiUpload} fontSize={'xl'} />}
                        onClick={() => inputImagePayment.current.click()}
                    >
                        <Input type={'file'} display='none' id='file' ref={inputImagePayment}
                            onChange={onChangeImagePayment} />
                        Upload Payment Receipt
                    </Button>

                    {message == '' ? null : <Text>{message}</Text>}

                    <Link to='/order/list'>
                        <Button
                            mt={2}
                            w={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            // rounded={'xl'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            _focus={{
                                bg: 'blue.500',
                            }}
                            leftIcon={<Icon as={AiOutlineEye} fontSize={'xl'} />}
                        >
                            See your order details
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}
