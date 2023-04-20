import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const ModalDeleteMaterial = ({ onClose, isDeleting, handleDelete }) => {
  return (
    <Modal onClose={onClose} isOpen isCentered size="sm">
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
            <Button onClick={onClose} isDisabled={isDeleting}>
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
  );
};

export default ModalDeleteMaterial;
