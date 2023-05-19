import {
    Avatar,
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image, Flex, HStack, Badge, Icon
} from '@chakra-ui/react';
import { StarIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Rating } from '@smastrom/react-rating';

export default function Review(props) {
    function RatingUser() {
        return (
            <Rating
                style={{ maxWidth: 80 }}
                value={props.value}
                readOnly
            />
        );
    }


    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
            {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}

            <Box p="6">
                <Box>
                    <Box display='flex' justifyContent='space-between' minW='250px'>
                        <Box display='flex'>
                            <Avatar
                                size={'sm'}
                                src={props.profile ? props.profile : ""}
                            />
                            <Box>
                                <Box
                                    color="black"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    ml="2"
                                >
                                    {props.name}
                                </Box>
                                <Box
                                    color="gray.500"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    ml="2"
                                >
                                    {new Date(props.createdAt).toISOString().split('T')[0] || '2023-05-09'}
                                </Box>
                            </Box>
                        </Box>

                        <Box display='flex' alignItems='baseline' >
                            {RatingUser()}
                        </Box>
                    </Box>
                </Box>
                <Box
                    mt="2"
                    fontWeight="medium"
                    fontSize="sm"
                    lineHeight="tight"
                    noOfLines={4}
                >
                    {props.comment}
                </Box>
            </Box>
        </Box>
    );
}
