import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardTopicMini = ({ image, topic, id }) => {
  return (
    <Box
      shadow="md"
      p={4}
      as={Link}
      to={`/topic/${id}/material`}
      borderRadius={6}
      my={4}
      cursor="pointer"
      maxW={48}
      _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
    >
      <Image
        src={image}
        alt={topic}
        width={40}
        height={40}
        objectFit="cover"
        objectPosition="center"
      />
      <Text textAlign="center" fontWeight={600}>
        {topic}
      </Text>
    </Box>
  );
};

export default CardTopicMini;