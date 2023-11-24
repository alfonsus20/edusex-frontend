import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTopicsWithProgress } from "../api-fetch/topic";
import CardTopicProgress from "../components/card/CardTopicProgress";
import { generateSkeletons } from "../utils/helper";

const Topic = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTopicWithProgress = async () => {
      try {
        setIsLoading(true);
        const { data } = await getTopicsWithProgress();
        setTopics(data.data);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopicWithProgress();
  }, []);

  return (
    <Box pt={8} pb={12} px={4}>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        <Text as="span" color="blue.400">
          Topik-Topik
        </Text>{" "}
        yang Bisa Kamu Pelajari
      </Heading>
      <Flex
        flexWrap="wrap"
        w="full"
        mx="auto"
        maxW="7xl"
        gap={6}
        justifyContent="center"
      >
        {isLoading
          ? generateSkeletons(9, CardTopicProgress)
          : topics.map((topic) => (
              <CardTopicProgress
                key={topic.id}
                id={topic.id}
                topic={topic.name}
                finishedMaterials={topic.finished_material}
                totalMaterials={topic.total_material}
                image={topic.icon_url}
              />
            ))}
      </Flex>
    </Box>
  );
};

export default Topic;
