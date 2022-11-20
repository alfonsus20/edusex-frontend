import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import CardDiscussion from "../components/CardDiscussion";

const Forum = () => {
  return (
    <Box pt={8} pb={12} mx="auto" maxW="6xl">
      <Heading size="lg" mb={4}>
        Forum Diskusi
      </Heading>
      <ButtonGroup mb={8}>
        <Button
          leftIcon={<Icon as={RiPencilFill} />}
          colorScheme="blue"
          variant="outline"
          size="lg"
        >
          Buat Pertanyaan
        </Button>
        <Button
          colorScheme="blue"
          size="lg"
          leftIcon={<Icon as={BsChatSquareDotsFill} />}
        >
          Pertanyaan Saya
        </Button>
      </ButtonGroup>
      <Box mb={4}>
        <Heading size="md" mb={4}>
          Diskusi Terbaru
        </Heading>
        <Flex mb={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaSearch} color="gray.300" />}
            />
            <Input mr={4} placeholder="Cari pertanyaan...." />
          </InputGroup>
          <Button colorScheme="orange" px={10}>
            Cari
          </Button>
        </Flex>
        <Flex alignItems="center" >
          <Text mr={3}>Topik: </Text>
          <Tabs variant="soft-rounded" colorScheme="orange">
            <TabList gap={2}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Tab
                  px={6}
                  py={1}
                  color="orange.500"
                  border="2px"
                  _selected={{ bg: "orange.500", color: "white" }}
                >
                  Tab {item}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </Flex>
      </Box>
      <Box>
        <CardDiscussion
          questionerName="Alfonsus"
          time="20 menit yang lalu"
          question="Bagaimana mencegah terjadinya penyakit HIV/AIDS?"
          numberOfRespond={1}
          psychologistName="William"
          questionId={1}
        />
        <CardDiscussion
          questionerName="Alfonsus"
          time="20 menit yang lalu"
          question="Bagaimana mencegah terjadinya penyakit HIV/AIDS?"
          numberOfRespond={1}
          psychologistName="William"
          questionId={1}
        />
        <CardDiscussion
          questionerName="Alfonsus"
          time="20 menit yang lalu"
          question="Bagaimana mencegah terjadinya penyakit HIV/AIDS?"
          numberOfRespond={1}
          psychologistName="William"
          questionId={1}
        />
      </Box>
    </Box>
  );
};

export default Forum;
