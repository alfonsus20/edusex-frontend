import { useNavigate } from "react-router-dom";
import { createChatRoom } from "../../api-fetch/personal-consultation";
import {
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { DEFAULT_AVATAR } from "../../utils/constant";
import { useEffect, useState } from "react";
import { getAllPsikolog } from "../../api-fetch/psikolog";

const ModalPsikolog = ({ onClose }) => {
  const navigate = useNavigate();

  const [psikologList, setPsikologList] = useState([]);

  const handleCreateChatRoom = async (psikologId) => {
    try {
      const { data } = await createChatRoom({ psikolog_id: psikologId });
      navigate(`/personal-consultation/${data.data.id}`);
      onClose();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFetchPsikolog = async () => {
    try {
      const { data } = await getAllPsikolog();
      setPsikologList(data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    handleFetchPsikolog();
  }, []);

  return (
    <Modal onClose={onClose} isOpen isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader textAlign="center" fontSize="2xl" pb={0}>
          Daftar Psikolog
        </ModalHeader>
        <ModalBody px={6} minH="xs" maxH="sm" overflow="auto">
          {psikologList.map((psikolog) => (
            <Flex alignItems="center" cursor="pointer" py={2} key={psikolog.id}>
              <Image
                src={psikolog.avatar_url || DEFAULT_AVATAR}
                alt="avatar"
                w={12}
                h={12}
                rounded="full"
                objectFit="cover"
                objectPosition="center"
                mr={2}
              />
              <Text
                key={psikolog.id}
                fontSize="lg"
                fontWeight="semibold"
                onClick={() => handleCreateChatRoom(psikolog.id)}
                cursor="pointer"
              >
                {psikolog.name}
              </Text>
            </Flex>
          ))}
          <Divider />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalPsikolog;
