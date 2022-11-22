import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { DEFAULT_AVATAR } from "../utils/constant";

const ForumAskQuestion = () => {
  return (
    <Box pt={8} pb={12} mx="auto" maxW="6xl">
      <Heading size="lg" mb={4} as="h1">
        Forum Diskusi
      </Heading>
      <Heading size="md" mb={4} as="h2">
        Buat Pertanyaan
      </Heading>
      <Flex>
        <Image
          w={14}
          height={14}
          rounded="full"
          src={DEFAULT_AVATAR}
          alt="avatar"
          mr={4}
        />
        <Box flex="auto" pt={2}>
          <Text fontSize="md" fontWeight="semibold" mb={3}>
            Pertanyaan
          </Text>
          <Textarea
            placeholder="Ketikkan pertanyaanmu"
            resize="none"
            rows={5}
            mb={4}
          />
          <Text fontSize="md" fontWeight="semibold" mb={3}>
            Topik
          </Text>
          <Select placeholder='Pilih topik' mb={8}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Flex>
            <Button ml="auto" colorScheme="blue" px={8}>
              Kirim
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ForumAskQuestion;
