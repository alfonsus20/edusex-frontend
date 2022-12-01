import { Box, Circle, Flex, Image, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { DEFAULT_AVATAR } from "../utils/constant";

const QuestionReply = ({ reply, userName, role, date, avatar }) => {
  return (
    <Box>
      <Flex gap={4} mb={2} alignItems="center">
        {role === "Psikolog" ? (
          <Image
            w={14}
            height={14}
            rounded="full"
            src={avatar || DEFAULT_AVATAR}
            alt="avatar"
            objectFit="cover"
            objetPosition="center"
          />
        ) : (
          <Circle size={14} bg="blue.200" fontSize="3xl" color="white">
            {userName[0].toUpperCase()}
          </Circle>
        )}
        <Box flex="auto">
          <Text fontWeight="bold">{userName}</Text>
          <Text>{role}</Text>
        </Box>
        <Box textAlign="right">
          <Text>{dayjs(date).format("DD MMMM YYYY")}</Text>
          <Text>{dayjs(date).format("HH:mm")}</Text>
        </Box>
      </Flex>
      <Text>{reply}</Text>
    </Box>
  );
};

export default QuestionReply;
