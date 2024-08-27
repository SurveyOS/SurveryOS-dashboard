import { config } from "@/config/config";
import axios from "axios";
import { getSession } from "next-auth/react";

export const client = async () => {
  const session = await getSession();

  return axios.create({
    baseURL: `${config.CORE_NETWORK_URL}/api/v1`,
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
