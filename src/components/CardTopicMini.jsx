import { Box, Image, Text } from "@chakra-ui/react";

const CardTopicMini = ({ image, topic }) => {
  return (
    <Box
      shadow="md"
      p={4}
      borderRadius={6}
      mx={12}
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
