import { Box, Circle, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../utils/constant";

const ChatRoom = ({
  name,
  avatar,
  lastMessage,
  numberOfUnreadMessage,
  time,
  roomId,
}) => {
  return (
    <Flex
      py={2}
      alignItems="center"
      cursor="pointer"
      as={Link}
      to={`/personal-consultation/${roomId}`}
    >
      <Image
        w={14}
        h={14}
        rounded="full"
        src={avatar || DEFAULT_AVATAR}
        alt="avatar"
        mr={4}
      />
      <Box flex="auto" mr={2}>
        <Text fontWeight="semibold" noOfLines={1}>
          {name}
        </Text>
        <Text noOfLines={1}>{lastMessage}</Text>
      </Box>
      <Flex
        flexDir="column"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Text>{time}</Text>
        <Circle size="1rem" color="white" bg="blue.400" p="10px" fontSize="xs">
          {numberOfUnreadMessage}
        </Circle>
      </Flex>
    </Flex>
  );
};

export default ChatRoom;
