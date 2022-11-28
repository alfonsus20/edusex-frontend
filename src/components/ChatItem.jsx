import { Box, Flex, Image } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useAuthContext } from "../context/authContext";
import { DEFAULT_AVATAR } from "../utils/constant";

const ChatItem = ({ ownerId, ownerAvatar, message }) => {
  const {
    userInfo: { id: loggedInUserId },
  } = useAuthContext();
  const ref = useRef();

  const isOwnerCurrentUser = ownerId === loggedInUserId;

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Flex
      ref={ref}
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
