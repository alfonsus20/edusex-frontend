import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const AdminMaterialManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openDeleteModal = () => {
    onOpen();
  };

  return (
    <Box>
      <Heading size="lg" fontWeight="semibold" mb={6}>
        Manajemen Materi
      </Heading>
      <Flex>
        <Button
          leftIcon={<Icon as={AiOutlinePlus} />}
          colorScheme="blue"
          ml="auto"
          as={Link}
          to="/admin/material-management/add"
        >
          Tambah Materi
        </Button>
      </Flex>
      <TableContainer mb={8}>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Judul Materi</Th>
              <Th>Ilustrasi</Th>
              <Th>Topik</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}.</Td>
                <Td>Testing**</Td>
                <Td>
                  <Image
                    src="https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/material-ilustration/Basketball-rafiki%201.png?t=2022-11-19T09%3A13%3A39.663Z"
                    w={32}
                    alt="ilustrasi"
                  />
                </Td>
                <Td>Kesetaraan Gender</Td>
                <Td>
                  <ButtonGroup>
                    <Button
                      colorScheme="yellow"
                      as={Link}
                      to={`/admin/material-management/1/edit`}
                      color="white"
                    >
                      Edit
                    </Button>
                    <Button colorScheme="red" onClick={() => openDeleteModal()}>
                      Hapus
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>{" "}
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign="center" fontSize="2xl">
            Hapus Materi
          </ModalHeader>
          <ModalBody px={6} fontSize="lg">
            Apakah Anda yakin ingin menghapus materi ini?
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button onClick={onClose}>Tidak</Button>
              <Button colorScheme="red" px={6}>
                Ya
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminMaterialManagement;
