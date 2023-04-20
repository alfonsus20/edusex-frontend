import { useAuthContext } from "../../context/authContext";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

const ModalLogout = ({ onClose }) => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Modal onClose={onClose} isCentered isOpen size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader textAlign="center" fontSize="2xl">
          Logout
        </ModalHeader>
        <ModalBody px={6} fontSize="lg">
          Apakah Anda yakin ingin keluar dari sistem?
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onClose}>Tidak</Button>
            <Button colorScheme="red" px={6} onClick={handleLogout}>
              Ya
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalLogout;
