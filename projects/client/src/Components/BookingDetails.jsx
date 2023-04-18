import {
    Box, Container, Divider, Grid,
    GridItem, Text, VStack
} from '@chakra-ui/react';


export default function BookingDetails(props) {
    const Feature = ({ heading, text }) => {
        return (
            <GridItem>
                <h3 style={{ fontSize: "15px", fontWeight: 600 }}>
                    {heading}
                </h3>
                <p style={{ fontSize: "15px" }}>{text}</p>
            </GridItem>
        );
    };

    return (
        <Box as={Container} maxW='container.xl' p={4}>
            {/* <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(1, 1fr)',
                }}
                gap={4}>
                <GridItem colSpan={1}>
                    <VStack spacing="20px" m="auto">
                        <Text fontSize="2xl" fontWeight="700">
                            Booking Confirmed
                        </Text>
                    </VStack>
                </GridItem>
            </Grid>
            <Divider mt={12} mb={{ base: 0, md: 6 }} /> */}
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(1, 1fr)',
                }}
                gap={4}>
                <GridItem colSpan={1}>
                    <VStack alignItems={{ lg: "flex-start" }} m="auto">
                        <Text fontSize="xl" fontWeight="700">
                            Booking Details
                        </Text>
                        <Text>
                            Details: {props.roomName}
                        </Text>
                    </VStack>
                </GridItem>
            </Grid>
            <Divider mt={6} mb={6} />
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(5, 1fr)',
                }}
                gap={{ base: '8', sm: '4', md: '4' }}>
                <Feature
                    heading={'Invoice number:'}
                    text={props.invoiceNumber}
                />
                <Feature
                    heading={'Check-in:'}
                    text={props.startDate}
                />
                <Feature
                    heading={'Check-out:'}
                    text={props.endDate}
                />
                <Feature
                    heading={'Total:'}
                    text={props.total}
                />
                <Feature
                    heading={'Status:'}
                    text={props.status}
                />
            </Grid>
            <Divider mt={6} mb={6} />
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(1, 1fr)',
                }}
                gap={4}>
                <GridItem colSpan={1}>
                    <VStack alignItems={{ lg: "flex-start" }} m="auto">
                        <Text fontSize="xl" fontWeight="700">
                            Other Details
                        </Text>
                    </VStack>
                </GridItem>
            </Grid>
            <Divider mt={6} mb={6} />
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(5, 1fr)',
                }}
                gap={{ base: '8', sm: '4', md: '4' }}>
                <Feature
                    heading={'Guest:'}
                    text={props.customer}
                />
                <Feature
                    heading={'Property:'}
                    text={props.propertyName}
                />
                <Feature
                    heading={'Address:'}
                    text={props.propertyAddress}
                />
                <Feature
                    heading={'Regency:'}
                    text={props.propertyRegency}
                />
                <Feature
                    heading={'Country:'}
                    text={props.propertyCountry}
                />
            </Grid>
            <Divider mt={6} mb={6} />
        </Box>
    );
}
