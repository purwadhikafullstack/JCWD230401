import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image, Flex, HStack, Badge, Avatar, Icon
} from '@chakra-ui/react';
import { StarIcon, ChevronRightIcon } from '@chakra-ui/icons';

export default function Review() {
    const property = {
        username: 'anonymous',
        date: 'February 2023',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, quibusdam sint? At, ipsum. Ipsum quo voluptatum perspiciatis temporibus, sunt iste ab saepe quia non numquam. Eius dolore fuga inventore ipsum.',
        rating: 4,
    }

    return (
        <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box p='6'>
                <Box>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Box display='flex'>
                            <Avatar
                                size={'sm'}
                                src=""
                            />
                            <Box>
                                <Box
                                    color='black'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='xs'
                                    textTransform='uppercase'
                                    ml='2'
                                >
                                    {property.username}
                                </Box>
                                <Box
                                    color='gray.500'
                                    letterSpacing='wide'
                                    fontSize='xs'
                                    ml='2'
                                >
                                    {property.date}
                                </Box>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='right'>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < property.rating ? 'yellow.500' : 'gray.300'}
                                    />
                                ))}
                        </Box>
                    </Box>
                </Box>
                <Box
                    mt='2'
                    fontWeight='medium'
                    fontSize='sm'
                    lineHeight='tight'
                    noOfLines={4}
                >
                    {property.comment}
                </Box>
                <Box>
                    <Box as='span' color='black' fontSize='sm' fontWeight='semibold'>
                        Show more
                    </Box>
                    <Icon as={ChevronRightIcon} boxSize={4} />
                </Box>
            </Box>
        </Box>
    )
}