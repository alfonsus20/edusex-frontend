import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Home1Image from "../assets/home_1.png";
import Home2Image from "../assets/home_2.png";
import Home3Image from "../assets/home_3.png";

const Home = () => {
  return (
    <Box>
      <Box position="relative" maxW='8xl' mx='auto'>
        <Flex
          flexDirection="column"
          alignItems="center"
          maxW="2xl"
          mx="auto"
          mt={6}
        >
          <Box textAlign="center" mb={3}>
            <Heading>Belajar Tentang Seksualitas</Heading>
            <Heading>
              dengan{" "}
              <Text color="pink.300" as="span">
                Asik
              </Text>{" "}
              dan{" "}
              <Text color="orange.300" as="span">
                Menyenangkan
              </Text>
            </Heading>
          </Box>
          <Box mb={4} textAlign="center" fontSize="lg">
            Ayo belajar tentang seksualitas sejak dini bersama Edusex yang siap
            memberikan kamu informasi yang lengkap seputar seksualitas
          </Box>
          <Button colorScheme="blue" borderRadius="full" px={8}>
            Lihat Materi
          </Button>
        </Flex>
        <Flex justifyContent="center" columnGap={12} pos="relative">
          <Image
            src={Home1Image}
            alt="home_1"
            width={60}
            alignSelf="flex-start"
            zIndex={10}
          />
          <Image src={Home2Image} alt="home_2" width={60} mt={10} zIndex={10} />
          <Image
            src={Home3Image}
            alt="home_3"
            width={60}
            alignSelf="flex-start"
            zIndex={10}
          />
          <Circle
            bgColor="cyan.400"
            size={12}
            pos="absolute"
            bottom={20}
            right={12}
          />
          <Circle
            bgColor="orange.400"
            size={12}
            pos="absolute"
            top={-8}
            right={24}
          />
          <Circle
            bgColor="pink.400"
            size={6}
            pos="absolute"
            top={0}
            right="40%"
          />
          <Circle
            bgColor="purple.400"
            size={8}
            pos="absolute"
            bottom={0}
            left="30%"
          />
          <Circle
            bgColor="green.300"
            size={8}
            pos="absolute"
            bottom={32}
            left={12}
          />
          <Circle
            bgColor="orange.300"
            size={8}
            pos="absolute"
            top={-12}
            left={32}
          />
        </Flex>
      </Box>
    </Box>
  );
};
export default Home;
