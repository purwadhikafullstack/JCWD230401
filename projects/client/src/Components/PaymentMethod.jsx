import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, Image, Icon, Select
} from '@chakra-ui/react';
import React from 'react';
import CardImage from "../assets/card_img.png";
import { LockIcon } from '@chakra-ui/icons'

export default function PaymentMethod() {

    return (
        <>
            <Stack spacing={8}
                //  mx={'auto'} 
                w={{ sm: '100%', md: '580px' }}
                py={12}
                px={{ base: '0', lg: '6' }}
            >
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'xs'}
                    p={8}>
                    <Heading fontSize={'2xl'} fontFamily={'body'} align="left" mb='8'>
                        Payment Method
                    </Heading>
                    <Box mb='8' align='left'>
                        <Image
                            src={
                                CardImage
                            }
                            w="200px" h="30px"
                        />
                    </Box>
                    <Stack spacing={4}>
                        <FormControl id="paymentMethod" w='50%'>
                            <FormLabel>Pay with</FormLabel>
                            <Select>
                                <option value="creditCard">Credit Card</option>
                                <option value="debitCard">Debit Card</option>
                                <option value="paypal">PayPal</option>
                            </Select>
                        </FormControl>
                        <HStack >
                                <FormControl id="Name">
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" />
                                </FormControl>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Input type="email" />
                                </FormControl>

                        </HStack>
                        <FormControl id="cardinfo">
                            <FormLabel>Card Info</FormLabel>
                            <Input type="text" placeholder='Card number' />
                        </FormControl>
                        <HStack>
                                <FormControl id="expiration">
                                    <Input type="text" placeholder='Expiration' />
                                </FormControl>
                          
                                <FormControl id="cvv">
                                    <Input type="text" placeholder='CVV' />
                                </FormControl>
                        </HStack>
                        <HStack>
                                <FormControl id="billing">
                                    <FormLabel>Billing Info</FormLabel>
                                    <Input type="text" placeholder='ZIP code' />
                                </FormControl>
                            
                                <FormControl id="country">
                                    <FormLabel>Country/region</FormLabel>
                                    <Input type='text' />
                                </FormControl>
                        </HStack>
                        <HStack pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                leftIcon={<Icon as={LockIcon} />}
                            >
                                Done
                            </Button>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                color={'#D3212D'}
                                variant='outline'
                            >
                                Cancel
                            </Button>
                        </HStack>
                        <Stack pt={6}>
                            <Text align={'center'} cursor={'pointer'} color={'blue.400'} _hover={{ textDecoration: 'underline' }}>
                                Use a different payment method
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}