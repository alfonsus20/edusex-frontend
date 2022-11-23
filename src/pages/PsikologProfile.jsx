import {
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Progress,
  Text,
} from "@chakra-ui/react";
import goldTrophy from "../assets/trophy/gold.png";
import silverTrophy from "../assets/trophy/silver.png";
import bronzeTrophy from "../assets/trophy/bronze.png";
import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa";
import { DEFAULT_AVATAR } from "../utils/constant";
import { useState } from "react";

const PsikologProfile = () => {
  const [isNameFieldOpen, setIsNameFieldOpen] = useState(false);

  const showNameField = () => {
    setIsNameFieldOpen(true);
  };

  const cancelUpdateName = () => {
    setIsNameFieldOpen(false);
  };

  const saveNameUpdate = () => {
    setIsNameFieldOpen(false);
  };

  return (
    <Box pb={8} mx="auto" maxW="6xl">
      <Heading fontWeight='semibold' size="lg" mb={4} as="h1">
        Profil Saya
      </Heading>
      <Box>
        <Flex py={4} alignItems="center">
          <Box w="25%">Foto</Box>
          <Flex alignItems="center" justifyContent="space-between" w="75%">
            <Flex alignItems="center">
              <Image
                w={24}
                h={24}
                rounded="full"
                src={DEFAULT_AVATAR}
                alt="avatar"
                mr={4}
              />
              <Button colorScheme="blue" leftIcon={<Icon as={FaPencilAlt} />}>
                Ubah
              </Button>
            </Flex>
            <Button
              variant="ghost"
              colorScheme="blue"
              leftIcon={<Icon as={FaTrash} />}
            >
              Hapus
            </Button>
          </Flex>
        </Flex>
        <Divider />
        <Flex py={4} alignItems="center">
          <Box w="25%">Nama</Box>
          <Flex
            fontWeight="semibold"
            alignItems="center"
            justifyContent="space-between"
            w="75%"
          >
            <Box>
              {!isNameFieldOpen ? (
                <Text>Alfonsus Avianto Chandrawan</Text>
              ) : (
                <Flex gap={4}>
                  <Input value="Alfonsus Avianto Chandrawan" />
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    px={8}
                    onClick={cancelUpdateName}
                  >
                    Batal
                  </Button>
                  <Button colorScheme="blue" px={8}>
                    Simpan
                  </Button>
                </Flex>
              )}
            </Box>
            <Button
              variant="ghost"
              colorScheme="blue"
              leftIcon={<Icon as={FaPencilAlt} />}
              onClick={showNameField}
            >
              Ubah
            </Button>
          </Flex>
        </Flex>
        <Divider />
        <Flex py={4} alignItems="center">
          <Box w="25%">Email</Box>
          <Flex
            fontWeight="semibold"
            alignItems="center"
            justifyContent="space-between"
            w="75%"
          >
            alfonschandrawan@gmail.com
          </Flex>
        </Flex>
        <Divider />
      </Box>
    </Box>
  );
};

export default PsikologProfile;
