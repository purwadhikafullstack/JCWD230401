import { ReactNode } from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
 Button
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';


export default function Footer() {
  return (
    <Box
      bg={'gray.50'}
      color={'gray.700'}>
      <Container as={Stack} maxW={'full'} py={10} px={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <Text fontWeight={'600'} fontSize={'lg'} mb={2}>Company</Text>
            <Link href={'#'}>About Us</Link>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>Careers</Link>
            <Link href={'#'}>Contact Us</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'600'} fontSize={'lg'} mb={2}>Support</Text>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Safety Center</Link>
            <Link href={'#'}>Community Guidelines</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'600'} fontSize={'lg'} mb={2}>Hosting</Text>
            <Link href={'#'}>Rent out your home</Link>
            <Link href={'#'}>Cover for Host</Link>
            <Link href={'#'}>Explore hosting resources</Link>
            <Link href={'#'}>Community forum</Link>
            <Link href={'#'}>How to host responsibly</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'600'} fontSize={'lg'} mb={2}>Tempatku</Text>
            <Link href={'#'}>Newsroom</Link>
            <Link href={'#'}>Learn about new features</Link>
            <Link href={'#'}>Letter from our founders</Link>
            <Link href={'#'}>Investors</Link>
            <Link href={'#'}>Gift cards</Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}>
        <Container
          as={Stack}
          maxW={'full'}
          px={4}
          py={1}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{base:'center', md: 'space-between'}}
          align={{ base: 'center' }}>
          <Stack align={'flex-start'}  direction={'row'}>
          <Text>© 2023 tempatku.</Text>
          <Text>•</Text>
          <Text>Terms</Text>
          <Text>•</Text>
          <Text>Sitemap</Text>
          <Text>•</Text>
          <Text>Privacy</Text>
          </Stack>
          <Stack align={'flex-end'} direction={'row'} spacing={4}>
            <Button
              rounded={'full'}
              w={12}
              h={12}
              bgcolor='white'
              variant={'none'}
              borderColor='gray.300'
            >
              <FaTwitter />
            </Button>
            <Button
              rounded={'full'}
              w={12}
              h={12}
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
              bgcolor='white'
              variant={'none'}
              borderColor='gray.300'
            >
              <FaFacebook />
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
