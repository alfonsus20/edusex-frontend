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

const PsikologPersonalChat = () => {
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
            <Input mr={4} placeholder="Cari...." />
          </InputGroup>
          <Button colorScheme="blue">Cari</Button>
        </Flex>
        <Box>
          {[1, 2, 3, 4, 5, 6, 7, 1, 1, 1, 1, 11].map((item) => (
            <ChatRoom
              name="Alfons"
              lastMessage="apa kareba"
              numberOfUnreadMessage={1}
              time="08:00"
              avatar=""
              roomId={item}
              path={`/psikolog/personal-chat/1`}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PsikologPersonalChat;
