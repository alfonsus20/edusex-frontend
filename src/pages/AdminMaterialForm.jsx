import { Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const AdminMaterialForm = () => {
  const { materialId } = useParams();

  return (
    <Box>
      <Heading size="lg" fontWeight="semibold" mb={6}>
        {materialId ? "Edit" : "Tambah"} Materi
      </Heading>
    </Box>
  );
};

export default AdminMaterialForm;
