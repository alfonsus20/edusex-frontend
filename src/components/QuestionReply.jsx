import {
  Box,
  Circle,
  Flex,
  Image,
  SkeletonCircle,
  SkeletonText,
  Text
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { DEFAULT_AVATAR } from "../utils/constant";
import { showName } from "../utils/helper";

const QuestionReply = ({
  reply,
  userName = "",
  role,
  date,
  avatar,
  isLoading = false,
}) => {
  return (
    <Box>
      <Flex gap={4} mb={2} alignItems="center">
        <SkeletonCircle size={14} isLoaded={!isLoading}>
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
              {userName[0]?.toUpperCase()}
            </Circle>
          )}
        </SkeletonCircle>
        <Box flex="auto">
          <SkeletonText isLoaded={!isLoading} noOfLines={2} skeletonHeight={4}>
            <Text fontWeight="bold">{showName(userName, role)}</Text>
            <Text>{role}</Text>
          </SkeletonText>
        </Box>
        <Box textAlign="right">
          <SkeletonText
            isLoaded={!isLoading}
            noOfLines={2}
            skeletonHeight={4}
          >
            <Text>{dayjs(date).format("DD MMMM YYYY")}</Text>
            <Text>{dayjs(date).format("HH:mm")}</Text>
          </SkeletonText>
        </Box>
      </Flex>
      <SkeletonText isLoaded={!isLoading} skeletonHeight={3}>
        <Text>{reply}</Text>
      </SkeletonText>
    </Box>
  );
};

export default QuestionReply;
