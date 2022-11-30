import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import ChatRoom from "../components/ChatRoom";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { pusherInstance } from "../utils/helper";
import { useAuthContext } from "../context/authContext";
import { getChatRooms } from "../api-fetch/personal-consultation";
import { useEffect, useMemo, useRef, useState } from "react";

dayjs.extend(timezone);
dayjs.extend(utc);

const PsikologPersonalChat = () => {
  const [rooms, setRooms] = useState([]);
  const { userInfo } = useAuthContext();
  const searchRef = useRef();
  const [searchKeyword, setSearchKeyword] = useState("");

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
      pusherInstance.unsubscribe(`user-${userInfo.id}`);
    };
  }, [userInfo.id]);

  const handleSearch = () => {
    setSearchKeyword(searchRef.current.value);
  };

  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) =>
        room.user.name.toLowerCase().includes(searchKeyword)
      ),
    [searchKeyword, rooms]
  );

  return (
    <Box pb={8}>
      <Heading size="lg" fontWeight="semibold" mb={4}>
        Chat Personal
      </Heading>
      <Box p={2}>
        <Flex flex="auto" mb={2}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaSearch} color="gray.300" />}
            />
            <Input mr={4} ref={searchRef} placeholder="Cari...." />
          </InputGroup>
          <Button colorScheme="blue" onClick={handleSearch}>
            Cari
          </Button>
        </Flex>
        <Box>
          {filteredRooms.map((room) => (
            <ChatRoom
              key={room.id}
              name={room.user?.name}
              lastMessage={room.last_message}
              numberOfUnreadMessage={room.unread_chats}
              time={dayjs(room.updated_at)
                .utc(true)
                .utcOffset(7)
                .format("HH:mm")}
              avatar={room.user?.avatar_url}
              path={`/psikolog/personal-chat/${room.id}`}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PsikologPersonalChat;
