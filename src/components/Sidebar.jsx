import { Box, Text, VStack } from "@chakra-ui/react";
import { ADMIN_PATHS, PSIKOLOG_PATHS, ROUTES } from "../utils/constant";
import { useAuthContext } from "../context/authContext";
import { Link, matchPath, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated, userInfo } = useAuthContext();

  const getRoutes = () => {
    switch (userInfo.role) {
      case "admin":
        return ADMIN_PATHS;
      case "psikolog":
        return PSIKOLOG_PATHS;
      default:
        return ROUTES;
    }
  };

  const { pathname } = useLocation();

  return (
    <Box
      pos="fixed"
      zIndex={90}
      w="full"
      flex="auto"
      left={{ base: isOpen ? "0%" : "-100%", md: "-100%" }}
      top="54.4px"
      transition="0.5s ease"
      bg="white"
      py={8}
      minH={40}
    >
      {(!!userInfo.role || !isAuthenticated) && (
        <VStack fontWeight={500} spacing={8}>
          {getRoutes().map((route, idx) => {
            const isActivePath =
              matchPath(route.pathname, pathname) ||
              route.activePathPatterns?.some((pattern) =>
                matchPath(pattern, pathname)
              );
            return (
              <Box
                as={Link}
                to={route.pathname}
                key={idx}
                onClick={toggleSidebar}
              >
                <Text
                  _after={{
                    content: "''",
                    w: 8,
                    h: 1,
                    bg: "blue.400",
                    position: "absolute",
                    top: "112%",
                    right: 0,
                    left: 0,
                    mx: "auto",
                    display: isActivePath ? "block" : "none",
                  }}
                  pos="relative"
                >
                  {route.name}
                </Text>
              </Box>
            );
          })}
        </VStack>
      )}
    </Box>
  );
};
export default Sidebar;
