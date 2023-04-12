import { Flex, Text, Box, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import BookingCard from '../Components/BookingCard';
import PaymentMethod from '../Components/PaymentMethod';
import Footer from '../Components/Footer';

export default function TransactionPage() {
    return (
        <>
            
            <Box
                minH={'100vh'}
                align={'center'}
                justify={'center'}
            >
                <Flex
                    direction={{base:'column', lg:'row'}} // Use column direction for small screens, row for larger screens
                    align='center'
                    justify='center'
                    alignItems={{base:'none', lg:"flex-start"}}
                    m='auto'
                >
                    <Box align={'center'}>
                    <PaymentMethod />
                    </Box>
                    <Box>
                    <Box align={'center'}>
                    <Heading fontSize={'4xl'} mt='10'>Booking Details</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        confirm and pay to enjoy your stay at <Link color={'blue.400'}> Hotel Lovina </Link> ✌️
                    </Text>
                        </Box>
                    <BookingCard />
                    </Box>
                </Flex>
            </Box>
                <Footer />

        </>
    )
}