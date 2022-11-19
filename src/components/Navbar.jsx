import { Box, Button, Flex, HStack, Icon, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <Box>
      <Flex justifyContent="space-between" py={4} px={4} maxW="8xl" mx="auto">
        <Image src={logo} alt="logo" width={28} height={12} />
        <HStack fontWeight={500} spacing={6}>
          <Link to="/">
            <Text>Beranda</Text>
          </Link>
          <Link to="/">
            <Text>Topik Materi</Text>
          </Link>
          <Link to="/">
            <Text>Forum Diskusi</Text>
          </Link>
          <Link to="/">
            <Text>Konsultasi Personal</Text>
          </Link>
        </HStack>
        <Button colorScheme="blue">Login</Button>
        {/* <Flex alignItems="center">
          <Image
            src="https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/default-avatar.png"
            width={8}
            height={8}
            marginRight={2}
          />
          <Icon as={FaChevronDown} width={3} />
        </Flex> */}
      </Flex>
    </Box>
  );
};

export default Navbar;
