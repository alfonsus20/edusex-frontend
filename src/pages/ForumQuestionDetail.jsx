import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Image,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionReply from "../components/QuestionReply";
import { DEFAULT_AVATAR } from "../utils/constant";

const ForumQuestionDetail = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();

  return (
    <Box pt={8} pb={12} mx="auto" maxW="6xl">
      <Heading size="lg" mb={4} as="h1">
        Forum Diskusi
      </Heading>
      <Heading size="md" mb={4} as="h2">
        Detail Pertanyaan
      </Heading>
      <Box mb={4}>
        <Flex gap={4} mb={2} alignItems="center">
          <Circle size={14} bg="blue.200" fontSize="3xl" color="white">
            A
          </Circle>
          <Box flex="auto">
            <Text fontWeight="bold">Alfons</Text>
            <Text>Penanya</Text>
          </Box>
          <Box textAlign="right">
            <Text>27 September 2022</Text>
            <Text>16:00</Text>
          </Box>
        </Flex>
        <Text>Bagaimana mencegah terjadinya penyakit HIV/AIDS?</Text>
      </Box>
      <Box ml={4} mb={8}>
        <Heading size="sm" mb={4}>
          Balasan
        </Heading>
        <VStack spacing={6} mb={6}>
          <QuestionReply
            reply="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque leo sed nec placerat vel, morbi ut. Sit vel porta placerat vulputate nullam a et sit sit. Pretium accumsan, vitae integer mauris, vestibulum tincidunt proin sed. Eget tempor non consequat consequat, tellus non tortor, sit. Velit aenean ullamcorper elit, vel turpis fames. Sollicitudin lacus, euismod nibh tincidunt felis egestas. Massa integer faucibus vitae gravida placerat eleifend amet, sit."
            userName="William Setiawan"
            role="Psikolog"
            date="27 September 2022"
            time="16:00"
          />
          <QuestionReply
            reply="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque leo sed nec placerat vel, morbi ut. Sit vel porta placerat vulputate nullam a et sit sit. Pretium accumsan, vitae integer mauris, vestibulum tincidunt proin sed. Eget tempor non consequat consequat, tellus non tortor, sit. Velit aenean ullamcorper elit, vel turpis fames. Sollicitudin lacus, euismod nibh tincidunt felis egestas. Massa integer faucibus vitae gravida placerat eleifend amet, sit."
            userName="William Setiawan"
            role="Psikolog"
            date="27 September 2022"
            time="16:00"
          />
        </VStack>
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
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Berikan Komentar
            </Text>
            <Textarea
              placeholder="Ketikkan komentarmu"
              resize="none"
              rows={5}
              mb={4}
            />
            <Flex>
              <Button ml="auto" colorScheme="blue" px={8}>
                Kirim
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Flex gap={6} justifyContent="center">
        <Button
          size="lg"
          variant="outline"
          colorScheme="blue"
          onClick={() => navigate(-1)}
        >
          Kembali
        </Button>
        <Button size="lg" colorScheme="blue" onClick={() => navigate("/forum")}>
          Lihat Pertanyaan Lain
        </Button>
      </Flex>
    </Box>
  );
};

export default ForumQuestionDetail;
