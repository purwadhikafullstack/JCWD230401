import React from 'react';
import { Box, Heading, Text, Button, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Pagenotfound from '../assets/page-not-found.svg'


export default function NotFound() {
    const navigate = useNavigate();
    return (
        <Flex
            justify={'center'}
            minH={'100vh'}
        >
            <Box 
            textAlign="center" mt={-20}>
            <Image src={Pagenotfound} boxSize='500px'></Image> 
                <Text fontSize='4xl' fontWeight="bold" mt={-10} mb={2}>
                    Page Not Found
                </Text>
                <Text mb={6}>
                    The page you're looking for does not seem to exist
                </Text>

                <Button
                    backgroundColor='#D3212D'
                    color="white"
                    variant="solid"
                    onClick={() => navigate('/')}
                    _hover={{ bg: '#D3212D' }}
                    _active={{
                      bg: '#D3212D',
                      transform: 'scale(0.98)',
                    }}
                >
                    Return to Homepage
                </Button>
            </Box>
        </Flex>
    );
}
