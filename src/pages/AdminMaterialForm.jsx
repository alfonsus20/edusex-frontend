import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaFileUpload, FaTrash } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminMaterialForm = () => {
  const { materialId } = useParams();

  return (
    <Box pb={10}>
      <Heading size="lg" fontWeight="semibold" mb={4}>
        {materialId ? "Edit" : "Tambah"} Materi
      </Heading>
      <Heading size="md" as="h2" color="blue.400" fontWeight="semibold" mb={4}>
        Materi Bacaan
      </Heading>
      <VStack alignItems="stretch" spacing={4} mb={6}>
        <Box>
          <Text mb={2} fontWeight={500}>
            Judul
          </Text>
          <Input placeholder="Masukkan judul" />
        </Box>
        <Box>
          <Text mb={2} fontWeight={500}>
            Ilustrasi
          </Text>
          <Input
            type="file"
            id="foto"
            hidden
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => {}}
            name=""
          />
          <Button
            as="label"
            colorScheme="teal"
            leftIcon={<Icon as={FaFileUpload} />}
            htmlFor="foto"
          >
            Choose Image
          </Button>
        </Box>
        <Box>
          <Text mb={2} fontWeight={500}>
            Konten
          </Text>
          <ReactQuill theme="snow" value={""} onChange={() => {}} />
        </Box>
        <Box>
          <Text mb={2} fontWeight={500}>
            Link Video Youtube
          </Text>
          <Input placeholder="https://youtube.com/......." />
        </Box>
      </VStack>
      <Heading size="md" as="h2" color="blue.400" fontWeight="semibold" mb={4}>
        Soal Kuis
      </Heading>
      <VStack alignItems="stretch" spacing={4}>
        {[1, 2, 3].map((item) => (
          <Box px={6} py={4} borderWidth="2px" rounded="md">
            <Text fontWeight="semibold" mb={2}>
              Soal 1
            </Text>
            <VStack alignItems="stretch" spacing={3}>
              <Box>
                <Text mb={2} fontWeight={500}>
                  Pertanyaan
                </Text>
                <Input placeholder="Masukkan pertanyaan" />
              </Box>
              <Box>
                <Text mb={2} fontWeight={500}>
                  Daftar Pilihan Jawaban
                </Text>
                <VStack alignItems="stretch">
                  {[1, 2, 3].map((item) => (
                    <Flex gap={4}>
                      <Input placeholder="Pilihan jawaban 1" flex="auto" />
                      <IconButton
                        icon={<Icon as={FaTrash} />}
                        colorScheme="red"
                        variant="outline"
                      />
                    </Flex>
                  ))}
                  <Button
                    leftIcon={<Icon as={AiOutlinePlus} />}
                    alignSelf="flex-start"
                    size="xs"
                    colorScheme="purple"
                  >
                    Pilihan Baru
                  </Button>
                </VStack>
              </Box>
              <Box>
                <Text mb={2} fontWeight={500}>
                  Kunci Jawaban
                </Text>
                <Select placeholder="Pilih jawaban benar" />
              </Box>
              <Box>
                <Text mb={2} fontWeight={500}>
                  Pembahasan
                </Text>
                <Textarea placeholder="Masukkan pembahasan" resize="none" />
              </Box>
              <ButtonGroup justifyContent="flex-end">
                <Button
                  leftIcon={<Icon as={FaTrash} />}
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                >
                  Hapus Soal
                </Button>
                <Button
                  leftIcon={<Icon as={AiOutlinePlus} />}
                  colorScheme="purple"
                  size="sm"
                >
                  Soal Baru
                </Button>
              </ButtonGroup>
            </VStack>
          </Box>
        ))}
      </VStack>
      <ButtonGroup justifyContent="flex-end" w="full" mt={6}>
        <Button colorScheme="blue" variant="outline" px={6}>
          Batal
        </Button>
        <Button colorScheme="blue" px={6}>Simpan</Button>
      </ButtonGroup>
    </Box>
  );
};

export default AdminMaterialForm;
