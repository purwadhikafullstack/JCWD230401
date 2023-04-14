import {
    Box,
    Image,
    Flex,
    Text
} from "@chakra-ui/react"
import { AiOutlineRight } from "react-icons/ai"
import noimage from '../assets/noimage.png';
import { API_URL_IMG } from "../helper";


export default function CardOrderList(props) {
    const diff = new Date(props.end_date) - new Date(props.start_date)
    const days = (diff / 86400000);
    const totalPrice = props.price * days
    return (
        <Box border='1px solid' borderColor={'gray.200'} rounded='xl'>
            <Flex p='5' gap='5'>
                <Box flex='1'>
                    <Image rounded='xl'
                        src={!props.roomPicture[0] ? noimage : `${API_URL_IMG}${props.roomPicture[0].picture}`} />
                </Box>
                <Flex flexDir='column' flex='3' justifyContent={'space-between'}>
                    <Box>
                        <Flex gap='5' alignItems={'center'}>
                            <Text fontSize={'2xl'} fontWeight='semibold'>{props.property}</Text>
                            <Text fontSize={'sm'} fontWeight='light'>Max {props.capacity} adults</Text>
                        </Flex>
                        <Text fontSize='md'>{props.room}</Text>
                        <Text fontSize='md'>{props.start_date} - {props.end_date}</Text>
                    </Box>
                    <Flex gap='10' alignItems={'center'}>
                        <Text fontSize='2xl' color='orange.400'>IDR {totalPrice}</Text>
                        <Text fontSize='xl' color='orange.400'>{props.status}</Text>
                        <Text fontSize='md' >Invoice ID : {props.invoice}</Text>
                    </Flex>
                </Flex>
                <Box h='full' my='auto'>
                    <Text fontSize={'4xl'}>
                        <AiOutlineRight />
                    </Text>
                </Box>
            </Flex>
        </Box>
    )
}
