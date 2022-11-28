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
import { useParams } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";
import { DEFAULT_AVATAR } from "../utils/constant";
import { getChatRooms } from "../api-fetch/personal-consultation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { pusherInstance } from "../utils/helper";

dayjs.extend(timezone);
dayjs.extend(utc);

const PersonalConsultation = () => {
  const { roomId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rooms, setRooms] = useState([]);
  const { userInfo } = useAuthContext();

  const fetchChatRooms = async () => {
    try {
      const { data } = await getChatRooms();
      setRooms(data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    const channel = pusherInstance.subscribe(`user-${userInfo.id}`);

    channel.bind("fetch-chat-rooms", () => {
      fetchChatRooms();
    });

    return () => {
      pusherInstance.unsubscribe(`room-${roomId}`);
    };
  }, [userInfo.id]);

  return (
    <Flex
      flexDir="column"
      pt={4}
      pb={6}
      mx="auto"
      maxW="7xl"
      h="calc(100vh - 140px)"
    >
      <Heading size="lg" mb={3}>
        Konsultasi Personal
      </Heading>
      <Flex overflow="hidden" flex="auto">
        <Box
          w="40%"
          overflow="auto"
          p={2}
          borderRight="2px"
          borderColor="gray.200"
        >
          <Flex flex="auto">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaSearch} color="gray.300" />}
              />
              <Input mr={4} placeholder="Cari...." />
            </InputGroup>
            <IconButton
              icon={<Icon as={RiChatNewFill} fontSize="xl" />}
              colorScheme="blue"
              onClick={onOpen}
            />
          </Flex>
          <Box overflow="hidden">
            {rooms.map((room) => {
              return (
                <ChatRoom
                  name={room.psikolog?.name}
                  lastMessage={room.last_message || ""}
                  numberOfUnreadMessage={1}
                  time={dayjs(room.updated_at)
                    .utc(true)
                    .utcOffset(7)
                    .format("HH:mm")}
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
          w="60%"
          flexDir="column"
        >
          {roomId ? (
            <ChatPanel />
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
          <ModalHeader textAlign="center" fontSize="2xl">
            Daftar Psikolog
          </ModalHeader>
          <ModalBody px={6} minH="xs">
            <Flex alignItems="center" cursor="pointer" py={2}>
              <Image
                src={DEFAULT_AVATAR}
                alt="avatar"
                w={12}
                h={12}
                rounded="full"
                objectFit="cover"
                objectPosition="center"
                mr={2}
              />
              <Text fontSize="lg" fontWeight="semibold">
                William Chandrawan
              </Text>
            </Flex>
            <Divider />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default PersonalConsultation;
