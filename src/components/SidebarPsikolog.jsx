import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { PSIKOLOG_PATHS } from "../utils/constant";

const SidebarPsikolog = () => {
  const { pathname } = useLocation();

  return (
    <Box
      flex="0 0 240px"
      display={{ base: "none", md: "block" }}
      pos="sticky"
      top={20}
      h="fit-content"
    >
      {PSIKOLOG_PATHS.map((path, idx) => {
        const isMatchCurrentPath = path.activePathPatterns.some((pattern) =>
          matchPath(pattern, pathname)
        );
        return (
          <Flex
            key={idx}
            alignItems="center"
            py={3}
            px={4}
            color={isMatchCurrentPath ? "blue.400" : "gray.800"}
            bgColor={isMatchCurrentPath ? "#E8EFFE" : "transparent"}
            as={Link}
            to={path.pathname}
          >
            <Icon as={path.icon} fontSize="xl" mr={2} />
            <Text>{path.name}</Text>
          </Flex>
        );
      })}
    </Box>
  );
};

export default SidebarPsikolog;
