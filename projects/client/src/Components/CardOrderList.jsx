import {
    Stack, Text, Button,
    Box,
    Image,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,
    VStack

} from "@chakra-ui/react"
import { AiOutlineRight } from "react-icons/ai"
import { FcLock } from 'react-icons/fc';
import { Link } from "react-router-dom";
import noimage from '../assets/noimage.png';
import { API_URL_IMG, formatDateIndo, formatRupiah } from "../helper";
import { Rating } from '@smastrom/react-rating';
import { useState } from "react";

export default function CardOrderList(props) {
    const diff = new Date(props.end_date) - new Date(props.start_date)
    const days = (diff / 86400000);
    const totalPrice = props.price * days

    function getRating(rating) {
        switch (rating) {
            case 1:
                return 'Poor';
            case 2:
                return 'Nothing special';
            case 3:
                return 'Average';
            case 4:
                return 'Very good';
            case 5:
                return 'Excellent';
            default:
                return 'None';
        }
    }

    function RatingUser() {
        const [rating, setRating] = useState(5);
        const [hoveredRating, setHoveredRating] = useState(0);

        return (
            <Flex style={{ maxWidth: 180, width: '100%' }} alignItems='center'>
                <Rating value={rating} onChange={setRating} onHoverChange={setHoveredRating} />
                <Text>{`${getRating(rating)}`}</Text>
            </Flex>
        );
    }

    function ModalReview() {
        const { isOpen, onOpen, onClose } = useDisclosure()
        return (
            <>
                {/* - jika props.review.length === true berdasarkan id transaksi, isDisable jadikan true
                tapi kalau props.review.length === false, isDisable jadikan false */}
                <Button onClick={onOpen}>Review</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Review</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack>
                                <Textarea
                                    placeholder='Here is a sample placeholder'
                                    size='md'
                                    resize='none'
                                />
                                <Flex>
                                    <Button alignSelf={'end'}>
                                        Send
                                    </Button>
                                    {RatingUser()}

                                </Flex>

                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        )
    }
    return (
        // <Box border='1px solid' borderColor={'gray.200'} rounded='xl'>
        //     <Flex p='5' gap='5'>
        //         <Box flex='1'>
        //             <Link to={`/payment/detail/${props.uuid}`}>
        //                 <Image rounded='xl'
        //                     src={!props.roomPicture[0] ? noimage : `${API_URL_IMG}${props.roomPicture[0].picture}`} />
        //             </Link>
        //         </Box>
        //         <Flex flexDir='column' flex='3' justifyContent={'space-between'}>
        //             <Box>
        //                 <Flex gap='5' alignItems={'center'}>
        //                     <Text fontSize={'2xl'} fontWeight='semibold'>{props.property}</Text>
        //                     <Text fontSize={'sm'} fontWeight='light'>Max {props.capacity} adults</Text>
        //                 </Flex>
        //                 <Text fontSize='md'>{props.room}</Text>
        //                 <Text fontSize='md'>{props.start_date} - {props.end_date}</Text>
        //             </Box>
        //             <Flex gap='10' alignItems={'center'}>
        //                 <Text fontSize='2xl' color='orange.400'>IDR {totalPrice}</Text>
        //                 <Text fontSize='xl' color='orange.400'>{props.status}</Text>
        //                 <Text fontSize='md' >Invoice ID : {props.invoice}</Text>
        //                 {ModalReview()}
        //             </Flex>
        //         </Flex>
        //         <Box h='full' my='auto'>
        //             <Text fontSize={'4xl'}>
        //                 <AiOutlineRight />
        //             </Text>
        //         </Box>
        //     </Flex>
        // </Box>

        <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
            <Stack direction="row" alignItems="center">
                <Text fontWeight="semibold">
                    Invoice : {props.invoice}
                </Text>
                <FcLock />
            </Stack>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                justifyContent="space-between">
                <Box display={{ base: 'block', sm: 'flex' }}>
                    <Link to={`/payment/detail/${props.uuid}`}>
                        <Image rounded='xl'
                            boxSize={{ base: 'max-content', sm: '200px', lg: '200px' }}
                            src={!props.roomPicture[0] ? noimage : `${API_URL_IMG}${props.roomPicture[0].picture}`}
                        />
                    </Link>
                    <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'} px='4'>
                        <Text fontSize={'2xl'} fontWeight='semibold' mt={{ base: '4', sm: '0' }}>
                            {props.property}
                        </Text>
                        <Text mt='4'>
                            <Stack>
                                <Text fontSize={'md'}>
                                    Max {props.capacity} adults
                                </Text>
                                <Text fontSize='md'>
                                    {props.room}
                                </Text>
                                <Text fontSize='md'>
                                    {formatDateIndo(props.start_date)} - {formatDateIndo(props.end_date)}
                                </Text>
                            </Stack>
                            <Text fontSize={{ base: 'xl', sm: '2xl' }} color='orange.400' mt={{ base: '1', sm: '4' }}>
                                {formatRupiah(totalPrice)}
                            </Text>
                        </Text>
                    </Text>
                </Box>
                {/* <Box> */}
                {/* </Box> */}
                <Stack direction={{ base: 'column', md: 'row' }} alignItems={{ sm: 'center' }}>
                    <Button variant='solid' colorScheme="green" mt={{ base: '2', sm: '0' }}>
                        Status : {props.status}
                    </Button>
                    {/* KASIH KONDISI KALO BELOM REVIEW JNAGAN MUNCULIN TOMBOL REVIEW */}
                    {/* - jika end date sudah lewat hari ini, dan transaction_statusId === 3 tampilkan button review */}
                    {ModalReview()}
                </Stack>
            </Stack>
        </Stack>
    )
}
