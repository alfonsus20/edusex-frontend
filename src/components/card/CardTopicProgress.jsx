import { Box, Flex, Image, Progress, Text, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardTopicProgress = ({
  id,
  topic,
  image,
  finishedMaterials,
  totalMaterials,
  isLoading = false,
}) => {
  return (
    <Box
      flex="0 1 25rem"
      as={isLoading ? "div" : Link}
      to={`/topic/${id}/material`}
    >
      <Flex shadow="md" p={4} alignItems="center">
        <Skeleton isLoaded={!isLoading} mr={2}>
          <Image src={image} alt={topic} width={32} height={32} mr={4} />
        </Skeleton>
        <Box flex="1 1 auto">
          <Skeleton minH={6} mb={2} isLoaded={!isLoading}>
            <Text fontWeight={600} fontSize="lg">
              {topic}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} minH={2} mb={2}>
            <Progress
              size="xs"
              value={
                totalMaterials === 0
                  ? 0
                  : (finishedMaterials / totalMaterials) * 100
              }
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading} minH={2}>
            <Text color="gray.600" fontSize="sm">
              <Text as="span" fontWeight={600}>
                {finishedMaterials}
              </Text>{" "}
              dari{" "}
              <Text as="span" fontWeight={600}>
                {totalMaterials}
              </Text>{" "}
              sudah diselesaikan
            </Text>{" "}
          </Skeleton>
        </Box>
      </Flex>
    </Box>
  );
};

export default CardTopicProgress;
