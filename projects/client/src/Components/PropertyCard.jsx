import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image, Flex, HStack
} from '@chakra-ui/react';
import { BsStarFill } from "react-icons/bs";

const IMAGE =
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80';

export default function PropertyCard() {
    return (
        <Center
        p='1'
        >
            <Box
                role={'group'}
                px={{ base: '2', md: '2', lg: '2' }}
                py={{ base: '2', md: '2', lg: '2' }}
                maxW={{ base: '350px', md: '330px', lg: '330px' }}
                w={'full'}
                bg='white'
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
                        src={IMAGE}
                    />
                </Box>
                <Box
                    pt={{ base: '20', lg: '2' }}
                    px='2'
                    pb='2'
                    align={'start'}
                >
                    <HStack justifyContent={'space-between'}>
                        <Text fontWeight={600} fontSize={'lg'} >
                            Hotel Veranda Tanjung Duren Grogol Petamburan Jakarta Barat
                        </Text>
                        <Flex>
                            <BsStarFill />
                            <Text fontWeight={600} fontSize={'md'} textAlign={'left'} pl='1' mt='-1'>
                                5.0
                            </Text>
                        </Flex>
                    </HStack>
                    <Text fontWeight={'normal'} fontSize={'sm'} >
                        Uluwatu, Indonesia
                    </Text>
                    <Text fontWeight={600} fontSize={'md'} textAlign={'left'} display='flex'>
                        Rp 500.000
                        <Text fontWeight={'normal'} pl='1' fontSize={'sm'} mt='0.5'>
                            / night
                        </Text>
                    </Text>
                </Box>
            </Box>
        </Center>
    );
}
