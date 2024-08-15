import axios from "axios";

import { config } from "@/config/config";

export const client = () => {
  return axios.create({
    baseURL: `${config.CORE_NETWORK_URL}/api/v1`,
  });
};
