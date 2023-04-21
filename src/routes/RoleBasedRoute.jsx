import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { Box, Flex, usePrevious, useToast } from "@chakra-ui/react";
import { Suspense, lazy } from "react";

const SidebarPsikolog = lazy(() => import("../components/SidebarPsikolog"));
const SidebarAdmin = lazy(() => import("../components/SidebarAdmin"));

const RoleBasedRoute = ({ role }) => {
  const { isAuthenticated, userInfo } = useAuthContext();
  const toast = useToast();
  const prevIsAuthenticated = usePrevious(isAuthenticated);

  if (isAuthenticated && userInfo.role === role) {
    if (role === "admin" || role === "psikolog") {
      return (
        <Flex maxW="7xl" mx="auto" gap={4} pos="relative">
          <Suspense>
            {role === "admin" ? <SidebarAdmin /> : <SidebarPsikolog />}
          </Suspense>
          <Box flex="auto" overflowX="hidden">
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
      title: "Unauthorized",
      description: "Login terlebih dahulu",
    });
  }

  return <Navigate to="/login" />;
};

export default RoleBasedRoute;
