import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    RadioGroup,
    Radio,
    Stack
} from '@chakra-ui/react'
import React from 'react'
import { StarIcon } from '@chakra-ui/icons';
import { MdPeople } from 'react-icons/md';


export default function Payments() {
    return (
        <Box mt='3' px='3'>
            {/* TITLE */}
            <Flex justifyContent={'center'} mb='5'>
                {/* <Text fontSize={'2xl'} fontWeight='bold'>
                    Secure Payment
                </Text> */}
                <Text fontSize={'2xl'} fontWeight='bold'>
                    Booking Details
                </Text>
            </Flex>


            <Flex gap='10' display={{ base: 'block', md: 'flex' }} justifyContent='center' mb='20'>
                {/* PAYMENTS */}
                <Box w={{ base: 'full', md: '50%' }} mb='10'>
                    <Text fontSize={'xl'} mb='3'>
                        Choose Payments :
                    </Text>
                    <RadioGroup>
                        <Stack display='block'>
                            <Accordion allowToggle defaultIndex={[0]}>
                                {/* MANUAL PAYMENT */}
                                <AccordionItem>
                                    <h2 >
                                        <AccordionButton >
                                            <Box as="span" flex='1' textAlign='left' fontWeight={'semibold'}>
                                                <Radio value='1'>
                                                    Bank Transfer
                                                </Radio>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </AccordionPanel>
                                </AccordionItem>

                                {/* CARD PAYMENT */}
                                <AccordionItem isDisabled='true'>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left' fontWeight={'semibold'}>
                                                <Radio value='2' isDisabled>
                                                    Credit / Debit Card
                                                </Radio>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </AccordionPanel>
                                </AccordionItem>

                                {/* DIGITAL PAYMENT */}
                                <AccordionItem isDisabled='true'>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left' fontWeight={'semibold'}>
                                                <Radio value='3' isDisabled>
                                                    Digital Payment
                                                </Radio>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </AccordionPanel>
                                </AccordionItem>

                            </Accordion>
                        </Stack>
                    </RadioGroup>
                </Box>


                {/* CARD PAYMENT DETAIL */}
                <Box px='5' py='3' border={'1px solid black'} rounded='xl'>
                    <Box>
                        <Flex gap='3' my='3' justifyContent={'center'}>

                            {/* BOX 1 */}
                            <Box flex='1'>
                                <Image src='https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                                    w='full' h='120px' objectFit={'cover'} />
                            </Box>

                            {/* BOX 2 */}
                            <Box flex='2'>
                                <Text fontSize={'2xl'}>Balinese Villa</Text>
                                {/* RATING */}
                                <Flex my='2'>
                                    <StarIcon color='yellow.500' />
                                    <StarIcon color='yellow.500' />
                                    <StarIcon color='yellow.500' />
                                    <StarIcon color='yellow.500' />
                                    <StarIcon color='gray.500' />
                                </Flex>
                                <Text fontSize={'sm'} fontWeight='light'>Ubud, Bali</Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Box bgColor={'#feefef'} p='3' mb='3'>
                        <Text textAlign={'center'} fontSize='sm'>Book your property before they are all gone.</Text>
                    </Box>

                    {/* BOOKING DATE */}
                    <Box p='3'>
                        <Flex justify={'space-between'}>
                            <Text>02 April 2023 -  05 April 2023</Text>
                            <Text>3 night</Text>
                        </Flex>
                        <Text>
                            1x Villa (All In)
                        </Text>
                    </Box>
                    <hr />

                    {/* CAPACITY */}
                    <Box my='3'>
                        <Flex gap='3' alignItems={'center'}>
                            <Text fontSize={'3xl'}><MdPeople /></Text>
                            <Text>Max 6 adults</Text>
                        </Flex>
                    </Box>
                    <hr />

                    {/* PRICE */}
                    <Box my='3'>
                        <Text fontSize={'2xl'}>Total : Rp 1.500.000</Text>
                    </Box>

                    {/* BUTTON */}
                    <Flex justifyContent={'center'} w='full' mt='5' mb='8'>
                        <Button w='full' colorScheme={'red'}>
                            Confirm
                        </Button>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}
