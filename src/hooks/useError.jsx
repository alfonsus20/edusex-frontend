import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

function useError() {
  const snackbar = useToast();

  const handleError = (err, message) => {
    const errorMessage =
      err instanceof AxiosError ? err.response?.data.message : message;

    snackbar({
      title: errorMessage,
      status: "error",
    });
  };

  return { handleError };
}

export default useError;
