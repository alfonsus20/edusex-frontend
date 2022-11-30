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
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { useAuthContext } from "../context/authContext";
import { DEFAULT_AVATAR } from "../utils/constant";
import useComponentVisible from "../hooks/useComponentVisible";

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

  const handleLogout = () => {
    logout();
    closeProfileDropdown();
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

  return (
    <Box as="nav" pos="sticky" top={0} zIndex={90} bg="white">
      <Flex justifyContent="space-between" py={4} px={4} maxW="8xl" mx="auto">
        <Link to="/">
          <Image src={logo} alt="logo" width={28} height={12} />
        </Link>
        {(userInfo.role === "user" || !isAuthenticated) && (
          <HStack fontWeight={500} spacing={6}>
            <Link to="/">
              <Text>Beranda</Text>
            </Link>
            <Link to="/topic">
              <Text>Topik Materi</Text>
            </Link>
            <Link to="/forum">
              <Text>Forum Diskusi</Text>
            </Link>
            <Link to="/personal-consultation">
              <Text>Konsultasi Personal</Text>
            </Link>
          </HStack>
        )}
        {isAuthenticated ? (
          <Flex alignItems="center" pos="relative">
            {userInfo.role !== "admin" && (
              <Flex marginRight={3} pos="relative">
                <Icon
                  as={IoNotificationsOutline}
                  fontSize="1.8rem"
                  onClick={openNotificationDropdown}
                  cursor="pointer"
                />
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
                  1
                </Circle>
                {isNotificationDropdownVisible && (
                  <Box
                    shadow="md"
                    pos="absolute"
                    bg="white"
                    top="100%"
                    right="0%"
                    rounded="md"
                    w="26rem"
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
                      <Text color="blue.400">Tandai Semua Telah Dibaca</Text>
                    </Flex>
                    {[1, 2, 3, 3, 3, 3].map((item) => (
                      <Box py={2} bg="#E8EFFE" px={4}>
                        <Text fontSize="xs" mb={1}>
                          02 Nov 2022, 14:45 WIB
                        </Text>
                        <Text>
                          Pertanyaan kamu, “Bagaimana mencegah terjadinya
                          penyakit HIV/AIDS?” telah dijawab oleh Psikolog
                          William
                        </Text>
                      </Box>
                    ))}
                  </Box>
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
                  onClick={handleLogout}
                  pt={1}
                >
                  <Icon as={FaSignOutAlt} mr={2} />
                  <Text>Keluar</Text>
                </Flex>
              </Box>
            )}
          </Flex>
        ) : (
          <Button colorScheme="blue" px={6} as={Link} to="/login">
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
