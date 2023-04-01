import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden, Button, Flex
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import { ReactNode } from 'react';


export default function Footer() {
    return (
        <Box
            bg={'white'}
            color={useColorModeValue('gray.700', 'gray.200')}
            display={{ base: 'none', md: 'block' }}
            // position="fixed"
            bottom="0"
            zIndex={'1'}
            w='full'
            boxShadow={'xs'}
            mt='5'
        >
            <Flex
                // align='start'
                direction='row'
                px={10}
                justify='space-between'
            >
                <Text
                    mt='3'
                    textAlign='left'
                >© 2023 tempatku. All rights reserved</Text>
                <Stack direction={'row'}>
                    <Button
                        rounded={'full'}
                        w={12}
                        h={12}
                        // border='1px'
                        bgcolor='white'
                        variant={'none'}
                        borderColor='gray.300'
                    // href={'#'}
                    >
                        <FaTwitter />
                    </Button>
                    <Button
                        rounded={'full'}
                        w={12}
                        h={12}
                        // border='1px'
                        bgcolor='white'
                        variant={'none'}
                        borderColor='gray.300'

                    >
                        <FaYoutube />
                    </Button>
                    <Button
                        rounded={'full'}
                        w={12}
                        h={12}
                        // border='1px'
                        bgcolor='white'
                        variant={'none'}
                        borderColor='gray.300'
                    >
                        <FaInstagram />
                    </Button>
                    <Button
                        rounded={'full'}
                        w={12}
                        h={12}
                        // border='1px'
                        bgcolor='white'
                        variant={'none'}
                        borderColor='gray.300'
                    >
                        <FaFacebook />
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}
