import { Box, Circle, Flex, Image, Text } from "@chakra-ui/react";
import { DEFAULT_AVATAR } from "../utils/constant";

const CardDiscussion = ({
  questionerName,
  time,
  question,
  psychologistName,
  psychologistAvatar,
  numberOfRespond,
}) => {
  return (
    <Flex borderBottom='2px' px={4} pt={4} pb={6} borderColor='gray.300'>
      <Box pos="relative" mr={8}>
        <Circle size={16} bg="blue.200" fontSize="3xl" color="white">
          A
        </Circle>
        <Image
          src={psychologistAvatar || DEFAULT_AVATAR}
          objectPosition="center"
          objectFit="cover"
          alt="psychologist avatar"
          w={12}
          h={12}
          rounded="full"
          pos="absolute"
          bottom={-4}
          right={-3}
        />
      </Box>
      <Box flex="auto">
        <Flex justifyContent="space-between">
          <Text fontSize='lg'>
            <strong>{questionerName}</strong> • {time}
          </Text>
          <Text color="blue.400" fontWeight="semibold">
            {numberOfRespond} balasan
          </Text>
        </Flex>
        <Text>{question}</Text>
        <Text color="blue.400">Dijawab oleh Psikolog {psychologistName}</Text>
      </Box>
    </Flex>
  );
};

export default CardDiscussion;
