import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createPsikologAccount } from "../../api-fetch/psikolog";
import useError from "../../hooks/useError";

const AddPsikologSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  name: Yup.string().required(),
});

const AdminPsikologForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { handleError } = useError();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await createPsikologAccount(data);
      toast({
        status: "success",
        title: "Sukses",
        description: "Akun psikolog berhasil dibuat",
      });
      navigate("/admin/psikolog-management");
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: AddPsikologSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
  });

  return (
    <Box as="form" mx={4} onSubmit={formik.handleSubmit}>
      <Heading size="lg" fontWeight="semibold" mb={6}>
        Tambah Psikolog
      </Heading>
      <VStack alignItems="stretch" spacing={4}>
        <FormControl isInvalid={!!formik.errors.name}>
          <FormLabel htmlFor="name" mb={2} fontWeight={500}>
            Nama
          </FormLabel>
          <Input
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formik.errors.email}>
          <FormLabel htmlFor="email" mb={2} fontWeight={500}>
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
            id="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
      </VStack>
      <ButtonGroup gap={2} mt={8} justifyContent="flex-end" w="full">
        <Button
          variant="outline"
          colorScheme="blue"
          px={8}
          onClick={() => navigate(-1)}
          isDisabled={isSubmitting}
        >
          Batal
        </Button>
        <Button
          colorScheme="blue"
          px={8}
          type="submit"
          isLoading={isSubmitting}
        >
          Simpan
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default AdminPsikologForm;
