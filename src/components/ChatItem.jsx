import { Box, Flex, Image } from "@chakra-ui/react";
import { DEFAULT_AVATAR } from "../utils/constant";

const ChatItem = ({ ownerId, ownerAvatar, message }) => {
  const loggedInUserId = 2;

  const isOwnerCurrentUser = ownerId === loggedInUserId;

  return (
    <Flex
      alignItems="flex-end"
      maxW="80%"
      alignSelf={isOwnerCurrentUser ? "flex-end" : "flex-start"}
      flexDir={isOwnerCurrentUser ? "row" : "row-reverse"}
      gap={2}
      mb={4}
    >
      <Box
        flex="auto"
        p={2}
        bgColor={isOwnerCurrentUser ? "blue.400" : "#F8F8F8"}
        color={isOwnerCurrentUser ? "white" : "gray.800"}
        wordBreak="break-all"
        rounded="md"
      >
        {message}
      </Box>
      <Image
        src={ownerAvatar || DEFAULT_AVATAR}
        alt="avatar"
        rounded="full"
        w={10}
        h={10}
        objectFit="cover"
        objectPosition="center"
      />
    </Flex>
  );
};

export default ChatItem;
