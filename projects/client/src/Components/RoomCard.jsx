import {
    Card, CardHeader, CardBody, CardFooter, Box,
    Image, Stack, Heading, Text, Button, Flex, Divider, Tag
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'

export default function RoomCard() {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '350px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt=''
            />

            <Stack w={'full'}>
                <CardBody>
                    <Flex justify='space-between' alignItems={'center'}>
                        <Heading size='md'>Superior Room With 1 Double Bed</Heading>
                        <ArrowRightIcon />
                    </Flex>
                    <Text py='2' as='cite'>
                        Tidak bisa refund & reschedule
                    </Text>
                    <Divider my='3' />

                    <Flex justifyContent={'space-between'}>
                        <Box>
                            <Text>test</Text>
                        </Box>
                        <Box textAlign={'end'}>
                            <Box background={'red'} rounded='md'>
                                <Text color='white'>Recommended</Text>
                            </Box>

                            <Button variant='solid' colorScheme='blue' ml='auto'>
                                Book Now!
                            </Button>
                        </Box>
                    </Flex>
                </CardBody>


            </Stack>
        </Card>
    )
}
