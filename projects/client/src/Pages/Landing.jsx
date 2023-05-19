import { Flex, Box, Stack, VStack, HStack } from "@chakra-ui/react"
import Banner from "../Components/Banner"
import PropertyCard from "../Components/PropertyCard"
import SearchBar from "../Components/SearchBar"

export default function Landing() {
    return (
        <>
            <Flex w={'full'}
            >
                <Banner />
            </Flex>
            <Box pt={{ md: '3' }} p={{ base: '8', sm: '0' }}
                pb={{ base: '24', sm: '0' }}
            >
                <SearchBar />
            </Box>
            <Box
                px={{ base: '1', lg: '10' }} >
                <VStack border='0px' overflow='auto' h='100vh' sx={{ '::-webkit-scrollbar': { display: 'none' } }}>
                    {/* print cards here */}
                    <Flex
                        flexWrap='wrap' justifyContent='space-evenly'
                    >
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                    </Flex>
                </VStack>
            </Box>
            <Box my='20'>
            </Box>
        </>
    )
}
