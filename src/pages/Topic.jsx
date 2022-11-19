import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import CardTopicProgress from "../components/CardTopicProgress";

const Topic = () => {
  return (
    <Box pt={8} pb={12}>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        <Text as="span" color="blue.400">
          Topik-Topik
        </Text>{" "}
        yang Bisa Kamu Pelajari
      </Heading>
      <Flex flexWrap="wrap" w="full" mx="auto" maxW="7xl">
        {Array(10)
          .fill(null)
          .map((item, idx) => (
            <CardTopicProgress
              id={idx}
              topic="Pubertas"
              finishedMaterials={2}
              totalMaterials={4}
              image="https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/pubertas?t=2022-11-19T02%3A43%3A24.960Z"
            />
          ))}
      </Flex>
    </Box>
  );
};

export default Topic;
