import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";

const AdminRoute = () => {
  return (
    <Flex maxW="7xl" mx="auto" gap={4}>
      <SidebarAdmin />
      <Box flex="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};
export default AdminRoute;
