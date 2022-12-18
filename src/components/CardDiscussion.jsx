import { Box, Circle, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../utils/constant";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { sensorName } from "../utils/helper";

dayjs.extend(relativeTime);
dayjs.locale("id");

const CardDiscussion = ({
  questionId,
  questionerName = "",
  time,
  question,
  psychologistName,
  psychologistAvatar,
  numberOfRespond,
}) => {
  return (
    <Flex
      borderBottom="2px"
      px={4}
      pt={4}
      pb={5}
      borderColor="gray.300"
      cursor="pointer"
      as={Link}
      gap={{ base: 6, sm: 8 }}
      to={`/forum/questions/${questionId}`}
    >
      <Box pos="relative" alignSelf="flex-start">
        <Circle
          size={{ base: 12, sm: 16 }}
          bg="blue.200"
          fontSize="3xl"
          color="white"
        >
          {questionerName[0].toUpperCase()}
        </Circle>
        {psychologistName && (
          <Image
            src={psychologistAvatar || DEFAULT_AVATAR}
            objectPosition="center"
            objectFit="cover"
            alt="psychologist avatar"
            w={{ base: 9, sm: 12 }}
            h={{ base: 9, sm: 12 }}
            rounded="full"
            pos="absolute"
            bottom={-3}
            right={-4}
          />
        )}
      </Box>
      <Box flex="auto">
        <Flex justifyContent="space-between" gap={2}>
          <Text fontSize="lg">
            <strong>{sensorName(questionerName)}</strong> •{" "}
            <Text as="span" fontSize="md">
              {dayjs(time).toNow(true)}
            </Text>
          </Text>
          <Text color="blue.400" fontWeight="semibold">
            {numberOfRespond} balasan
          </Text>
        </Flex>
        <Text>{question}</Text>
        {psychologistName && (
          <Text color="blue.400">Dijawab oleh Psikolog {psychologistName}</Text>
        )}
      </Box>
    </Flex>
  );
};

export default CardDiscussion;
