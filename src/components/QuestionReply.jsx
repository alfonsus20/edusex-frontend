import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { DEFAULT_AVATAR } from "../utils/constant";
import dayjs from "dayjs";
import "dayjs/locale/id";

const QuestionReply = ({ reply, userName, role, date, avatar }) => {
  return (
    <Box>
      <Flex gap={4} mb={2} alignItems="center">
        <Image
          w={14}
          height={14}
          rounded="full"
          src={avatar || DEFAULT_AVATAR}
          alt="avatar"
        />
        <Box flex="auto">
          <Text fontWeight="bold">{userName}</Text>
          <Text>{role}</Text>
        </Box>
        <Box textAlign="right">
          <Text>
            {dayjs(date).utc(true).tz("Asia/Jakarta").format("DD MMMM YYYY")}
          </Text>
          <Text>
            {dayjs(date).utc(true).tz("Asia/Jakarta").format("HH:mm")}
          </Text>
        </Box>
      </Flex>
      <Text>{reply}</Text>
    </Box>
  );
};

export default QuestionReply;
