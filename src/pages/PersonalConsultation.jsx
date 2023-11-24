import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FaSearch } from "react-icons/fa";
import { RiChatNewFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { getChatRooms } from "../api-fetch/personal-consultation";
import chooseChatImg from "../assets/choose-chat.svg";
import ChatPanel from "../components/chat/ChatPanel";
import ChatRoom from "../components/chat/ChatRoom";
import { useAuthContext } from "../context/authContext";
import { debounce, pusherInstance } from "../utils/helper";

const ModalPsikolog = lazy(() => import("../components/modals/ModalPsikolog"));

const PersonalConsultation = () => {
  const { roomId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rooms, setRooms] = useState([]);
  const { userInfo } = useAuthContext();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchTemp, setSearchTemp] = useState("");

  const fetchChatRooms = useCallback(async () => {
    try {
      const { data } = await getChatRooms();
      setRooms(data.data);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    const channel = pusherInstance.subscribe(`user-${userInfo.id}-room`);

    channel.bind("fetch-chat-rooms", fetchChatRooms);

    return () => {
      pusherInstance.unsubscribe(`user-${userInfo.id}-room`);
    };
  }, [userInfo.id]);

  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) =>
        room.psikolog.name.toLowerCase().includes(searchKeyword)
      ),
    [searchKeyword, rooms]
  );

  const handleSearchChat = (keyword) => {
    setSearchTemp(keyword);
  };

  const renderMessage = () => {
    if (searchKeyword) {
      return "Chat tidak ditemukan";
    }

    return "Belum ada chat";
  };

  useEffect(() => {
    debounce(() => {
      setSearchKeyword(searchTemp);
    })();
  }, [searchTemp]);

  return (
    <Flex
      flexDir="column"
      py={4}
      mx="auto"
      maxW="7xl"
      h={{ base: "calc(100vh - 110px)", md: "calc(100vh - 136px)" }}
      px={4}
    >
      <Heading size="lg" mb={3}>
        Konsultasi Personal
      </Heading>
      <Flex overflow="hidden" flex="auto">
        <Box
          w={{ base: "full", md: "40%" }}
          overflow="auto"
          p={2}
          borderRight={{ md: "2px" }}
          borderColor={{ md: "gray.200" }}
          display={{ base: roomId ? "none" : "block", md: "block" }}
        >
          <Flex flex="auto">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.300" />
              </InputLeftElement>
              <Input
                mr={4}
                placeholder="Cari...."
                value={searchTemp}
                onChange={(e) => handleSearchChat(e.target.value)}
              />
            </InputGroup>
            <IconButton
              icon={<Icon as={RiChatNewFill} fontSize="xl" />}
              colorScheme="blue"
              onClick={onOpen}
            />
          </Flex>
          <Box overflow="hidden">
            {filteredRooms.length === 0 ? (
              <Text textAlign="center" py={4}>
                {renderMessage()}
              </Text>
            ) : (
              filteredRooms.map((room) => {
                return (
                  <ChatRoom
                    key={room.id}
                    name={room.psikolog?.name}
                    lastMessage={room.last_message || ""}
                    numberOfUnreadMessage={room.unread_chats}
                    time={dayjs(room.updated_at).format("HH:mm")}
                    avatar={room.psikolog?.avatar_url}
                    path={`/personal-consultation/${room.id}`}
                  />
                );
              })
            )}
          </Box>
        </Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          w={{ base: "full", md: "60%" }}
          flexDir="column"
          display={{ base: roomId ? "flex" : "none", md: "flex" }}
        >
          {roomId ? (
            <ChatPanel cbFetchChatList={fetchChatRooms} />
          ) : (
            <>
              <Image
                src={chooseChatImg}
                alt="choose chat"
                w={80}
                style={{ aspectRatio: 1 }}
              />
              <Text color="blue.400" fontWeight="semibold">
                Pilih Salah Satu Chat
              </Text>
            </>
          )}
        </Flex>
      </Flex>

      <Suspense>{isOpen && <ModalPsikolog onClose={onClose} />}</Suspense>
    </Flex>
  );
};

export default PersonalConsultation;
