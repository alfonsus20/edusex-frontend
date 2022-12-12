import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiChatNewFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import ChatRoom from "../components/ChatRoom";
import chooseChatImg from "../assets/choose-chat.svg";
import { useNavigate, useParams } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";
import { DEFAULT_AVATAR } from "../utils/constant";
import {
  createChatRoom,
  getChatRooms,
} from "../api-fetch/personal-consultation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../context/authContext";
import dayjs from "dayjs";
import { pusherInstance } from "../utils/helper";
import { getAllPsikolog } from "../api-fetch/psikolog";

const PersonalConsultation = () => {
  const { roomId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rooms, setRooms] = useState([]);
  const { userInfo } = useAuthContext();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [psikologList, setPsikologList] = useState([]);
  const navigate = useNavigate();

  const fetchChatRooms = useCallback(async () => {
    try {
      const { data } = await getChatRooms();
      setRooms(data.data);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const handleFetchPsikolog = async () => {
    try {
      const { data } = await getAllPsikolog();
      setPsikologList(data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchChatRooms();
    handleFetchPsikolog();
  }, []);

  useEffect(() => {
    const channel = pusherInstance.subscribe(`user-${userInfo.id}`);

    channel.bind("fetch-chat-rooms", () => {
      fetchChatRooms();
    });

    return () => {
      pusherInstance.unsubscribe(`user-${userInfo.id}`);
    };
  }, [userInfo.id]);

  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) =>
        room.psikolog.name.toLowerCase().includes(searchKeyword)
      ),
    [searchKeyword, rooms]
  );

  const handleCreateChatRoom = async (psikologId) => {
    try {
      const { data } = await createChatRoom({ psikolog_id: psikologId });
      navigate(`/personal-consultation/${data.data.id}`);
      onClose();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSearchChat = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <Flex
      flexDir="column"
      py={4}
      mx="auto"
      maxW="7xl"
      h={{ base: "calc(100vh - 100px)", md: "calc(100vh - 120px)" }}
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
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaSearch} color="gray.300" />}
              />
              <Input
                mr={4}
                placeholder="Cari...."
                value={searchKeyword}
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
            {filteredRooms.map((room) => {
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
            })}
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
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign="center" fontSize="2xl" pb={0}>
            Daftar Psikolog
          </ModalHeader>
          <ModalBody px={6} minH="xs" maxH="sm" overflow="auto">
            {psikologList.map((psikolog) => (
              <Flex
                alignItems="center"
                cursor="pointer"
                py={2}
                key={psikolog.id}
              >
                <Image
                  src={psikolog.avatar_url || DEFAULT_AVATAR}
                  alt="avatar"
                  w={12}
                  h={12}
                  rounded="full"
                  objectFit="cover"
                  objectPosition="center"
                  mr={2}
                />
                <Text
                  key={psikolog.id}
                  fontSize="lg"
                  fontWeight="semibold"
                  onClick={() => handleCreateChatRoom(psikolog.id)}
                  cursor="pointer"
                >
                  {psikolog.name}
                </Text>
              </Flex>
            ))}
            <Divider />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default PersonalConsultation;
