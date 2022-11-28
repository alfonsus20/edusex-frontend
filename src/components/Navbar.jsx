import { Box, Button, Flex, HStack, Icon, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaChevronDown } from "react-icons/fa";
import { useAuthContext } from "../context/authContext";
import { DEFAULT_AVATAR } from "../utils/constant";

const Navbar = () => {
  const { userInfo, isAuthenticated } = useAuthContext();

  return (
    <Box as="nav" pos="sticky" top={0} zIndex={90} bg="white">
      <Flex justifyContent="space-between" py={4} px={4} maxW="8xl" mx="auto">
        <Link to="/">
          <Image src={logo} alt="logo" width={28} height={12} />
        </Link>
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
        {isAuthenticated ? (
          <Flex alignItems="center">
            <Image
              src={userInfo.avatar_url || DEFAULT_AVATAR}
              width={8}
              height={8}
              marginRight={2}
            />
            <Icon as={FaChevronDown} width={3} />
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
