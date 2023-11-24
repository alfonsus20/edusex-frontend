import { Box, Image, Text, Skeleton, SkeletonText } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardTopicMini = ({ image, topic, id, isLoading = false }) => {
  return (
    <Box
      shadow="md"
      p={4}
      as={isLoading ? "div" : Link}
      to={`/topic/${id}/material`}
      borderRadius={6}
      my={4}
      cursor="pointer"
      maxW={48}
      _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
    >
      <Skeleton isLoaded={!isLoading}>
        <Image
          src={image}
          alt={topic}
          width={40}
          height={40}
          objectFit="cover"
          objectPosition="center"
        />
      </Skeleton>
      <SkeletonText
        isLoaded={!isLoading}
        mt={2}
        skeletonHeight={4}
        noOfLines={1}
      >
        <Text textAlign="center" fontWeight={600}>
          {topic}
        </Text>
      </SkeletonText>
    </Box>
  );
};

export default CardTopicMini;
