import { Box, Flex, Image, Progress, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardTopicProgress = ({
  id,
  topic,
  image,
  finishedMaterials,
  totalMaterials,
}) => {
  return (
    <Box w="33%" p={4} as={Link} to={`/topic/${id}`}>
      <Flex shadow="md" px={6} py={4} alignItems="center">
        <Image src={image} alt={topic} width={32} height={32} mr={4} />
        <Box flex="1 1 auto">
          <Text fontWeight={600} fontSize="lg" mb={2}>
            {topic}
          </Text>
          <Progress size="xs" value={80} mb={1} />
          <Text color="gray.600" fontSize="sm">
            <Text as="span" fontWeight={600}>
              {finishedMaterials}
            </Text>{" "}
            dari{" "}
            <Text as="span" fontWeight={600}>
              {totalMaterials}
            </Text>{" "}
            sudah diselesaikan
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CardTopicProgress;
