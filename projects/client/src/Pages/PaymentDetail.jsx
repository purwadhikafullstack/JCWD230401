import {
    Box,
    useColorModeValue,
} from '@chakra-ui/react';
import PaymentDetailComponent from '../Components/PaymentDetailComponent';
import BookingDetails from '../Components/BookingDetails';


export default function PaymentDetail() {
    return (
        <Box
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            display={{ base: 'block', lg: 'flex' }} //responsive
            bg={useColorModeValue('gray.50', 'gray.800')}
            p={{ lg: '12' }}
            pt={'12'}
            style={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <Box w='full' display='flex' flexDirection={['column', 'column', 'column', 'row']}>
            <Box order={[2, 2, 2, 1]} w='full' m='auto'>
                <BookingDetails />
            </Box>
            <Box order={[1, 1, 1, 2]} m='auto' mb='0'>
                <PaymentDetailComponent />
            </Box>
            </Box>
        </Box>
    );
}
