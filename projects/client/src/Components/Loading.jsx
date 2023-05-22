import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';


export default function Loading() {
    return (
        <Flex
            bg={'white'}
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Spinner color='red.500' />
        </Flex>
    );
}
