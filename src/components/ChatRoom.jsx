import { Box, Circle, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../utils/constant";

const ChatRoom = ({
  name,
  avatar,
  lastMessage,
  numberOfUnreadMessage,
  time,
  path,
}) => {
  return (
    <Flex py={2} alignItems="center" cursor="pointer" as={Link} to={path}>
      <Image
        flex="none"
        w={12}
        h={12}
        rounded="full"
        src={avatar || DEFAULT_AVATAR}
        alt="avatar"
        mr={4}
        objectFit="cover"
        objectPosition="center"
      />
      <Box flex="auto" mr={2} overflow="hidden">
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
