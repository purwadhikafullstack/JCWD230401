import { React } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Text, Image, HStack
} from '@chakra-ui/react';
import Hotel from '../assets/Hotel.png';
import House from '../assets/House.png';
import Resort from '../assets/Resort.png';
import Apartment from '../assets/Apartment.png';
import Guesthouse from '../assets/Guesthouse.png';
import Villa from '../assets/Villa.png';


export default function CategorySlider() {
  return (
    <>
      <Box bg='white' px={{ base: '0', md: '0', lg: '20' }} boxShadow={'xs'}>
        <Flex overflow='auto' h={16} px={{ base: '10', lg: '20' }} alignItems={'center'} justifyContent={{ base: 'space-evenly' }} >
          <Box cursor={'pointer'} >
            <Image src={Hotel}></Image> <Text fontSize={'12'}>Hotel</Text>
          </Box>
          <Box>
            <Box cursor={'pointer'}>
            <Image src={Villa}
             mt='-2' ml={{ base: '3', sm: '3', lg: '0' }}
              ></Image>
            <Text fontSize={'12'}
              ml={{ base: '6', lg: '3' }}
              mt='-1.5'
            >Villa</Text>
            </Box>
          </Box>
          <Box cursor={'pointer'}>
            <Image src={House}></Image> <Text fontSize={'12'}>House</Text>
          </Box>
          <Box>
            <Box cursor={'pointer'}>
            <Image src={Resort} 
            mt='-1' ml={{ base: '4', lg: '0' }}
            ></Image> 
            <Text 
            fontSize={'12'} 
            mt='-2.5' ml={{ base: '6', lg: '1' }} 
            >
              Resort</Text>
            </Box>
          </Box>
          <Box cursor={'pointer'}>
            <Image src={Apartment}></Image> <Text fontSize={'12'} ml='-3'>Apartment</Text>
          </Box>
          <Box cursor={'pointer'}>
            <Image src={Guesthouse}></Image> <Text fontSize={'12'} ml='-3'>Guesthouse</Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}