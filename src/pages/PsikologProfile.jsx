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
  useToast,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { DEFAULT_AVATAR } from "../utils/constant";
import { useRef, useState } from "react";
import { editProfile } from "../api-fetch/profile";
import { getImageUrl } from "../api-fetch/upload";
import { useAuthContext } from "../context/authContext";

const PsikologProfile = () => {
  const [isNameFieldOpen, setIsNameFieldOpen] = useState(false);
  const { userInfo, fetchProfile } = useAuthContext();
  const toast = useToast();
  const nameFieldRef = useRef();

  const showNameField = () => {
    setIsNameFieldOpen(true);
  };

  const hideNameField = () => {
    setIsNameFieldOpen(false);
  };

  const saveNameUpdate = async () => {
    try {
      await editProfile({ name: nameFieldRef.current.value });
      toast({
        title: "Sukses",
        description: "Nama berhasil diperbaharui",
        status: "success",
      });
      fetchProfile();
    } catch (error) {
      console.log({ error });
    }

    hideNameField();
  };

  const handleUpdateProfileImage = async (imageFile) => {
    try {
      const { data } = await getImageUrl(imageFile);
      await editProfile({ avatar_url: data.data });
      toast({
        title: "Sukses",
        description: "Gambar profil berhasil diperbaharui",
        status: "success",
      });
      fetchProfile();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteProfileImage = async (imageFile) => {
    try {
      await editProfile({ avatar_url: "" });
      toast({
        title: "Sukses",
        description: "Gambar profil berhasil dihapus",
        status: "success",
      });
      fetchProfile();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Box pb={8} px={4} mx="auto" maxW="6xl">
      <Heading fontWeight="semibold" size="lg" mb={4} as="h1">
        Profil Saya
      </Heading>
      <Box>
        <Flex py={4} alignItems="center">
          <Box w="25%">Foto</Box>
          <Flex alignItems="center" justifyContent="space-between" w="75%">
            <Flex
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
              gap={3}
            >
              <Image
                w={24}
                h={24}
                rounded="full"
                src={userInfo.avatar_url || DEFAULT_AVATAR}
                alt="avatar"
                objectFit="cover"
                objectPosition="center"
              />
              <Input
                hidden
                id="avatar_image"
                name="avatar_image"
                accept="image/*"
                type="file"
                onChange={(e) => {
                  handleUpdateProfileImage(e.target.files[0]);
                }}
              />
              <Button
                colorScheme="blue"
                leftIcon={<Icon as={FaPencilAlt} />}
                as="label"
                htmlFor="avatar_image"
              >
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
                <Text noOfLines={1}>{userInfo.name}</Text>
              ) : (
                <Flex gap={4}>
                  <Input ref={nameFieldRef} defaultValue={userInfo.name} />
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    px={8}
                    onClick={hideNameField}
                  >
                    Batal
                  </Button>
                  <Button colorScheme="blue" px={8} onClick={saveNameUpdate}>
                    Simpan
                  </Button>
                </Flex>
              )}
            </Box>
            {!isNameFieldOpen && (
              <Button
                variant="ghost"
                colorScheme="blue"
                leftIcon={<Icon as={FaPencilAlt} />}
                onClick={showNameField}
              >
                Ubah
              </Button>
            )}
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
            noOfLines={1}
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
