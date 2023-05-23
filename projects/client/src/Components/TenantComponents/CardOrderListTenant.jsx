import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Box,
    Flex,
    Heading,
    Text,
    IconButton,
    Image,
    Button,
    Avatar
} from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function CardOrderListTenant(props) {
    return (
        <Card maxW='xs' rounded={'xl'}>
            <CardHeader mb='0' border={'1px solid black'}>
                <Box spacing='2'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box>
                            <Heading size='sm'>Segun Adebayo</Heading>
                            <Text fontWeight='hairline' fontSize={'sm'}>Today, 12 : 00 PM</Text>
                        </Box>
                    </Flex>
                    <Heading fontSize={'sm'} mt='3'>
                        Apartemen mediterania 3
                    </Heading>
                    <Text fontSize={'sm'} fontWeight='normal'>
                        2 bed room
                    </Text>
                    <Flex justify={'space-between'} alignItems='center'>
                        <Text fontSize={'sm'} fontWeight='light'>Start Date</Text>
                        <Text fontSize={'sm'} fontWeight='hairline'>2023-04-04</Text>
                    </Flex>
                    <Flex justify={'space-between'} alignItems='center'>
                        <Text fontSize={'sm'} fontWeight='light'>Night(s)</Text>
                        <Text fontSize={'sm'} fontWeight='hairline'>3</Text>
                    </Flex>
                    <Text fontSize={'xl'}>Total Paid</Text>
                    <Flex justify={'center'} flexDir='column' alignItems={'center'} w='full'>
                        <Text fontSize={'xl'} >IDR 2.300.000</Text>
                        <Button rounded={'full'} my='3' w='full'>Check Details</Button>
                        <Button rounded={'full'} w='full' >Confirm Order</Button>
                    </Flex>
                </Box>
            </CardHeader>
        </Card>
    )
}
