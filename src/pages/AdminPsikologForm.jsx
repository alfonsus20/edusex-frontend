import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const AdminPsikologForm = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();

  return (
    <Box>
      <Heading size="lg" fontWeight="semibold" mb={6}>
        Tambah Psikolog
      </Heading>
      <VStack alignItems="stretch" spacing={4}>
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
      </VStack>
      <ButtonGroup gap={2} mt={8} justifyContent="flex-end" w="full">
        <Button
          variant="outline"
          colorScheme="blue"
          px={8}
          onClick={() => navigate(-1)}
        >
          Batal
        </Button>
        <Button colorScheme="blue" px={8}>
          Simpan
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default AdminPsikologForm;
