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
import { Link } from "react-router-dom";

const PsikologDiscussion = () => {
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
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}.</Td>
                <Td>Testing**</Td>
                <Td>Bagaimana cara agar bisa mengatasi hubungan yang toxic?</Td>
                <Td>0</Td>
                <Td>
                  <Button colorScheme='blue' as={Link} to={`/psikolog/discussion/1`}>Jawab</Button>
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
