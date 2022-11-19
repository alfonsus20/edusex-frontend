import {
  Box,
  Flex,
  Heading,
  VStack,
  Image,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login.png";

const Login = () => {
  return (
    <Flex maxW="6xl" mx="auto" pt={4} pb={10}>
      <Image
        src={loginImage}
        style={{ aspectRatio: "1/1" }}
        alt="login"
        width="50%"
      />
      <Flex width="50%" alignItems="center" justifyContent="center">
        <Box shadow="lg" w="full" maxW="md" px={8} py={10}>
          <Heading as="h2" size="xl" mb={8} fontWeight={500}>
            Login
          </Heading>
          <VStack spacing={4} alignItems="stretch">
            <Box>
              <Text mb={2} fontWeight={500}>
                Email
              </Text>
              <Input />
            </Box>
            <Box>
              <Text mb={2} fontWeight={500}>
                Password
              </Text>
              <Input type="password" />
            </Box>
            <Button colorScheme="blue" w="full">
              Login
            </Button>
            <Text textAlign="center">
              Belum punya akun?{" "}
              <Text color="blue.400" as={Link} to="/register">
                Daftar
              </Text>{" "}
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
