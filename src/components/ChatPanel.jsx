import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { DEFAULT_AVATAR } from "../utils/constant";
import ChatItem from "./ChatItem";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ChatPanel = () => {
  const navigate = useNavigate();

  return (
    <Flex w="full" h="full" flexDir="column">
      <Flex alignItems="center" px={4} py={2} gap={3}>
        <IconButton
          icon={<Icon as={AiOutlineArrowLeft} fontSize="xl" />}
          onClick={() => navigate(-1)}
          variant="unstyled"
        />
        <Image
          src={DEFAULT_AVATAR}
          alt="interlocutor avatar"
          rounded="full"
          objectFit="cover"
          objectPosition="center"
          w={14}
          h={14}
        />
        <Text fontSize="lg" fontWeight="semibold">
          William
        </Text>
      </Flex>
      <Divider />
      <Flex flex="auto" flexDir="column" py={2} px={4} overflowY="auto">
        {[1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
          <ChatItem message="test" ownerId={item} ownerAvatar="" />
        ))}
      </Flex>
      <Divider />
      <Flex alignItems="center">
        <Textarea
          resize="none"
          placeholder="Ketikkan chat di sini"
          flex="auto"
          mr={2}
          border="none"
          _focus={{ border: "none", boxShadow: "none" }}
        />
        <Button colorScheme="blue">Kirim</Button>
      </Flex>
    </Flex>
  );
};

export default ChatPanel;
