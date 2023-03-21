import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image, Flex
} from '@chakra-ui/react';

const IMAGE =
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80';

export default function PropertyCard() {
    return (
        <Center pt={6} 
        // px='1'
        >
            <Box
                role={'group'}
                px={{base:'2',md:'2' ,lg:'2'}}
                py={{base:'0',md:'2' ,lg:'2'}}
                maxW={{base:'350px', md:'360px', lg:'330px'}}
                w={'full'}
                bg='white'
                // boxShadow={'xs'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={0}>
                <Box
                    rounded={'lg'}
                    // mt={-12}
                    pos={'relative'}
                    height={'230px'}
                >
                    <Image
                        rounded={'lg'}
                        // height={230}
                        // width={250}
                        height={{base:'300px', lg:'250px'}}
                        width={{base:'400px',lg:'270px'}}
                        objectFit={'cover'}
                        src={IMAGE}
                    />
                </Box>
                <Stack pt={{base:'20', lg:'8'}} align={'start'}>
                    <Text fontWeight={700} fontSize={'lg'} >
                        Hotel Veranda Labuansait
                    </Text>
                    <Text fontWeight={'normal'} fontSize={'sm'} >
                        Uluwatu, Indonesia
                    </Text>
                    <Text fontWeight={700} fontSize={'lg'}>
                        <Flex justify={'center'}  alignItems={'center'}>
                            Rp 500.000
                            <Text fontWeight={'normal'} pl='1' fontSize={'sm'}>
                                / night
                            </Text>
                        </Flex>
                    </Text>
                </Stack>
            </Box>
        </Center>
    );
}
