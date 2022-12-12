import {
  Box,
  Flex,
  Heading,
  VStack,
  Image,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import loginImage from "../assets/login.png";
import { useAuthContext } from "../context/authContext";
import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const { login, isSubmitting } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: login,
    validateOnChange: false,
  });

  return (
    <Flex maxW="6xl" mx="auto" pt={4} pb={10}>
      <Image
        src={loginImage}
        style={{ aspectRatio: "1" }}
        alt="login"
        width="50%"
        display={{ base: "none", md: "block" }}
      />
      <Flex
        width={{ base: "full", md: "50%" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box shadow="lg" w="full" maxW="md" px={8} py={10}>
          <Heading as="h2" size="xl" mb={8} fontWeight={500}>
            Login
          </Heading>
          <VStack
            spacing={4}
            alignItems="stretch"
            as="form"
            onSubmit={formik.handleSubmit}
          >
            <FormControl isInvalid={!!formik.errors.email}>
              <FormLabel mb={2} fontWeight={500} htmlFor="email">
                Email
              </FormLabel>
              <Input
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formik.errors.password}>
              <FormLabel htmlFor="password" mb={2} fontWeight={500}>
                Password
              </FormLabel>
              <Input
                type="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button
              colorScheme="blue"
              w="full"
              type="submit"
              isLoading={isSubmitting}
            >
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
