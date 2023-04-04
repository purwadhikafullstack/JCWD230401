import { Box, Container, Text, Flex, UnorderedList, ListItem, useDisclosure, Button, Collapse, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import DatePickerCalendar from '../../Components/DatePickerCalendar'
import Footer from '../../Components/Footer'
import RoomCard from '../../Components/RoomCard'
import SwiperCarousel from '../../Components/SwiperCarousel/SwiperCarousel'

export default function PropertyDetail() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Container
            maxW={{ base: 'xl', sm: '2xl', md: '4xl', lg: '6xl' }}
            pt={'0'}
        >

            {/* SEARCH BAR */}
            <Box mt='3'>
                <Flex justifyContent={'end'}>
                    <Button onClick={onToggle} backgroundColor='#d3212d' color='white'>Change Search</Button>
                </Flex>
                <Collapse in={isOpen} animateOpacity>
                    <Box
                        p='5'
                        color='white'
                        mt='4'
                        bg='gray.500'
                        rounded='md'
                        shadow='xl'
                    >
                        <Box>
                            <Text color='white' fontWeight={'semibold'}>Hotel name</Text>
                            <Input border={'1px solid black'} />
                        </Box>
                        <Flex gap='5'>
                            <Box>
                                <Text color='white' fontWeight={'semibold'}>Check In</Text>
                                <Input border={'1px solid black'} type='date' />
                            </Box>
                            <Box>
                                <Text color='white' fontWeight={'semibold'}>Check Out</Text>
                                <Input border={'1px solid black'} type='date' />
                            </Box>
                            <Box>
                                <Text color='white' fontWeight={'semibold'}>Guest</Text>
                                <Input border={'1px solid black'} type='number' />
                            </Box>
                        </Flex>
                        <Box>
                            <Text color='white' fontWeight={'semibold'}>City</Text>
                            <Flex gap='3'>
                                <Box w='75%'>
                                    <Input border={'1px solid black'} type='text' />
                                </Box>
                                <Box w='25%'>
                                    <Button backgroundColor={'#d3212d'} w='full'>Search</Button>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Collapse>

            </Box>
            {/* PROPERTY NAME */}
            <Box>
                <Text fontSize={'4xl'}>
                    Apartemen Medit 8
                </Text>
                <Flex gap={'3'} fontSize='sm'>
                    <Text>5.0 </Text>
                    <Text>7 Review </Text>
                    <Text>Bali, Indonesia</Text>
                </Flex>

                <Box h='650px'>
                    <SwiperCarousel />
                </Box>
            </Box>

            {/* FACILITIES */}
            <Box>
                <Text fontSize={'4xl'}>
                    Facilities
                </Text>
                <Flex justifyContent={'space-evenly'} mb='5'>
                    <Box>
                        <Text>
                            Hotel Services
                        </Text>
                        <UnorderedList>
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                    </Box>
                    <Box>
                        <Text>
                            Hotel Services
                        </Text>
                        <UnorderedList>
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                    </Box>
                    <Box>
                        <Text>
                            Hotel Services
                        </Text>
                        <UnorderedList>
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                    </Box>
                </Flex>
                <Flex justifyContent={'space-evenly'} mb='5'>
                    <Box>
                        <Text>
                            Hotel Services
                        </Text>
                        <UnorderedList>
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                    </Box>
                    <Box>
                        <Text>
                            Hotel Services
                        </Text>
                        <UnorderedList>
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                    </Box>
                    <Box>
                        <Text>
                            Hotel Services
                        </Text>
                        <UnorderedList>
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                    </Box>
                </Flex>
            </Box>

            {/* CALENDAR */}
            <Flex justify={'center'}>
                    <DatePickerCalendar startDate={startDate} setStartDate={setStartDate}
                        endDate={endDate} setEndDate={setEndDate} />
            </Flex>

            {/* LOOPING ROOM CARD */}
            <Box>
                <Text fontSize={'4xl'} mb='5'>Available Room Types in Apartemen Medit 8 </Text>
                <RoomCard />
                <RoomCard />
                <RoomCard />
            </Box>

            {/* REVIEW */}
            <Box>
                <Text fontSize={'4xl'}>Review</Text>
                <Flex h='400px'>
                    <Box flex='1' backgroundColor={'red'}>
                        <Text>test</Text>
                    </Box>
                    <Box flex='2' backgroundColor={'blue'}>
                        <Text>test</Text>
                    </Box>
                </Flex>
            </Box>

            {/* TENANT INFO */}
            <Box py='5'>
                <Text fontSize={'4xl'}>Hosted By .....</Text>
                <Box w='50%' h='400px' backgroundColor={'gray'}>

                </Box>
            </Box>

            {/* THINGS TO KNOW */}
            <Box>
                <Text fontSize={'4xl'}>
                    Things To Know
                </Text>
                <Flex justifyContent={'space-evenly'} mb='5'>
                    <Box>
                        <Text>
                            Rules
                        </Text>
                        <UnorderedList>
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                    </Box>
                    <Box>
                        <Text>
                            Health $ Safety
                        </Text>
                        <UnorderedList>
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                    </Box>
                    <Box>
                        <Text>
                            Cancellation Policy
                        </Text>
                        <UnorderedList>
                            <ListItem>Lorem ipsum dolor sit amet</ListItem>
                            <ListItem>Consectetur adipiscing elit</ListItem>
                            <ListItem>Integer molestie lorem at massa</ListItem>
                            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                        </UnorderedList>
                    </Box>
                </Flex>
            </Box>

            {/* FOOTER */}
            <Footer />

        </Container>
    )
}
