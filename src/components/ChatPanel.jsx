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
import { useEffect, useState ,memo} from "react";
import { pusherInstance } from "../utils/helper";
import { getChatDetail, sendChat } from "../api-fetch/personal-consultation";
import { useAuthContext } from "../context/authContext";

const ChatPanel = ({ withBackArrow = false, cbFetchChatList }) => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [chatDetail, setChatDetail] = useState({});
  const { userInfo } = useAuthContext();
  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

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

  const handleSendChat = async () => {
    try {
      setIsSendingMessage(true);
      await sendChat({ room_id: +roomId, message });
      setMessage("");
    } catch (error) {
      console.log({ error });
    } finally {
      setIsSendingMessage(false);
    }
  };

  useEffect(() => {
    setChatDetail({});
    fetchChatDetail();
    
    const channel = pusherInstance.subscribe(`room-${roomId}`);

    channel.bind("personal-chat", fetchChatDetail);

    return () => {
      pusherInstance.unsubscribe(`room-${roomId}`);
    };
  }, [roomId]);

  return (
    <Flex w="full" h="full" flexDir="column" pb={3}>
      <Flex alignItems="center" px={{ base: 0, md: 4 }} py={2} gap={3}>
        <IconButton
          icon={<Icon as={AiOutlineArrowLeft} fontSize="xl" />}
          onClick={() => navigate(-1)}
          variant="unstyled"
          display={{ base: "block", md: withBackArrow ? "block" : "none" }}
        />
        <Image
          src={userToChat?.avatar_url || DEFAULT_AVATAR}
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
            key={item.id}
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          colorScheme="blue"
          isDisabled={!message}
          isLoading={isSendingMessage}
          onClick={handleSendChat}
        >
          Kirim
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(ChatPanel);
