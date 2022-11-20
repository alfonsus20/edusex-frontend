import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import trueAnswerImage from "../assets/true_ans.png";
import falseAnswerImage from "../assets/false_ans.png";

const Quiz = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mx="auto" maxW="7xl" pt={8} pb={12}>
      <Box>
        <Flex
          fontWeight="bold"
          justifyContent="space-between"
          fontSize="xl"
          mb={3}
        >
          <Text>Pertanyaan 1</Text>
          <Text>
            Score :{" "}
            <Text as="span" color="blue.400">
              20
            </Text>
          </Text>
        </Flex>
        <Progress value={20} rounded="md" />
      </Box>
      <Box mt={6}>
        <Heading size="lg" mb={6}>
          Mimpi basah biasanya mulai dialami pada usia?
        </Heading>
        <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={8} columnGap={12}>
          {[1, 2, 3].map((x) => (
            <GridItem
              bg="green.500"
              px={6}
              py={12}
              fontSize="xl"
              textAlign="center"
              cursor="pointer"
              color="white"
              rounded="md"
              _hover={{ shadow: "xl" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={onOpen}
            >
              Pilihan {x}
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
        closeOnEsc={false}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody px={10} py={8}>
            {true ? (
              <>
                <Heading
                  color="blue.400"
                  size="lg"
                  fontWeight="semibold"
                  as="h2"
                  textAlign="center"
                  mb={4}
                >
                  Yeay, Jawaban Kamu Benar!
                </Heading>
                <Image
                  src={trueAnswerImage}
                  w={60}
                  style={{ aspectRatio: 1 }}
                  alt="true answer"
                  mx="auto"
                  mb={4}
                />
                <Button w="full" colorScheme="blue" size="lg" onClick={onClose}>
                  Berikutnya
                </Button>
              </>
            ) : (
              <>
                <Heading
                  color="red.400"
                  size="lg"
                  fontWeight="semibold"
                  as="h2"
                  textAlign="center"
                  mb={4}
                >
                  Upss, Jawaban Kamu Salah!
                </Heading>
                <Image
                  src={falseAnswerImage}
                  w={60}
                  style={{ aspectRatio: 1 }}
                  alt="false answer"
                  mx="auto"
                  mb={4}
                />
                <Button w="full" colorScheme="red" size="lg" onClick={onClose}>
                  Berikutnya
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Quiz;
