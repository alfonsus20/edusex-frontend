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
} from "@chakra-ui/react";
import { RiChatNewFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import ChatRoom from "../components/ChatRoom";
import chooseChatImg from "../assets/choose-chat.svg";
import { useParams } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";

const PersonalConsultation = () => {
  const { roomId } = useParams();

  return (
    <Flex
      flexDir="column"
      pt={4}
      pb={10}
      mx="auto"
      maxW="7xl"
      maxH="calc(100vh - 140px)"
    >
      <Heading size="lg" mb={4}>
        Konsultasi Personal
      </Heading>
      <Flex overflow="hidden">
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
            />
          </Flex>
          <Box overflow="hidden">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <ChatRoom
                name="William"
                lastMessage="apa kareba"
                numberOfUnreadMessage={1}
                time="08:00"
                avatar=""
                roomId={item}
              />
            ))}
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
    </Flex>
  );
};

export default PersonalConsultation;
