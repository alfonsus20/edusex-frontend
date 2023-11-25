import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getTopicById } from "../api-fetch/topic";
import CardMaterial from "../components/card/CardMaterial";
import { generateSkeletons } from "../utils/helper";

const Material = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchBoxRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const filteredTopics = useMemo(
    () =>
      topic.materials?.filter((material) =>
        material.title.includes(searchKeyword)
      ),
    [topic, searchKeyword]
  );

  useEffect(() => {
    const fetchTopicDetail = async () => {
      try {
        const { data } = await getTopicById(topicId);
        setTopic(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopicDetail();
  }, []);

  const handleSearch = () => {
    setSearchKeyword(searchBoxRef?.current.value);
  };

  const renderMessage = () => {
    if (searchKeyword) {
      return "Materi tidak ditemukan";
    }

    return "Belum terdapat materi";
  };

  return (
    <Box>
      <Box bg="#7262FD" px={4}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW="7xl"
          mx="auto"
          minH="20rem"
        >
          <Box color="white" maxW="sm">
            <Skeleton isLoaded={!isLoading} minH={4} minW={80}>
              <Heading mb={3} as="h2" fontWeight={500}>
                {topic.name}
              </Heading>
            </Skeleton>
            <SkeletonText
              isLoaded={!isLoading}
              noOfLines={4}
              skeletonHeight={4}
            >
              <Text>{topic.description}</Text>
            </SkeletonText>
          </Box>
          <Skeleton isLoaded={!isLoading}>
            <Image
              display={{ base: "none", sm: "block" }}
              src={topic.illustration_url}
              width={80}
              style={{ aspectRatio: 1 }}
            />
          </Skeleton>
        </Flex>
      </Box>
      <Box maxW="7xl" mx="auto" py={8} px={4}>
        <Flex>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.300" />
            </InputLeftElement>
            <Input ref={searchBoxRef} mr={4} placeholder="Cari materi...." />
          </InputGroup>
          <Button colorScheme="orange" px={10} onClick={handleSearch}>
            Cari
          </Button>
        </Flex>
      </Box>

      {isLoading ? (
        <Grid
          px={4}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
          maxW="7xl"
          mx="auto"
          pb={12}
        >
          {generateSkeletons(3, CardMaterial)}
        </Grid>
      ) : (
        filteredTopics &&
        (filteredTopics.length === 0 ? (
          <Box textAlign="center" py={8}>
            {renderMessage()}
          </Box>
        ) : (
          <Grid
            px={4}
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={8}
            maxW="7xl"
            mx="auto"
            pb={12}
          >
            {filteredTopics.map((material) => (
              <CardMaterial
                key={material.id}
                id={material.id}
                title={material.title}
                image={material.illustration_url}
              />
            ))}
          </Grid>
        ))
      )}
    </Box>
  );
};

export default Material;
