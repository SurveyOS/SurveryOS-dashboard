import { createQuery } from "react-query-kit";

import { client } from "../common";
import type { ServerErrorType } from "../types";

type Response = any;
type Variables = void;

export const useRefreshToken = createQuery<Response, Variables, ServerErrorType>({
  queryKey: ["refresh-token"],
  staleTime: 1000 * 60 * 60, // 60 minutes in ms
  refetchInterval: (data) => !!data && 1000 * 60 * 60,
  fetcher: async () => {
    return client()({
      url: "/users/refresh-token",
      method: "GET",
    }).then((response) => {
      return response.data;
    });
  },
});
