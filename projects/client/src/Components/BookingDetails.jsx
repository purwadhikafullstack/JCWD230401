import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  Text
} from '@chakra-ui/react';
import { } from '@chakra-ui/react';





export default function BookingDetails() {
  const Feature = ({ heading, text }) => {
    return (
      <GridItem>
        <h3 style={{ fontSize: "15px", fontWeight: 600 }}>
          {heading}
        </h3>
        <p style={{ fontSize: "15px"}}>{text}</p>
      </GridItem>
    );
  };

  return (
    <Box as={Container} maxW='container.xl' mt={14} p={4}>
      <Grid
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
      <Divider mt={12} mb={12} />
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
              Details: Classic Double Room
            </Text>
          </VStack>
        </GridItem>
        {/* <GridItem>
            <Flex>
              <chakra.p>
                Provide your customers a story they would enjoy keeping in mind
                the objectives of your website. Pay special attention to the tone
                of voice.
              </chakra.p>
            </Flex>
          </GridItem> */}
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
          heading={'Booking:'}
          text={'5970'}
        />
        <Feature
          heading={'Check-in:'}
          text={'October 20, 2020'}
        />
        <Feature
          heading={'Check-out:'}
          text={'October 25, 2020'}
        />
        <Feature
          heading={'Total:'}
          text={'IDR 2.500.000'}
        />
        <Feature
          heading={'Status:'}
          text={'Confirmed'}
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
              Payment Details
            </Text>
          </VStack>
        </GridItem>
        {/* <GridItem>
            <Flex>
              <chakra.p>
                Provide your customers a story they would enjoy keeping in mind
                the objectives of your website. Pay special attention to the tone
                of voice.
              </chakra.p>
            </Flex>
          </GridItem> */}
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
          heading={'Payment:'}
          text={'5972'}
        />
        <Feature
          heading={'Date:'}
          text={'August 16, 2020'}
        />
        <Feature
          heading={'Payment Method:'}
          text={'Bank Transfer'}
        />
        <Feature
          heading={'Total:'}
          text={'IDR 2.500.000'}
        />
        <Feature
          heading={'Status:'}
          text={'Completed'}
        />
      </Grid>
      <Divider mt={6} mb={6} />
    </Box>
  );
}
