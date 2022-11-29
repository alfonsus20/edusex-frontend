import { Navigate, Outlet } from "react-router-dom";
import SidebarPsikolog from "../components/SidebarPsikolog";
import SidebarAdmin from "../components/SidebarAdmin";
import { useAuthContext } from "../context/authContext";
import { Box, Flex, usePrevious, useToast } from "@chakra-ui/react";

const RoleBasedRoute = ({ role }) => {
  const { isAuthenticated, userInfo } = useAuthContext();
  const toast = useToast();
  const prevIsAuthenticated = usePrevious(isAuthenticated);

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

  if (!prevIsAuthenticated) {
    toast({
      status: "error",
      title: "Forbidden",
      description: "Login terlebih dahulu",
    });
  }

  return <Navigate to="/login" />;
};

export default RoleBasedRoute;
