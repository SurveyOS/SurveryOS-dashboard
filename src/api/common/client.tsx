import axios from "axios";

import { config } from "@/config/config";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("at")}`,
};

export const client = () => {
  return axios.create({
    baseURL: `${config.CORE_NETWORK_URL}/api/v1`,
    headers: localStorage.getItem("at") ? headers : {},
  });
};
