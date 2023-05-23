import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue, Box, Icon
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { MdOutlineCancel } from 'react-icons/md';

export default function BookingCard() {
    const property = {
        rating: 4,
    }
    return (
        <>
            <Center
                py={12}
            >
                <Stack
                    borderRadius="lg"
                    w={{ sm: '100%', md: '350px' }}
                    height={{ sm: '476px', md: '22rem' }}
                    direction={{
                        base: 'column'
                        , md: 'row'
                    }}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'lg'}
                    p={5}
                >
                    <Stack
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="left"
                    >
                        <Flex>
                            <Box>
                                <Stack
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="left"
                                >
                                    <Heading fontSize={'2xl'} fontFamily={'body'} align="left">
                                        Hotel Lovina
                                    </Heading>
                                    <Text fontWeight={600} color={'gray.500'} size="sm" align="left">
                                        Bali, Indonesia
                                    </Text>
                                    <Box display='flex' alignItems='right'>
                                        {Array(5)
                                            .fill('')
                                            .map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    color={i < property.rating ? 'yellow.500' : 'gray.300'}
                                                />
                                            ))}
                                    </Box>
                                    <Text align="left"> 30 reviews</Text>
                                </Stack>
                            </Box>
                            <Box flex={1}
                                align="right"
                            >
                                <Image
                                    objectFit="cover"
                                    boxSize="25%"
                                    w='120px'
                                    h='100px'
                                    src={
                                        'https://bit.ly/2Z4KKcF'
                                    }
                                />
                            </Box>
                        </Flex>
                        <Text
                            textAlign={'left'}
                        >
                            02 April 2023 - 05 April 2023
                        </Text>
                        <Text
                            textAlign={'left'}
                        >
                            IDR 500.000 / night
                        </Text>
                        <Stack align={'left'} justify={'left'} direction={'row'} mt={6}>
                            <Badge
                                px={2}
                                py={1}
                                bg={'green.400'}
                                color='white'
                                fontWeight={'400'}>
                                2 Deluxe Rooms
                            </Badge>
                            <Badge
                                px={2}
                                py={1}
                                bg={'green.400'}
                                color='white'
                                fontWeight={'400'}>
                                Max. 4 adults
                            </Badge>
                            <Badge
                                px={2}
                                py={1}
                                bg={'green.400'}
                                color='white'
                                fontWeight={'400'}>
                                3 nights
                            </Badge>
                        </Stack>


                        <Stack
                            width={'100%'}
                            mt={'2rem'}
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            borderTop={'1px'} borderColor="gray.200"
                        >

                            <Button
                                color='white'
                                variant='solid'
                                mt='4'
                                w='full'
                                // bg={'#D3212D'}
                                // _hover={{
                                //     bg: '#D3212D',
                                // }}
                                bg={'blue.500'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                _focus={{
                                    bg: 'blue.500',
                                }}
                                leftIcon={<Icon as={MdOutlineCancel} fontSize={'xl'} />}
                            >
                                Cancel Order
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Center>
        </>
    );
}
