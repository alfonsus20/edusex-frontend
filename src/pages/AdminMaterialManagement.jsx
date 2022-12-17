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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteMaterial, getAllMaterials } from "../api-fetch/material";

const AdminMaterialManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [materials, setMaterials] = useState([]);
  const [deletedMaterialId, setDeletedMaterialId] = useState(null);
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAllMaterials = async () => {
    try {
      const { data } = await getAllMaterials();
      setMaterials(data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const openDeleteModal = (materialId) => {
    onOpen();
    setDeletedMaterialId(materialId);
  };

  const closeDeleteModal = () => {
    onClose();
    setDeletedMaterialId(null);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteMaterial(deletedMaterialId);
      toast({
        status: "success",
        title: "Sukses",
        description: "Materi berhasil dihapus",
      });
      closeDeleteModal();
      fetchAllMaterials();
    } catch (error) {
      console.log({ error });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchAllMaterials();
  }, []);

  return (
    <Box px={6}>
      <Heading size="lg" fontWeight="semibold" mb={6}>
        Manajemen Materi
      </Heading>
      <Flex mb={4}>
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
            {materials.length === 0 ? (
              <Tr>
                <Td colSpan={5} textAlign="center">
                  Belum terdapat materi
                </Td>
              </Tr>
            ) : (
              materials.map((material, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}.</Td>
                  <Td>{material.title}</Td>
                  <Td>
                    <Image
                      src={material.illustration_url}
                      w={32}
                      alt="ilustrasi"
                    />
                  </Td>
                  <Td>{material.topic?.name}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        colorScheme="yellow"
                        as={Link}
                        to={`/admin/material-management/${material.id}/edit`}
                        color="white"
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => openDeleteModal(material.id)}
                      >
                        Hapus
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>{" "}
      <Modal onClose={closeDeleteModal} isOpen={isOpen} isCentered size="sm">
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
              <Button onClick={closeDeleteModal} isDisabled={isDeleting}>
                Tidak
              </Button>
              <Button
                colorScheme="red"
                px={6}
                onClick={handleDelete}
                isLoading={isDeleting}
              >
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
