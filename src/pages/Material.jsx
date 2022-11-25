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
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getTopicById } from "../api-fetch/topic";
import CardMaterial from "../components/CardMaterial";

const Material = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchBoxRef = useRef();

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
      }
    };

    fetchTopicDetail();
  }, []);

  const handleSearch = () => {
    setSearchKeyword(searchBoxRef?.current.value);
  };

  return (
    <Box>
      <Box bg="#7262FD">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW="7xl"
          mx="auto"
        >
          <Box color="white" maxW="sm">
            <Heading mb={3} as="h2" fontWeight={500}>
              {topic.name}
            </Heading>
            <Text>{topic.description}</Text>
          </Box>
          <Image
            src={topic.illustration_url}
            width={80}
            style={{ aspectRatio: 1 }}
          />
        </Flex>
      </Box>
      <Box maxW="7xl" mx="auto" py={8}>
        <Flex>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaSearch} color="gray.300" />}
            />
            <Input ref={searchBoxRef} mr={4} placeholder="Cari materi...." />
          </InputGroup>
          <Button colorScheme="orange" px={10} onClick={handleSearch}>
            Cari
          </Button>
        </Flex>
      </Box>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={8}
        maxW="7xl"
        mx="auto"
        pb={12}
      >
        {filteredTopics?.map((material) => (
          <CardMaterial
            key={material.id}
            id={material.id}
            title={material.title}
            image={material.illustration_url}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Material;
