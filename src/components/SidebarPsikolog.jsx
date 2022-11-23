import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MdOutlineGroup } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { Link, matchPath, useLocation } from "react-router-dom";

const PATHS = [
  {
    icon: MdOutlineGroup,
    text: "Pertanyaan Diskusi",
    pathname: "/psikolog/discussion",
    activePathPatterns: [
      "/psikolog/discussion",
      "/psikolog/discussion/:questionId",
    ],
  },
  {
    icon: BiChat,
    text: "Chat Personal",
    pathname: "/psikolog/personal-chat",
    activePathPatterns: [
      "/psikolog/personal-chat",
      "/psikolog/personal-chat/:roomId",
    ],
  },
  {
    icon: FaRegUser,
    text: "Profil",
    pathname: "/psikolog/profile",
    activePathPatterns: ["/psikolog/profile"],
  },
];

const SidebarPsikolog = () => {
  const { pathname } = useLocation();

  return (
    <Box flex="0 0 240px" pos="sticky" top={20} h="fit-content">
      {PATHS.map((path, idx) => {
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
            <Text>{path.text}</Text>
          </Flex>
        );
      })}
    </Box>
  );
};

export default SidebarPsikolog;
