import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MdOutlineGroup } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { Link, matchPath, useLocation } from "react-router-dom";

const PATHS = [
  {
    icon: IoMdDocument,
    text: "Manajemen Materi",
    pathname: "/admin/material-management",
    activePathPatterns: [
      "/admin/material-management",
      "/admin/material-management/:questionId",
    ],
  },
  {
    icon: MdOutlineGroup,
    text: "Manajemen Psikolog",
    pathname: "/admin/psikolog-management",
    activePathPatterns: [
      "/admin/psikolog-management",
      "/admin/psikolog-management/new-psikolog",
    ],
  },
];

const SidebarAdmin = () => {
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

export default SidebarAdmin;
