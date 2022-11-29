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
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getAllPsikolog } from "../api-fetch/psikolog";
import { DEFAULT_AVATAR } from "../utils/constant";

const AdminPsikologManagement = () => {
  const [psikologList, setPsikologList] = useState([]);

  useEffect(() => {
    const fetchAllPsikolog = async () => {
      try {
        const { data } = await getAllPsikolog();
        setPsikologList(data.data);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchAllPsikolog();
  }, []);

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
            {psikologList.map((psikolog, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}.</Td>
                <Td>{psikolog.name}</Td>
                <Td>{psikolog.email}</Td>
                <Td>
                  <Image
                    src={psikolog.avatar_url || DEFAULT_AVATAR}
                    w={16}
                    h={16}
                    alt="avatar"
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
