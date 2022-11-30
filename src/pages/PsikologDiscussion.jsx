import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllQuestions } from "../api-fetch/discussion";

const PsikologDiscussion = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchDiscussionQuestions = async () => {
      try {
        const { data } = await getAllQuestions();
        setQuestions(data.data);
      } catch (error) {
        console.log({ error });
      }
    };

    fetchDiscussionQuestions();
  }, []);

  return (
    <Box>
      <Heading size="lg" fontWeight="semibold" mb={6}>
        Pertanyaan Diskusi
      </Heading>
      <TableContainer mb={8}>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama</Th>
              <Th>Pertanyaan</Th>
              <Th>Jumlah Balasan</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questions.map((question, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}.</Td>
                <Td>{question.user?.name}</Td>
                <Td>{question.question}</Td>
                <Td>{question.replies?.length}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    as={Link}
                    to={`/psikolog/discussion/${question.id}`}
                  >
                    Jawab
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PsikologDiscussion;
