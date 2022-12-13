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
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ButtonGroup,
  VStack,
} from "@chakra-ui/react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { useAuthContext } from "../context/authContext";
import { ADMIN_PATHS, DEFAULT_AVATAR, PSIKOLOG_PATHS } from "../utils/constant";
import useComponentVisible from "../hooks/useComponentVisible";
import { useEffect, useMemo, useState } from "react";
import { pusherInstance } from "../utils/helper";
import {
  getAllNotifications,
  markAllNotificationAsRead,
  readNotification,
} from "../api-fetch/notification";
import dayjs from "dayjs";
import HamburgerMenu from "react-hamburger-menu";

const ROUTES = [
  { pathname: "/", name: "Beranda" },
  { pathname: "/topic", name: "Topic Materi" },
  { pathname: "/forum", name: "Forum Diskusi" },
  { pathname: "/personal-consultation", name: "Konsultasi Personal" },
];

const Navbar = () => {
  const { userInfo, isAuthenticated, logout } = useAuthContext();
  const {
    ref: profileDropdownRef,
    isComponentVisible: isProfileDropdownVisible,
    setIsComponentVisible: setisProfileDropdownVisible,
  } = useComponentVisible();
  const {
    ref: notificationDropdownRef,
    isComponentVisible: isNotificationDropdownVisible,
    setIsComponentVisible: setIsNotificationDropdownVisible,
  } = useComponentVisible();
  const toast = useToast();
  const navigate = useNavigate();
  const {
    isOpen: isLogoutModalOpen,
    onOpen: openLogoutModal,
    onClose: closeLogoutModal,
  } = useDisclosure();
  const {
    isOpen: isSidebarOpen,
    onOpen: openSidebar,
    onClose: closeSidebar,
    onToggle: toggleSidebar,
  } = useDisclosure();
  const { pathname } = useLocation();

  const [notifications, setNotifications] = useState([]);

  const unreadNotifications = useMemo(
    () =>
      notifications.reduce(
        (prev, notification) => prev + (notification.is_read === false ? 1 : 0),
        0
      ),
    [notifications]
  );

  const confirmLogout = () => {
    openLogoutModal();
    closeProfileDropdown();
  };

  const handleLogout = () => {
    logout();
    closeLogoutModal();
  };

  const openProfileDropdown = () => {
    setisProfileDropdownVisible(true);
  };

  const closeProfileDropdown = () => {
    setisProfileDropdownVisible(false);
  };

  const openNotificationDropdown = () => {
    setIsNotificationDropdownVisible(true);
  };

  const closeNotificationDropdown = () => {
    setIsNotificationDropdownVisible(false);
  };

  const showBrowserNotification = async (notification) => {
    const swReg = await navigator.serviceWorker.getRegistration();

    swReg.showNotification("Edusex", {
      body: notification.content,
      icon: "https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/logo_square.png",
    });
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await getAllNotifications();
      setNotifications(data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationAsRead();
      toast({
        status: "success",
        title: "Sukses",
        description: "Semua notifikasi telah dibaca",
      });
      fetchNotifications();
      closeNotificationDropdown();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isAuthenticated && userInfo.id) {
      fetchNotifications();

      const channel = pusherInstance.subscribe(`user-${userInfo.id}`);

      channel.bind("notification-received", (data) => {
        fetchNotifications();
        showBrowserNotification(data);
      });

      return () => {
        pusherInstance.unsubscribe(`user-${userInfo.id}`);
      };
    }
  }, [userInfo.id, isAuthenticated]);

  const getNotificationLink = (type) => {
    if (type === "discussion_forum") {
      if (userInfo.role === "psikolog") {
        return "/psikolog/discussion";
      }
      return "/forum";
    } else {
      if (userInfo.role === "psikolog") {
        return "/psikolog/personal-chat";
      }
      return "/personal-consultation";
    }
  };

  const handleReadNotification = async (id, type) => {
    try {
      await readNotification(id);
      navigate(getNotificationLink(type));
      closeNotificationDropdown();
      fetchNotifications();
    } catch (error) {
      console.log({ error });
    }
  };

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

  return (
    <>
      {" "}
      <Flex
        as="nav"
        pos="fixed"
        top={0}
        zIndex={90}
        w="full"
        flexDirection="column"
        bg="red"
      >
        <Flex
          w="full"
          justifyContent="space-between"
          alignItems="center"
          py={4}
          px={4}
          maxW="8xl"
          mx="auto"
          bg="white"
        >
          <Box as={Link} display={{ base: "none", md: "block" }} to="/">
            <Image src={logo} alt="logo" width={28} height={12} />
          </Box>
          <Box display={{ base: "block", md: "none" }}>
            <HamburgerMenu
              isOpen={isSidebarOpen}
              width={18}
              height={15}
              strokeWidth={2}
              rotate={0}
              color={false ? "white" : "black"}
              borderRadius={2}
              animationDuration={0.5}
              menuClicked={toggleSidebar}
            />
          </Box>
          {(userInfo.role === "user" || !isAuthenticated) && (
            <HStack
              fontWeight={500}
              spacing={6}
              display={{ base: "none", md: "flex" }}
            >
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
                  {notifications.map((notification) => (
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
                  ))}
                </Box>
              )}
            </>
          ) : (
            <Button colorScheme="blue" px={6} as={Link} to="/login">
              Login
            </Button>
          )}
        </Flex>
        <Modal
          onClose={closeLogoutModal}
          isOpen={isLogoutModalOpen}
          isCentered
          size="sm"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader textAlign="center" fontSize="2xl">
              Logout
            </ModalHeader>
            <ModalBody px={6} fontSize="lg">
              Apakah Anda yakin ingin keluar dari sistem?
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button onClick={closeLogoutModal}>Tidak</Button>
                <Button colorScheme="red" px={6} onClick={handleLogout}>
                  Ya
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Box
        pos="fixed"
        zIndex={90}
        w="full"
        flex="auto"
        left={{ base: isSidebarOpen ? "0%" : "-100%", md: "-100%" }}
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
    </>
  );
};

export default Navbar;
