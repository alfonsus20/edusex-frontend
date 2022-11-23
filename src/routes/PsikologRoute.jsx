import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SidebarPsikolog from "../components/SidebarPsikolog";

const PsikologRoute = () => {
  return (
    <Flex maxW="7xl" mx="auto" gap={4} pos="relative">
      <SidebarPsikolog />
      <Box flex="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};
export default PsikologRoute;
