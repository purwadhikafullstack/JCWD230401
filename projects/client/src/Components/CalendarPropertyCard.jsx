import React from 'react';
import {
    Box,
    Center,
    Text,
    Image, Flex
} from '@chakra-ui/react';
import axios from 'axios';
import { API_URL, API_URL_IMG } from '../helper';
import { StarIcon } from '@chakra-ui/icons';
import noimage from "../assets/noimage.png";
import { Link } from 'react-router-dom';

export default function CalendarPropertyCard(props) {
    // console.log("props property :", props.property);
    // console.log("props picture :", props.picture);
    // console.log("props uuid :", props.uuid);
    // console.log("props regency :", props.regency);
    // console.log("props price :", props.price);
    // console.log("props rating :", props .rating);
    // console.log("props country :", props.country);

    return (
        <Center
            p='1'
        >
            <Link to={`/property/detail/${props.uuid}`}>
                <Box
                    role={'group'}
                    px={{ base: '2', md: '2', lg: '2' }}
                    py={{ base: '2', md: '2', lg: '2' }}
                    maxW={{ base: '350px', md: '330px', lg: '330px' }}
                    w={'full'}
                    bg='white'
                    borderWidth={'1px'}
                    borderColor='gray.200'
                    boxShadow={'xs'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={0}
                >
                    <Box
                        rounded={'lg'}
                        pos={'relative'}
                        height={'230px'}
                    >
                        <Image
                            rounded={'lg'}
                            height={{ base: '300px', lg: '230px' }}
                            // width={{ base: '400px', lg: '250px' }}
                            objectFit={'cover'}
                            src={!props.picture ? noimage : `${API_URL_IMG}${props.picture}`}
                            aspectRatio={1}
                        />
                    </Box>
                    <Box
                        pt={{ base: '20', lg: '2' }}
                        px='2'
                        align={'start'}
                    >
                        <Text fontWeight={600} fontSize={{ base: 'lg', lg: 'sm' }} isTruncated>
                            {props.property}
                        </Text>
                        <Text fontWeight={'normal'} fontSize={'sm'} color='gray.500'>
                            {props.regency}, {props.country}
                            {/* Jakarta Barat, Indonesia */}
                        </Text>
                        <Flex justifyContent={'space-between'}>
                            <Text fontWeight={600} fontSize={'sm'} textAlign={'left'} display='flex'>
                                {props.price}
                                {/* IDR 1.500.000 */}
                                <Text fontWeight={'normal'} pl='1' fontSize={'sm'}>
                                    / night
                                </Text>
                            </Text>
                            <Flex alignItems={'center'} justifyContent="center">
                                {/* kalo blm ada rating icon bintang sama angkanya ilangin */}
                                <Box>
                                    <StarIcon color={'yellow.500'} fontSize={{ base: 'lg', lg: 'sm' }} mb='1' />
                                </Box>
                                <Text fontWeight={600} fontSize={{ base: 'lg', lg: 'sm' }} textAlign='right' ml='1'>
                                    {props.rating}
                                    {/* 5.0 */}
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Link>
        </Center>
    );
}
