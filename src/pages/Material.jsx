import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import CardMaterial from "../components/CardMaterial";

const Material = () => {
  const { topicId } = useParams();

  return (
    <Box>
      <Box bg="#7262FD">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW="7xl"
          mx="auto"
        >
          <Box color="white" maxW="sm">
            <Heading mb={3} as="h2" fontWeight={500}>
              Pubertas
            </Heading>
            <Text>
              Merupakan tanda-tanda yang dialami ketika dalam masa transisi dari
              anak-anak ke dewasa.
            </Text>
          </Box>
          <Image
            src="https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/material-ilustration/Basketball-rafiki%201.png?t=2022-11-19T09%3A13%3A39.663Z"
            width={80}
          />
        </Flex>
      </Box>
      <Box maxW="7xl" mx="auto" py={8}>
        <Flex>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaSearch} color="gray.300" />}
            />
            <Input mr={4} placeholder="Cari materi...." />
          </InputGroup>
          <Button colorScheme="orange" px={10}>
            Cari
          </Button>
        </Flex>
      </Box>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={8}
        maxW="7xl"
        mx="auto"
        pb={12}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <CardMaterial
            id={3}
            title="lore upsma asdal asdmasd asdasd"
            image="https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/material-thumbnail/image%2028.png?t=2022-11-19T09%3A24%3A53.285Z"
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Material;
