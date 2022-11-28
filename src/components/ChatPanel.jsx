import {
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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { pusherInstance } from "../utils/helper";
import { getChatDetail } from "../api-fetch/personal-consultation";
import { useAuthContext } from "../context/authContext";

const ChatPanel = ({ withBackArrow = false }) => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [chatDetail, setChatDetail] = useState({});
  const { userInfo } = useAuthContext();

  const userToChat =
    userInfo.role === "user" ? chatDetail["psikolog"] : chatDetail["user"];

  const fetchChatDetail = async () => {
    try {
      const { data } = await getChatDetail(roomId);
      setChatDetail(data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    const channel = pusherInstance.subscribe(`room-${roomId}`);

    channel.bind("personal-chat", fetchChatDetail);

    return () => {
      pusherInstance.unsubscribe(`room-${roomId}`);
    };
  }, [roomId]);

  useEffect(() => {
    setChatDetail({});
    fetchChatDetail();
  }, [roomId]);

  return (
    <Flex w="full" h="full" flexDir="column">
      <Flex alignItems="center" px={4} py={2} gap={3}>
        {withBackArrow && (
          <IconButton
            icon={<Icon as={AiOutlineArrowLeft} fontSize="xl" />}
            onClick={() => navigate(-1)}
            variant="unstyled"
          />
        )}
        <Image
          src={DEFAULT_AVATAR}
          alt="interlocutor avatar"
          rounded="full"
          objectFit="cover"
          objectPosition="center"
          w={12}
          h={12}
        />
        <Text fontSize="lg" fontWeight="semibold">
          {userToChat?.name}
        </Text>
      </Flex>
      <Divider />
      <Flex flex="auto" flexDir="column" py={2} px={4} overflowY="auto">
        {chatDetail.messages?.map((item) => (
          <ChatItem
            message={item.message}
            ownerId={item.owner?.id}
            ownerAvatar={item.owner?.avatar_url}
          />
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
