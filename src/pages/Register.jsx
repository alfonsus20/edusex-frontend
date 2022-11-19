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
import registerImage from "../assets/register.png";

const Register = () => {
  return (
    <Flex maxW="6xl" mx="auto" pt={4} pb={10}>
      <Image
        src={registerImage}
        style={{ aspectRatio: "1/1" }}
        alt="register"
        width="50%"
      />
      <Flex width="50%" alignItems="center" justifyContent="center">
        <Box shadow="lg" w="full" maxW="md" px={8} py={10}>
          <Heading as="h2" size="xl" mb={8} fontWeight={500}>
            Register
          </Heading>
          <VStack spacing={4} alignItems="stretch">
            <Box>
              <Text mb={2} fontWeight={500}>
                Nama
              </Text>
              <Input />
            </Box>
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
              Register
            </Button>
            <Text textAlign="center">
              Sudah punya akun?{" "}
              <Text color="blue.400" as={Link} to="/login">
                Login
              </Text>{" "}
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
