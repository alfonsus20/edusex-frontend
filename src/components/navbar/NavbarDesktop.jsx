import {
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import ModalLogout from "../modals/ModalLogout";
import { Suspense } from "react";
import { ROUTES } from "../../utils/constant";
import { Link, matchPath } from "react-router-dom";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import useNavbar from "./useNavbar";
import { IoNotificationsOutline } from "react-icons/io5";
import dayjs from "dayjs";

const NavbarDesktop = () => {
  const {
    userInfo,
    isAuthenticated,
    pathname,
    unreadNotifications,
    openNotificationDropdown,
    closeLogoutModal,
    DEFAULT_AVATAR,
    openProfileDropdown,
    isProfileDropdownVisible,
    closeProfileDropdown,
    confirmLogout,
    profileDropdownRef,
    notificationDropdownRef,
    handleMarkAllAsRead,
    handleReadNotification,
    isLogoutModalOpen,
    isNotificationDropdownVisible,
    notifications,
  } = useNavbar();

  return (
    <Flex
      as="nav"
      pos="fixed"
      top={0}
      zIndex={90}
      w="full"
      flexDirection="column"
      bg="white"
    >
      <Flex
        w="full"
        justifyContent="space-between"
        alignItems="center"
        py={4}
        px={4}
        maxW="8xl"
        mx="auto"
      >
        <Box as={Link} to="/">
          <Image src={logo} alt="logo" width={28} height={12} />
        </Box>
        {(userInfo.role === "user" || !isAuthenticated) && (
          <HStack fontWeight={500} spacing={6}>
            {ROUTES.map((route, idx) => (
              <Box as={Link} to={route.pathname} key={idx}>
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
                    display: matchPath(route.pathname, pathname)
                      ? "block"
                      : "none",
                  }}
                  pos="relative"
                >
                  {route.name}
                </Text>
              </Box>
            ))}
          </HStack>
        )}
        {isAuthenticated ? (
          <>
            <Flex alignItems="center" pos="relative">
              {userInfo.role !== "admin" && (
                <Flex marginRight={3} pos="relative">
                  <Icon
                    as={IoNotificationsOutline}
                    fontSize="1.8rem"
                    onClick={openNotificationDropdown}
                    cursor="pointer"
                  />
                  {unreadNotifications > 0 && (
                    <Circle
                      bg="red.400"
                      w={4}
                      h={4}
                      pos="absolute"
                      top={0}
                      p={2}
                      fontSize="xs"
                      right={-0.5}
                      color="white"
                    >
                      {unreadNotifications}
                    </Circle>
                  )}
                </Flex>
              )}
              <Image
                src={userInfo.avatar_url || DEFAULT_AVATAR}
                width={9}
                height={9}
                marginRight={2}
                rounded="full"
                objectFit="cover"
                objectPosition="center"
              />
              <Icon
                as={FaChevronDown}
                width={3}
                onClick={openProfileDropdown}
                cursor="pointer"
              />
              {isProfileDropdownVisible && (
                <Box
                  shadow="md"
                  pos="absolute"
                  bg="white"
                  top="100%"
                  right="0%"
                  rounded="md"
                  px={4}
                  w={40}
                  py={3}
                  ref={profileDropdownRef}
                >
                  <Box mb={2}>
                    <Text>Login sebagai</Text>
                    <Text fontWeight="semibold">{userInfo.name}</Text>
                  </Box>
                  {userInfo.role !== "admin" && (
                    <>
                      <Divider />
                      <Flex
                        alignItems="center"
                        py={1}
                        as={Link}
                        to={
                          userInfo.role === "psikolog"
                            ? "/psikolog/profile"
                            : "/profile"
                        }
                        cursor="pointer"
                        onClick={closeProfileDropdown}
                      >
                        <Icon as={FaUser} mr={2} />
                        <Text>Profil</Text>
                      </Flex>
                    </>
                  )}
                  <Divider />
                  <Flex
                    alignItems="center"
                    color="red.400"
                    cursor="pointer"
                    onClick={confirmLogout}
                    pt={1}
                  >
                    <Icon as={FaSignOutAlt} mr={2} />
                    <Text>Keluar</Text>
                  </Flex>
                </Box>
              )}
            </Flex>
            {isNotificationDropdownVisible && (
              <Box
                shadow="md"
                pos="absolute"
                bg="white"
                top="100%"
                right={{ base: "5.5rem" }}
                rounded="md"
                w="26rem"
                maxW="calc(100% - 5.5rem)"
                ref={notificationDropdownRef}
                fontSize="sm"
                maxH="260px"
                overflowY="auto"
              >
                <Flex
                  justifyContent="space-between"
                  px={4}
                  pos="sticky"
                  top={0}
                  bg="white"
                  py={2}
                >
                  <Text fontWeight="bold">Notifikasi</Text>
                  <Text
                    color="blue.400"
                    onClick={handleMarkAllAsRead}
                    cursor="pointer"
                  >
                    Tandai Semua Telah Dibaca
                  </Text>
                </Flex>
                {notifications.length === 0 ? (
                  <Text textAlign="center" py={4}>
                    Belum ada notifikasi
                  </Text>
                ) : (
                  notifications.map((notification) => (
                    <Box
                      key={notification.id}
                      py={2}
                      bg={notification.is_read ? "white" : "#E8EFFE"}
                      px={4}
                      onClick={() =>
                        handleReadNotification(
                          notification.id,
                          notification.type
                        )
                      }
                      cursor="pointer"
                    >
                      <Text fontSize="xs" mb={1}>
                        {dayjs(notification.created_at).format(
                          "DD-MM-YYYY HH:mm"
                        )}
                      </Text>
                      <Text>{notification.content}</Text>
                    </Box>
                  ))
                )}
              </Box>
            )}
          </>
        ) : (
          <Button colorScheme="blue" px={6} as={Link} to="/login">
            Login
          </Button>
        )}
      </Flex>
      <Suspense>
        {isLogoutModalOpen && <ModalLogout onClose={closeLogoutModal} />}
      </Suspense>
    </Flex>
  );
};
export default NavbarDesktop;
