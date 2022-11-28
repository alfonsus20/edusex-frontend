import { Box, Flex, Heading } from "@chakra-ui/react";
import ChatPanel from "../components/ChatPanel";

const PsikologPersonalChatDetail = () => {
  return (
    <Box h="full" pb={8}>
      <Flex flexDir="column" h="full" maxH="calc(100vh - 140px)">
        <Heading size="lg" fontWeight="semibold" mb={4}>
          Chat Personal
        </Heading>
        <Box flex="auto" overflow="hidden">
          <ChatPanel />
        </Box>
      </Flex>
    </Box>
  );
};

export default PsikologPersonalChatDetail;