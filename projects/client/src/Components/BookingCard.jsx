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
    useColorModeValue, Box
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';


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
            
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '580px' }}
                height={{ sm: '476px', md: '22rem' }}
                direction={{ base: 'column', md: 'row' }}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'xs'}
                padding={4}>
                    <Flex flex={1} bg="blue.200">
                        <Image
                            objectFit="cover"
                            boxSize="100%"
                            src={
                                'https://bit.ly/2Z4KKcF'
                            }
                        />
                    </Flex>
                    <Stack
                        flex={1}
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="left"
                        p={1}
                        pt={4}>
                        <Heading fontSize={'2xl'} fontFamily={'body'} align="left">
                            Hotel Lovina
                        </Heading>
                        <Text fontWeight={600} color={'gray.500'} size="sm" mb={4} align="left">
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
                        <Text
                            textAlign={'left'}
                            color={useColorModeValue('gray.700', 'gray.400')}
                        >
                            02 April 2023 - 05 April 2023
                        </Text>
                        <Text
                            textAlign={'left'}
                            color={useColorModeValue('gray.700', 'gray.400')}
                        >
                            Price : IDR 500.000 / night
                        </Text>
                        <Stack align={'left'} justify={'left'} direction={'row'} mt={6}>
                            <Badge
                                px={2}
                                py={1}
                                bg={useColorModeValue('gray.50', 'gray.800')}
                                fontWeight={'400'}>
                                Deluxe Room
                            </Badge>
                            <Badge
                                px={2}
                                py={1}
                                bg={useColorModeValue('gray.50', 'gray.800')}
                                fontWeight={'400'}>
                                2 room
                            </Badge>
                            <Badge
                                px={2}
                                py={1}
                                bg={useColorModeValue('gray.50', 'gray.800')}
                                fontWeight={'400'}>
                                4 guest
                            </Badge>
                            <Badge
                                px={2}
                                py={1}
                                bg={useColorModeValue('gray.50', 'gray.800')}
                                fontWeight={'400'}>
                                3 nights
                            </Badge>
                        </Stack>
                        <Button
                            textAlign={'right'}
                            color='blue.500'
                            textDecoration='underline'
                            variant='unstyled'
                        >
                            edit
                        </Button>

                        <Stack
                            width={'100%'}
                            mt={'2rem'}
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            borderTop={'1px'} borderColor="gray.200"
                        >

                            <Text fontWeight={600} fontSize="lg" mb={4} mt={4}>
                                Total : IDR 3.000.000
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
        </Center>
        </>
    );
}
