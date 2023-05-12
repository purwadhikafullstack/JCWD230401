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

export default function RecommendPropertyCard(props) {
    // console.log("props property :", props.property);
    // console.log("props picture :", props.picture);
    // console.log("props uuid :", props.uuid);

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
                    // borderColor='gray.300'
                    borderColor={{base:'white', sm:'gray.300'}}
                    // boxShadow={'xs'}
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
                        <Text fontWeight={'normal'} fontSize={{base:'sm', lg:'xs'}} color='gray.500'>
                            {props.regency}, {props.country}
                        </Text>
                        <Flex justifyContent={'space-between'}>
                            <Text fontWeight={600} fontSize={{base:'sm', lg:'xs'}} textAlign={'left'} display='flex'>
                                {props.price}
                                <Text fontWeight={'normal'} pl='1' fontSize={{base:'sm', lg:'xs'}}>
                                    / night
                                </Text>
                            </Text>
                            <Flex alignItems={'center'} justifyContent="center">
                                <Box>
                                    <StarIcon color={'yellow.500'} fontSize={{ base: 'lg', lg: 'sm' }} mb='1' />
                                </Box>
                                <Text fontWeight={600} fontSize={{ base: 'lg', lg: 'sm' }} textAlign='right' ml='1'>
                                    {props.rating}
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Link>
        </Center>
    );
}
