import {
  Box,
  Circle,
  Flex,
  Image,
  SkeletonCircle,
  SkeletonText,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../utils/constant";

const ChatRoom = ({
  name,
  avatar,
  lastMessage,
  numberOfUnreadMessage,
  time,
  path,
  isLoading = false,
}) => {
  return (
    <Flex
      py={2}
      alignItems="center"
      cursor="pointer"
      as={isLoading ? "div" : Link}
      to={path}
    >
      <SkeletonCircle isLoaded={!isLoading} size={12} mr={4}>
        <Image
          flex="none"
          w={12}
          h={12}
          rounded="full"
          src={avatar || DEFAULT_AVATAR}
          alt="avatar"
          objectFit="cover"
          objectPosition="center"
        />
      </SkeletonCircle>
      <Box flex="auto" mr={4} overflow="hidden">
        <SkeletonText isLoaded={!isLoading} noOfLines={2} skeletonHeight={3}>
          <Text fontWeight="semibold" noOfLines={1}>
            {name}
          </Text>
          <Text noOfLines={1}>{lastMessage}</Text>
        </SkeletonText>
      </Box>
      <Flex
        flexDir="column"
        alignItems="flex-end"
        justifyContent="space-between"
        alignSelf='start'
      >
        <Text fontSize="xs" mt={0.5}>{time}</Text>
        {numberOfUnreadMessage > 0 && (
          <Circle
            size="1rem"
            color="white"
            bg="blue.400"
            p="10px"
            fontSize="xs"
          >
            {numberOfUnreadMessage}
          </Circle>
        )}
      </Flex>
    </Flex>
  );
};

export default ChatRoom;
