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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import registerImage from "../assets/register.png";
import { useAuthContext } from "../context/authContext";
import * as Yup from "yup";

const RegisterSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  name: Yup.string().required(),
});

const Register = () => {
  const { register, isSubmitting } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: register,
    validateOnChange: false,
  });

  return (
    <Flex maxW="6xl" mx="auto" pt={4} pb={10}>
      <Image
        src={registerImage}
        style={{ aspectRatio: "1/1" }}
        alt="register"
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
            Register
          </Heading>
          <VStack
            spacing={4}
            alignItems="stretch"
            as="form"
            onSubmit={formik.handleSubmit}
          >
            <FormControl isInvalid={!!formik.errors.name}>
              <Text mb={2} fontWeight={500}>
                Nama
              </Text>
              <Input
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formik.errors.email}>
              <Text mb={2} fontWeight={500}>
                Email
              </Text>
              <Input
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!formik.errors.password}>
              <Text mb={2} fontWeight={500}>
                Password
              </Text>
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
              Daftar
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
