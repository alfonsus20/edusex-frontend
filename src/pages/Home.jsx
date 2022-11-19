import {
  Box,
  Button,
  ButtonGroup,
  Circle,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Home1Image from "../assets/home_1.png";
import Home2Image from "../assets/home_2.png";
import Home3Image from "../assets/home_3.png";
import CardTopicMini from "../components/CardTopicMini";
import ForumDiskusiImage from "../assets/forum_diskusi.png";

const Home = () => {
  return (
    <Box>
      <Box position="relative" maxW="8xl" mx="auto" pb={12}>
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
              <Text color="yellow.300" as="span">
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
            bgColor="yellow.400"
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
            bgColor="yellow.300"
            size={8}
            pos="absolute"
            top={-12}
            left={32}
          />
        </Flex>
      </Box>
      <Box py={12}>
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          <Text as="span" color="blue.400">
            Topik-Topik
          </Text>{" "}
          yang Bisa Kamu Pelajari
        </Heading>
        <Flex
          flexWrap="wrap"
          maxW="6xl"
          justifyContent="center"
          mx="auto"
          pos="relative"
        >
          {Array(8)
            .fill(null)
            .map((item, idx) => (
              <CardTopicMini
                topic="Pubertas"
                image="https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/pubertas?t=2022-11-19T02%3A43%3A24.960Z"
              />
            ))}
          <Circle bg="cyan.400" size={8} pos="absolute" left={16} top={-8} />
          <Circle
            bg="purple.400"
            size={6}
            pos="absolute"
            right={16}
            top={-10}
          />
          <Circle
            bg="pink.400"
            size={6}
            pos="absolute"
            right={24}
            bottom={-8}
          />
          <Circle
            bg="yellow.400"
            size={6}
            pos="absolute"
            left={24}
            bottom={-6}
          />
        </Flex>
      </Box>
      <Flex alignItems="center" maxW="8xl" mx="auto" py={12} px={4}>
        <Image
          src={ForumDiskusiImage}
          width="32rem"
          alt="konsultasi"
          mr="6rem"
        />
        <Box>
          <Text color="yellow.400" fontWeight={700} mb={2}>
            FORUM DISKUSI
          </Text>
          <Heading as="h3" size="xl" mb={2}>
            Konsultasi dengan Ahlinya
          </Heading>
          <Text fontSize="xl" mb={4}>
            Kami menyediakan forum bagi kamu untuk bertanya dan berdiskusi
            bersama psikolog seputar seksualitas serta fitur konsultasi secara
            personal
          </Text>
          <ButtonGroup>
            <Button colorScheme="yellow" rounded='full' size='lg' px={6} color='white'>Lihat Forum</Button>
            <Button colorScheme="yellow" variant="outline" rounded='full' size='lg' px={6}>
              Konsultasi Personal
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </Box>
  );
};
export default Home;
