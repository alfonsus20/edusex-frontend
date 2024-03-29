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
import Home1Image from "../assets/home_1.webp";
import Home2Image from "../assets/home_2.webp";
import Home3Image from "../assets/home_3.webp";
import CardTopicMini from "../components/card/CardTopicMini";
import ForumDiskusiImage from "../assets/forum_diskusi.webp";
import { useTopicContext } from "../context/topicContext";
import { Link } from "react-router-dom";
import usePreloadImages from "../hooks/usePreloadImages";
import { generateSkeletons } from "../utils/helper";

const preloadedImages = [Home1Image, Home2Image, Home3Image];

const Home = () => {
  const { topics, isFetchingTopics } = useTopicContext();
  usePreloadImages(preloadedImages);

  return (
    <Box px={4}>
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
              <Text color="yellow.400" as="span">
                Menyenangkan
              </Text>
            </Heading>
          </Box>
          <Box mb={4} textAlign="center" fontSize="lg">
            Ayo belajar tentang seksualitas sejak dini bersama Edusex yang siap
            memberikan kamu informasi yang lengkap seputar seksualitas
          </Box>
          <Button
            colorScheme="blue"
            borderRadius="full"
            px={8}
            zIndex={10}
            as={Link}
            to="/topic"
          >
            Lihat Materi
          </Button>
        </Flex>
        <Flex
          justifyContent="center"
          columnGap={{ base: 4, md: 12 }}
          pos="relative"
        >
          <Image
            src={Home1Image}
            alt="home_1"
            width="20%"
            style={{ aspectRatio: 4 / 6 }}
            alignSelf="flex-start"
            zIndex={10}
            display={{ base: "none", sm: "block" }}
          />
          <Image
            src={Home2Image}
            alt="home_2"
            width={{ base: "60%", sm: "20%" }}
            style={{ aspectRatio: 4 / 6 }}
            mt={10}
            zIndex={10}
          />
          <Image
            src={Home3Image}
            alt="home_3"
            width="20%"
            alignSelf="flex-start"
            zIndex={10}
            display={{ base: "none", sm: "block" }}
            style={{ aspectRatio: 4 / 6 }}
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
            display={{ base: "none", sm: "block" }}
          />
          <Circle
            bgColor="pink.400"
            size={6}
            pos="absolute"
            top={0}
            right="40%"
            display={{ base: "none", sm: "block" }}
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
            display={{ base: "none", sm: "block" }}
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
          gap={{ base: 4, lg: 8 }}
        >
          {isFetchingTopics
            ? generateSkeletons(10, CardTopicMini)
            : topics.map((topic) => (
                <CardTopicMini
                  isLoading={isFetchingTopics}
                  key={topic.id}
                  id={topic.id}
                  topic={topic.name}
                  image={topic.icon_url}
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
      <Flex
        alignItems="center"
        maxW="7xl"
        mx="auto"
        flexDirection={{ base: "column", sm: "row" }}
        py={12}
        px={4}
        gap={{ base: "1rem", sm: "3rem", md: "6rem" }}
      >
        <Image
          src={ForumDiskusiImage}
          width={{ base: "80%", sm: "40%" }}
          aspectRatio={1}
          alt="konsultasi"
        />
        <Box width={{ base: "full", sm: "60%" }}>
          <Text color="yellow.400" fontWeight={700} mb={2}>
            FORUM DISKUSI
          </Text>
          <Heading as="h3" size={{ base: "lg", md: "xl" }} mb={2}>
            Konsultasi dengan Ahlinya
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} mb={4}>
            Kami menyediakan forum bagi kamu untuk bertanya dan berdiskusi
            bersama psikolog seputar seksualitas serta fitur konsultasi secara
            personal
          </Text>
          <ButtonGroup>
            <Button
              colorScheme="yellow"
              rounded="full"
              size={{ base: "md", md: "lg" }}
              px={6}
              color="white"
              as={Link}
              to="/forum"
            >
              Lihat Forum
            </Button>
            <Button
              colorScheme="yellow"
              variant="outline"
              rounded="full"
              size={{ base: "md", md: "lg" }}
              px={6}
              as={Link}
              to="/personal-consultation"
            >
              Konsultasi Personal
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </Box>
  );
};
export default Home;
