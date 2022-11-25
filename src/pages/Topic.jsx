import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import CardTopicProgress from "../components/CardTopicProgress";
import { useTopicContext } from "../context/topicContext";

const Topic = () => {
  const { topics } = useTopicContext();

  return (
    <Box pt={8} pb={12}>
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
        {topics.map((topic) => (
          <CardTopicProgress
            key={topic.id}
            id={topic.id}
            topic={topic.name}
            finishedMaterials={2}
            totalMaterials={4}
            image={topic.icon_url}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Topic;
