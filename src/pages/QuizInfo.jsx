import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuizInfo } from "../api-fetch/quiz";

const QuizInfo = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    const fetchQuizInfo = async () => {
      try {
        const { data } = await getQuizInfo(quizId);
        setQuiz(data.data);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchQuizInfo();
  }, []);

  return (
    <Box mx="auto" maxW="6xl" pt={8}>
      <Box mb={6}>
        <Heading fontWeight="semibold" as="h1" fontSize="3xl" mb={4}>
          Kuis Materi “Kenapa Seseorang Bisa Mimpi Basah? Begini Penjelasannya”
        </Heading>
        <VStack alignItems="flex-start" spacing={4} fontSize="lg" mb={4}>
          <Text>
            Kuis ini bertujuan untuk menguji pemahaman kamu terkait materi yang
            baru saja kamu pelajari.{" "}
          </Text>
          <Text>
            Terdapat {quiz.questions} pertanyaan yang harus dikerjakan dalam
            kuis ini dengan syarat nilai kelulusan{" "}
            <strong>{quiz.min_score}%</strong>
          </Text>
          <Text>
            Kamu dianggap telah menyelesaikan materi ini apabila telah memenuhi
            syarat kelulusan. Tenang saja, apabila kamu belum berhasil, kamu
            dapat mengerjakan ulang kuis ini lagi.
          </Text>
          <Text>Selamat Mengerjakan!</Text>
        </VStack>
        <Flex>
          <Button
            colorScheme="blue"
            ml="auto"
            size="lg"
            px={12}
            as={Link}
            to={`/quiz/${quizId}/do`}
          >
            Mulai
          </Button>
        </Flex>
      </Box>
      <Box>
        <Heading fontWeight="semibold" as="h2" fontSize="2xl" mb={4}>
          Riwayat
        </Heading>
        <TableContainer mb={8}>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Tanggal</Th>
                <Th>Persentase</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {quiz.attempts?.length === 0 ? (
                <Tr textAlign="center">
                  <Td colSpan={4} textAlign="center">
                    Belum ada data
                  </Td>
                </Tr>
              ) : (
                quiz.attempts?.map((item, idx) => (
                  <Tr key={idx}>
                    <Td>{idx + 1}.</Td>
                    <Td>10 September 2022, 11:20</Td>
                    <Td>80/100</Td>
                    <Td>
                      <Badge
                        colorScheme="green"
                        variant="solid"
                        fontSize="md"
                        px={6}
                        py={2}
                      >
                        Lulus
                      </Badge>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default QuizInfo;
