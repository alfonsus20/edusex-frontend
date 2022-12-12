import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaFileUpload, FaTrash } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useTopicContext } from "../context/topicContext";
import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { checkYoutubeUrl } from "../utils/helper";
import { getImageUrl } from "../api-fetch/upload";
import {
  createMaterial,
  editMaterial,
  getMaterialByIdWithQuiz,
} from "../api-fetch/material";

const AdminMaterialForm = () => {
  const { materialId } = useParams();
  const { topics } = useTopicContext();
  const navigate = useNavigate();
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const AddMaterialSchema = useMemo(
    () =>
      Yup.object({
        title: Yup.string().required(),
        topic_id: Yup.number()
          .oneOf(topics.map((topic) => topic.id))
          .required(),
        content: Yup.string().required(),
        video_url: Yup.string()
          .required()
          .test({
            name: "isValidYoutubeUrl",
            message: "Link video youtube tidak valid",
            test: (val) => {
              if (!val) return val;
              return checkYoutubeUrl(val);
            },
          }),
        quiz_questions: Yup.array()
          .of(
            Yup.object({
              question: Yup.string().required(),
              explanation: Yup.string().required(),
              options: Yup.array()
                .of(
                  Yup.object({
                    option: Yup.string().required(),
                    is_true: Yup.boolean().required().default(false),
                  })
                )
                .min(2)
                .max(4)
                .test({
                  message: "Jawaban benar wajib diisi",
                  name: "rightChoice",
                  test: (val) => val.some((option) => option.is_true),
                }),
            })
          )
          .min(5),
        illustration_photo: materialId
          ? Yup.mixed().nullable()
          : Yup.mixed()
              .required()
              .test({
                name: "test file type",
                message: "Tipe file salah",
                test: (val) => {
                  if (!val) return true;
                  return val.type.includes("image");
                },
              }),
      }),
    [topics]
  );

  const handleSubmit = async (data) => {
    try {
      setIsSaving(true);
      const fixedData = {
        ...data,
        topic_id: +data.topic_id,
      };

      if (data.illustration_photo) {
        const {
          data: { data: imageUrl },
        } = await getImageUrl(data.illustration_photo);

        fixedData["illustration_url"] = imageUrl;
      }

      if (materialId) {
        console.log({ quiz: { ...data.quiz, questions: data.quiz_questions } });
        await editMaterial(materialId, {
          ...fixedData,
          quiz: { ...data.quiz, questions: data.quiz_questions },
          topic: { id: +data.topic_id },
        });
      } else {
        await createMaterial(fixedData);
      }

      navigate("/admin/material-management");
      toast({
        status: "success",
        title: "Sukses",
        description: `Materi berhasil ${materialId ? "diubah" : "dibuat"}`,
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsSaving(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      topic_id: "",
      illustration_photo: null,
      illustration_url: "",
      content: "",
      video_url: "",
      quiz_questions: [
        {
          question: "",
          explanation: "",
          options: [{ option: "", is_true: false }],
        },
      ],
    },
    validationSchema: AddMaterialSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
  });

  const handleChangeRightAnswer = (idxOption, idxQuestion) => {
    const newOptions = formik.values.quiz_questions[idxQuestion].options.map(
      (option, idx) =>
        idx === +idxOption
          ? { ...option, is_true: true }
          : { ...option, is_true: false }
    );
    formik.setFieldValue(`quiz_questions[${idxQuestion}].options`, newOptions);
  };

  const handleAddOption = (idxQuestion) => {
    formik.setFieldValue(`quiz_questions[${idxQuestion}].options`, [
      ...formik.values.quiz_questions[idxQuestion].options,
      { option: "", is_true: false },
    ]);
  };

  const handleDeleteOption = (idxQuestion, idxOption) => {
    const newOptions = [...formik.values.quiz_questions[idxQuestion].options];
    newOptions.splice(idxOption, 1);
    formik.setFieldValue(`quiz_questions[${idxQuestion}].options`, newOptions);
  };

  const handleAddQuestion = () => {
    formik.setFieldValue("quiz_questions", [
      ...formik.values.quiz_questions,
      {
        question: "",
        explanation: "",
        options: [{ option: "", is_true: false }],
      },
    ]);
  };

  const handleDeleteQuestion = (idxQuestion) => {
    const newQuestions = [...formik.values.quiz_questions];

    newQuestions.splice(idxQuestion, 1);

    formik.setFieldValue(`quiz_questions`, newQuestions);
  };

  useEffect(() => {
    if (materialId) {
      const handleFetchMaterial = async () => {
        try {
          const {
            data: { data },
          } = await getMaterialByIdWithQuiz(materialId);

          formik.setValues({
            ...data,
            topic_id: data.topic.id.toString(),
            quiz_questions: data.quiz.questions,
          });
        } catch (error) {
          console.log({ error });
        }
      };
      handleFetchMaterial();
    }
  }, [materialId]);

  console.log({ error: formik.errors });

  return (
    <Box pb={10} px={4}>
      <Heading size="lg" fontWeight="semibold" mb={4}>
        {materialId ? "Edit" : "Tambah"} Materi
      </Heading>
      <Heading size="md" as="h2" color="blue.400" fontWeight="semibold" mb={4}>
        Materi Bacaan
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <VStack alignItems="stretch" spacing={4} mb={6}>
          <FormControl isInvalid={!!formik.errors.title}>
            <FormLabel htmlFor="title" mb={2} fontWeight={500}>
              Judul
            </FormLabel>
            <Input
              id="title"
              value={formik.values.title}
              placeholder="Masukkan judul"
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formik.errors.topic_id}>
            <FormLabel htmlFor="topic_id" mb={2} fontWeight={500}>
              Topik
            </FormLabel>
            <Select
              id="topic_id"
              placeholder="Pilih topik"
              onChange={formik.handleChange}
              value={formik.values.topic_id}
            >
              {topics.map((topic) => (
                <option value={topic.id} key={topic.id}>
                  {topic.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{formik.errors.topic_id}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formik.errors.illustration_photo}>
            <FormLabel mb={2} fontWeight={500}>
              Ilustrasi
            </FormLabel>
            <Flex>
              {formik.values.illustration_photo ? (
                <Image
                  my={8}
                  mx="auto"
                  src={URL.createObjectURL(formik.values.illustration_photo)}
                  alt="illustration photo"
                  w={80}
                />
              ) : (
                formik.values.illustration_url && (
                  <Image
                    my={8}
                    mx="auto"
                    src={formik.values.illustration_url}
                    alt="illustration photo"
                    w={80}
                  />
                )
              )}
            </Flex>
            <Input
              type="file"
              id="illustration_photo"
              hidden
              accept="image/png, image/jpg, image/jpeg"
              onChange={(e) =>
                formik.setFieldValue("illustration_photo", e.target.files[0])
              }
            />
            <Button
              as="label"
              colorScheme="teal"
              leftIcon={<Icon as={FaFileUpload} />}
              htmlFor="illustration_photo"
            >
              Choose Image
            </Button>
            <FormErrorMessage>
              {formik.errors.illustration_photo}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formik.errors.content}>
            <FormLabel htmlFor="content" mb={2} fontWeight={500}>
              Konten
            </FormLabel>
            <ReactQuill
              id="content"
              theme="snow"
              value={formik.values.content}
              onChange={(val) => formik.setFieldValue("content", val)}
            />{" "}
            <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.video_url}>
            <FormLabel htmlFor="video_url" mb={2} fontWeight={500}>
              Link Video Youtube
            </FormLabel>
            <Input
              id="video_url"
              onChange={formik.handleChange}
              placeholder="https://youtube.com/......."
              value={formik.values.video_url}
            />
            <FormErrorMessage>{formik.errors.video_url}</FormErrorMessage>
          </FormControl>
        </VStack>
        <Heading
          size="md"
          as="h2"
          color="blue.400"
          fontWeight="semibold"
          mb={4}
        >
          Soal Kuis
        </Heading>
        <VStack alignItems="stretch" spacing={4}>
          {formik.values.quiz_questions?.map((question, idx) => (
            <Box px={6} py={4} borderWidth="2px" rounded="md" key={idx}>
              <Text fontWeight="semibold" mb={2}>
                Soal {idx + 1}
              </Text>
              <VStack alignItems="stretch" spacing={3}>
                <FormControl
                  isInvalid={
                    !!(
                      Array.isArray(formik.errors.quiz_questions) &&
                      formik.errors.quiz_questions[idx]?.question
                    )
                  }
                >
                  <FormLabel
                    htmlFor={`quiz_questions[${idx}].question`}
                    mb={2}
                    fontWeight={500}
                  >
                    Pertanyaan
                  </FormLabel>
                  <Input
                    id={`quiz_questions[${idx}].question`}
                    onChange={formik.handleChange}
                    placeholder="Masukkan pertanyaan"
                    value={question.question}
                  />
                  <FormErrorMessage>
                    {Array.isArray(formik.errors.quiz_questions) &&
                      formik.errors.quiz_questions[idx]?.question}
                  </FormErrorMessage>
                </FormControl>
                <Box>
                  <Text mb={2} fontWeight={500}>
                    Daftar Pilihan Jawaban
                  </Text>
                  <VStack alignItems="stretch">
                    {formik.values.quiz_questions[idx].options?.map(
                      (option, optionIdx) => (
                        <FormControl
                          isInvalid={
                            !!Array.isArray(formik.errors.quiz_questions) &&
                            Array.isArray(
                              formik.errors.quiz_questions[idx]?.options
                            ) &&
                            formik.errors.quiz_questions[idx]?.options[
                              optionIdx
                            ]?.option
                          }
                          gap={4}
                          key={optionIdx}
                        >
                          <Flex>
                            <Input
                              placeholder={`Pilihan jawaban ${optionIdx + 1}`}
                              flex="auto"
                              value={option.option}
                              id={`quiz_questions[${idx}].options[${optionIdx}].option`}
                              onChange={formik.handleChange}
                            />
                            <IconButton
                              icon={<Icon as={FaTrash} />}
                              colorScheme="red"
                              variant="outline"
                              onClick={() => handleDeleteOption(idx, optionIdx)}
                            />
                          </Flex>
                          <FormErrorMessage>
                            {Array.isArray(formik.errors.quiz_questions) &&
                              Array.isArray(
                                formik.errors.quiz_questions[idx]?.options
                              ) &&
                              formik.errors.quiz_questions[idx]?.options[
                                optionIdx
                              ]?.option}
                          </FormErrorMessage>
                        </FormControl>
                      )
                    )}
                    <Button
                      leftIcon={<Icon as={AiOutlinePlus} />}
                      alignSelf="flex-start"
                      size="xs"
                      colorScheme="purple"
                      onClick={() => handleAddOption(idx)}
                    >
                      Pilihan Baru
                    </Button>
                  </VStack>
                </Box>
                <FormControl
                  isInvalid={
                    Array.isArray(formik.errors.quiz_questions) &&
                    typeof formik.errors.quiz_questions[idx]?.options ===
                      "string"
                  }
                >
                  <Text mb={2} fontWeight={500}>
                    Kunci Jawaban
                  </Text>
                  <Select
                    placeholder="Pilih jawaban benar"
                    onChange={(e) => {
                      handleChangeRightAnswer(e.target.value, idx);
                    }}
                    value={formik.values.quiz_questions[idx].options?.findIndex(
                      (option) => option.is_true
                    )}
                  >
                    {formik.values.quiz_questions[idx].options?.map(
                      (option, optionIdx) => (
                        <option value={optionIdx}>{option.option}</option>
                      )
                    )}
                  </Select>
                  <FormErrorMessage>
                    {Array.isArray(formik.errors.quiz_questions) &&
                      formik.errors.quiz_questions[idx]?.options}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!(
                      Array.isArray(formik.errors.quiz_questions) &&
                      formik.errors.quiz_questions[idx]?.explanation
                    )
                  }
                >
                  <FormLabel
                    htmlFor={`quiz_questions[${idx}].explanation`}
                    mb={2}
                    fontWeight={500}
                  >
                    Pembahasan
                  </FormLabel>
                  <Textarea
                    id={`quiz_questions[${idx}].explanation`}
                    onChange={formik.handleChange}
                    value={formik.values.quiz_questions[idx].explanation}
                    placeholder="Masukkan pembahasan"
                    resize="none"
                  />{" "}
                  <FormErrorMessage>
                    {Array.isArray(formik.errors.quiz_questions) &&
                      formik.errors.quiz_questions[idx]?.explanation}
                  </FormErrorMessage>
                </FormControl>
                <ButtonGroup justifyContent="flex-end">
                  {formik.values.quiz_questions.length > 1 && (
                    <Button
                      leftIcon={<Icon as={FaTrash} />}
                      variant="outline"
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteQuestion(idx)}
                    >
                      Hapus Soal
                    </Button>
                  )}
                  <Button
                    leftIcon={<Icon as={AiOutlinePlus} />}
                    colorScheme="purple"
                    size="sm"
                    onClick={handleAddQuestion}
                  >
                    Soal Baru
                  </Button>
                </ButtonGroup>
              </VStack>
            </Box>
          ))}
        </VStack>
        {typeof formik.errors.quiz_questions === "string" && (
          <Text color="red.500" my={2}>
            {formik.errors.quiz_questions}
          </Text>
        )}
        <ButtonGroup justifyContent="flex-end" w="full" mt={6}>
          <Button
            colorScheme="blue"
            variant="outline"
            px={6}
            onClick={() => navigate(-1)}
            isDisabled={isSaving}
          >
            Batal
          </Button>
          <Button colorScheme="blue" px={6} type="submit" isLoading={isSaving}>
            Simpan
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default AdminMaterialForm;
