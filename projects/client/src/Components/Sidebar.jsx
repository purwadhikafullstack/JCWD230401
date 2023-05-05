import React from 'react'
import {
    Flex,
    Text,
    Divider,
    Heading,
    VStack,
    StackDivider,
    Box,
    Button
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiUser,
} from 'react-icons/fi';
import { AiOutlineLineChart } from 'react-icons/ai'
import { BiBuildingHouse, BiWallet, BiPieChartAlt2 } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {
  const navigate = useNavigate();
  const name = useSelector((state) => state.authReducer.name);

    return (
        <Flex
            pos="sticky"
            left="5"
            h="full"
            w={{base: "75px" , lg: "250px"}}
            flexDir="column"
            justifyContent="space-between"
            px={{base:"3", lg:"6"}}
            // borderRight='1px'
            borderColor='gray.300'
            display={{base:'none', sm:'flex'}}
        >
            <Flex
                w="100%"
                alignItems={"center"}
            >
                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    align='stretch'
                    w='full'
                    py='6'
                >
                    <Box onClick={() => navigate('/dashboard')}>
                        <Button leftIcon={<AiOutlineLineChart size={20} />} variant='none' size="md">
                            <Text ml="2" fontWeight="medium" display={{base:'none', lg:'block'}}>
                                Dashboard
                            </Text>
                        </Button>
                    </Box>
                    <Box h='40px' onClick={() => navigate('/editprofile')}>
                        <Button leftIcon={<FiUser size={20} />} variant='none' size="md">
                            <Text ml="2" fontWeight="medium" display={{base:'none', lg:'block'}}>
                                Profile
                            </Text>
                        </Button>
                    </Box>
                    <Box h='40px'>
                        <Flex >
                            <Button leftIcon={<BiBuildingHouse size={20} />} variant='none' size="md" ml={{base:'2', lg:'0'}}>
                            </Button>
                            <Text fontWeight="medium" display={{base:'none', lg:'block'}} cursor='pointer'>
                                Manage Property / Rooms
                            </Text>
                        </Flex>
                    </Box>
                    <Box h='40px' onClick={() => navigate('/orderlist')}>
                        <Button leftIcon={<BiWallet size={20} />} variant='none' size="md">
                            <Text ml="2" fontWeight="medium" display={{base:'none', lg:'block'}}>
                                Transaction
                            </Text>
                        </Button>
                    </Box>
                    <Box h='40px' >
                        <Button leftIcon={<BiPieChartAlt2 size={20} />} variant='none' size="md">
                            <Text ml="2" fontWeight="medium" display={{base:'none', lg:'block'}}>
                                Report
                            </Text>
                        </Button>
                    </Box>
                </VStack>
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems="center"
                mb={4}
            >
                <Divider display={{base: "none" , lg: "flex"}} />
                <Flex mt={4} align="center" display={{base:'none', lg:'flex'}}>
                        <Heading as="h3" size="sm">Hi, {name} 👋</Heading>
                </Flex>
            </Flex>
        </Flex>
    )
}