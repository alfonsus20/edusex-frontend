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
import goldTrophy from "../assets/trophy/gold.png";
import silverTrophy from "../assets/trophy/silver.png";
import bronzeTrophy from "../assets/trophy/bronze.png";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { DEFAULT_AVATAR } from "../utils/constant";
import { useRef, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { getImageUrl } from "../api-fetch/upload";
import { editProfile } from "../api-fetch/profile";
import ProgressCheck from "../components/ProgressCheck";

const Profile = () => {
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
        description: "Nama berhasil diubah",
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
        description: "Foto berhasil diubah",
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
    <Box pt={8} px={4} pb={12} mx="auto" maxW="6xl">
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
                <Progress
                  value={(userInfo.progress?.passed_quiz * 100) / 8}
                  size="sm"
                />
              </Box>
              <Flex pos="relative" flexDir="column" w="18%" alignItems="center">
                <ProgressCheck isPassed={userInfo.progress?.passed_quiz >= 2} />
              </Flex>
              <Flex pos="relative" flexDir="column" w="18%" alignItems="center">
                <ProgressCheck isPassed={userInfo.progress?.passed_quiz >= 4} />
              </Flex>
              <Flex pos="relative" flexDir="column" w="18%" alignItems="center">
                <ProgressCheck isPassed={userInfo.progress?.passed_quiz >= 8} />
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
            <Flex
              alignItems="center"
              flexWrap="wrap"
              justifyContent="center"
              gap={3}
            >
              <Image
                w={24}
                h={24}
                src={userInfo.avatar_url || DEFAULT_AVATAR}
                alt="avatar"
                rounded="full"
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
              onClick={handleDeleteProfileImage}
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
            {userInfo.email}
          </Flex>
        </Flex>
        <Divider />
      </Box>
    </Box>
  );
};

export default Profile;
