import { Box, Flex, Text, Button, Select, Input, InputLeftAddon, Icon, InputRightElement, InputLeftElement, InputGroup } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { HiArrowNarrowRight, HiOutlineArrowRight } from "react-icons/hi";
import { useState } from 'react';
import axios from 'axios';

export default function SearchBar() {
    const [inputTypeIn, setInputTypeIn] = useState('text');
    const [inputTypeOut, setInputTypeOut] = useState('text');

    const OnBtnCheckIn = () => {
        setInputTypeIn('date');
    };
    const OnBtnCheckOut = () => {
        setInputTypeOut('date');
    };


    return (
        <>
            <Flex h={{ base: '12', md:'16', lg: '16' }} m='auto' px='1' alignItems={'center'} justifyContent={'space-between'} maxW={{ md: '500px', lg: '900px' }}
                // direction={{ base: 'column', md: 'row' }}
                flexDir={{ base: 'column', lg: 'row' }}
                position='sticky'
            >
                {/* Location Nearby (geolocation) */}
                <Box border={'2px'} borderBottom={'2px'} borderColor='gray.200' h='full' w='full' flex={{ base: 'none', md: '1' }}>
                    <Select placeholder='Where are you going?'
                     h={{base:'12', sm:'16'}} 
                     border={'none'}
                     fontSize={{base:'14', sm:'16'}}
                    >
                        {/* Popular destinations nearby */}
                        <option value='option1'>Ubud</option>
                        <option value='option2'>Bali</option>
                        <option value='option3'>Canggu</option>
                        <option value='option1'>Uluwatu</option>
                        <option value='option2'>Semarang</option>
                        <option value='option3'>Yogyakarta</option>
                    </Select>
                </Box>
                <Box border={'2px'} borderBottom={'2px'} borderColor='gray.200' h='full' w='full' flex={{ base: 'none', md: '2' }}>
                    <Flex justify='space-evenly' >
                        <InputGroup>
                            <Input
                                pl={{ base: '4', md: '2', lg: '10' }}
                                pr={{ base:'1',md: '2', lg: '10' }}
                                variant='unstyled'
                                placeholder="Check in"
                                size="md"
                                type={inputTypeIn}
                                color='black'
                                fontSize={{base:'14', sm:'16'}}
                                outline='none'
                                h={{ base: '12', sm: '16' }}
                                onClick={OnBtnCheckIn}
                            />
                        </InputGroup>

                        <Box m='auto'>
                            <Icon as={HiOutlineArrowRight} />
                        </Box>
                        <InputGroup>
                            <Input
                                pl={{ base: '4', md: '2', lg: '10' }}
                                pr={{ base:'1',md: '2', lg: '10' }}
                                variant='unstyled'
                                placeholder="Check out"
                                size="md"
                                type={inputTypeOut}
                                color='black'
                                fontSize={{base:'14', sm:'16'}}
                                outline='none'
                                h={{ base: '12', sm: '16' }}
                                onClick={OnBtnCheckOut}
                            />
                        </InputGroup>
                    </Flex>
                </Box>
                {/* Guest Quantity and Room Capacity */}
                {/* <Box border={'1px'} h='full' w='full' flex='2'>  
                </Box> */}
                {/* Search Filter Button */}
                <Box border={'2px'} borderBottom={'2px'} borderColor='gray.200' h='full' w='full' flex={{ base: 'none', lg: '1' }}>
                    <Button
                        pointerEvents='visible'
                        leftIcon={<FiSearch color='white' />}
                        as={Button}
                        // size='20'
                        w='full'
                        h='full'
                        variant='outline'
                        bgColor='#D3212D'
                        _hover={{ bg: '#D3212D' }}
                        color='white'
                        _active={{ bg: '#D3212D', color: 'white' }}
                        fontSize={{base:'14', sm:'16'}}
                    > Search </Button>
                </Box>
            </Flex>
        </>
    );
}