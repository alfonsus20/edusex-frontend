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

const Profile = () => {
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
    <Box pt={8} pb={12} mx="auto" maxW="6xl">
      <Heading size="lg" mb={4} as="h1">
        Profil Saya
      </Heading>
      <Box>
        <Flex py={4} alignItems="center">
          <Box w="25%">Level</Box>
          <Box w="75%" pos="relative">
            <Flex justifyContent="space-around" pos="relative">
              <Flex flexDir="column" w="18%" alignItems="center">
                <Image
                  src={bronzeTrophy}
                  alt="bronze"
                  w="full"
                  style={{ aspectRatio: 1 }}
                />
                <Text textAlign="center" color="#FCA764" fontWeight="semibold">
                  Bronze
                </Text>
              </Flex>
              <Box w="18%">
                <Image
                  src={silverTrophy}
                  alt="silver"
                  w="full"
                  style={{ aspectRatio: 1 }}
                />
                <Text textAlign="center" color="#D3CEC3" fontWeight="semibold">
                  Silver
                </Text>
              </Box>
              <Box w="18%">
                <Image
                  src={goldTrophy}
                  alt="gold"
                  w="full"
                  style={{ aspectRatio: 1 }}
                />
                <Text textAlign="center" color="#FFCA28" fontWeight="semibold">
                  Gold
                </Text>
              </Box>
            </Flex>
            <Flex
              justifyContent="space-around"
              pos="relative"
              alignItems="center"
            >
              <Box pos="absolute" w="full">
                <Progress value={80} size="sm" />
              </Box>
              <Flex pos="relative" flexDir="column" w="18%" alignItems="center">
                <Circle
                  size="2rem"
                  border="2px"
                  bg="blue.400"
                  borderColor="blue.400"
                  my={1}
                >
                  <Icon as={FaCheck} fontSize="xs" color="white" />
                </Circle>
              </Flex>
              <Flex pos="relative" flexDir="column" w="18%" alignItems="center">
                <Circle
                  size="2rem"
                  border="2px"
                  bg="blue.400"
                  borderColor="blue.400"
                  my={1}
                >
                  <Icon as={FaCheck} fontSize="xs" color="white" />
                </Circle>
              </Flex>
              <Flex pos="relative" flexDir="column" w="18%" alignItems="center">
                <Circle
                  size="2rem"
                  border="2px"
                  bg="blue.400"
                  borderColor="blue.400"
                  my={1}
                >
                  <Icon as={FaCheck} fontSize="xs" color="white" />
                </Circle>
              </Flex>
            </Flex>
            <Flex justifyContent="space-around">
              <Box w="18%">
                <Text textAlign="center">Sudah lulus</Text>
                <Text textAlign="center" fontWeight="bold">
                  2 kuis
                </Text>
              </Box>
              <Box w="18%">
                <Text textAlign="center">Sudah lulus</Text>
                <Text textAlign="center" fontWeight="bold">
                  4 kuis
                </Text>
              </Box>
              <Box w="18%">
                <Text textAlign="center">Sudah lulus</Text>
                <Text textAlign="center" fontWeight="bold">
                  8 kuis
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Divider />
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

export default Profile;
