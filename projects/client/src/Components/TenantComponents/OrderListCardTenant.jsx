import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { capitalizeFirstWord, formatRupiah } from '../../helper';


export default function OrderListCardTenant(props) {
    const diff = new Date(props.endDate) - new Date(props.startDate)
    const days = (diff / 86400000);
    return (
        <>
            <Box
                minW={'290px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'sm'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
                border='1px'
                borderColor='gray.300'
            >
                <Stack align={'center'} justify={'flex-start'} direction={'row'}>
                    <Avatar
                        size={'lg'}
                        src={
                            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                        }
                        alt={'Avatar Alt'}
                        mb={0}
                        pos={'relative'}
                    />
                    <Box textAlign={'start'}>
                        <Text fontWeight={400} color={'black'} >
                            {props.username}
                        </Text>
                        <Text fontWeight={400} color={'black'} >
                            {new Date(props.createdAtTransaction).toLocaleString('id-ID')}
                        </Text>
                    </Box>
                </Stack>
                <Stack align={'space-between'} justify={'center'} direction={'column'} mt={6}>
                    <Stack align={'flex-start'} direction={'column'}>
                        <Text>{props.propertyName}</Text>
                        <Text>{props.roomName}</Text>
                    </Stack>
                    <Stack align={'center'} justify={'space-between'} direction={'row'}>
                        <Text textAlign={'start'}>{capitalizeFirstWord(props.regency)}</Text>
                        <Text>{props.country}</Text>
                    </Stack>
                    <Stack align={'center'} justify={'space-between'} direction={'row'}>
                        <Text>Start Date</Text>
                        <Text>{new Date(props.startDate).toLocaleDateString('id-ID')}</Text>
                    </Stack>
                    <Stack align={'center'} justify={'space-between'} direction={'row'}>
                        <Text>Night(s)</Text>
                        <Text>{days}</Text>
                    </Stack>
                    <Stack align={'center'} justify={'space-between'} direction={'row'}>
                        <Text>Total</Text>
                        <Text>{formatRupiah(props.roomPrice * days)}</Text>
                    </Stack>s
                </Stack>

                <Stack mt={4} direction={'row'}>
                    <Button
                        // flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        _focus={{
                            bg: 'gray.200',
                        }}
                        variant='outline'
                    >
                        Check Details
                    </Button>
                    <Button
                        // flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'#D3212D'}
                        color={'white'}
                        _hover={{
                            bg: '#D3212D',
                        }}
                        _focus={{
                            bg: '#D3212D',
                        }}>
                        Confirm Order
                    </Button>
                </Stack>
            </Box>
        </>
    )
}