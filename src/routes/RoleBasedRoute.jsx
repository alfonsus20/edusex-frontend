import { Navigate, Outlet } from "react-router-dom";
import SidebarPsikolog from "../components/SidebarPsikolog";
import SidebarAdmin from "../components/SidebarAdmin";
import { useAuthContext } from "../context/authContext";
import { Box, Flex } from "@chakra-ui/react";

const RoleBasedRoute = ({ role }) => {
  const { isAuthenticated, userInfo } = useAuthContext();

  if (isAuthenticated && userInfo.role === role) {
    if (role === "admin" || role === "psikolog") {
      return (
        <Flex maxW="7xl" mx="auto" gap={4} pos="relative">
          {role === "admin" ? <SidebarAdmin /> : <SidebarPsikolog />}
          <Box flex="auto">
            <Outlet />
          </Box>
        </Flex>
      );
    }

    return <Outlet />;
  }

  return <Navigate to="/login" />;
};
export default RoleBasedRoute;
