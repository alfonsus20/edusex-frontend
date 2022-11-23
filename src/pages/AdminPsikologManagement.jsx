import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../utils/constant";

const AdminPsikologManagement = () => {
  return (
    <Box>
      <Heading size="lg" fontWeight="semibold" mb={6}>
        Manajemen Psikolog
      </Heading>
      <Flex>
        <Button
          leftIcon={<Icon as={AiOutlinePlus} />}
          colorScheme="blue"
          ml="auto"
          as={Link}
          to="/admin/psikolog-management/new-psikolog"
        >
          Tambah Psikolog
        </Button>
      </Flex>
      <TableContainer mb={8}>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama</Th>
              <Th>Email</Th>
              <Th>Foto</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}.</Td>
                <Td>Testing**</Td>
                <Td>psikolog1@gmail.com</Td>
                <Td>
                  <Image
                    src={DEFAULT_AVATAR}
                    w={20}
                    h={20}
                    alt="ilustrasi"
                    rounded="full"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPsikologManagement;
