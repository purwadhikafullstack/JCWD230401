import {
    Stack,
    Flex,
    Button,
    Text,
    VStack, Box,
    useBreakpointValue,
} from '@chakra-ui/react';

export default function Banner() {
    return (
        <Flex
            w={'full'}
            mt='16'
            h={{base:'40vh', lg:'60vh'}}
            // h={{base:'40vh'}}

            backgroundImage={
                'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
            }
            backgroundSize={'cover'}
            backgroundPosition={{base:'center center'}}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 3, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.300, transparent)'}
                >
                <Stack maxW={{base:'2xl', xl:'4xl'}} 
                align={'center'}
                 spacing={6}>
                    <Text
                        color={'white'}
                        fontWeight={600}
                        lineHeight={1.0}
                        fontSize={useBreakpointValue({ base: 'lg', md:'4xl', xl:'5xl' })}>
                        HOTELS, VILLAS, HOMESTAYS & MORE
                    </Text>
                    <Box align='center'>
                    <Text
                    color={'white'}
                    fontWeight={'500'}
                    fontSize={useBreakpointValue({ base: 'xs', md: 'md'})}
                    >
                        Rent unique places to stay from local hosts in over 50+ cities.

                    </Text>
                        </Box>
                    <Stack direction={'row'}>
                        <Button
                            bg={'blackAlpha.300'}
                            rounded={'none'}
                            color={'white'}
                            _hover={{ bg: 'blackAlpha.500' }}
                            fontSize={{base:'xs', md:'md'}}
                            px={{base:'4', md: '8'}}
                            >
                            Show me more
                        </Button>
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
    );
}