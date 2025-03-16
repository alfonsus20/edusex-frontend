import axios from "axios";
import { isValidObject } from './helper';
import { createStandaloneToast } from "@chakra-ui/react";

const instance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

instance.interceptors.response.use(function (response) {
  const data = response.data;

  if (!isValidObject(data)) {
    const { toast } = createStandaloneToast();
    toast({ title: "Server tidak tersedia", status: 'error' });
    return Promise.reject("Unexpected data returned from server");
  }

  return response;
});

export default instance;
