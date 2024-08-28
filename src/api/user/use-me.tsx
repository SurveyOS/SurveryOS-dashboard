import { createQuery } from "react-query-kit";

import { client } from "../common";
import type { ServerErrorType, ServerResponseType } from "../types";
import type { MeResponse } from "./types";

type Response = ServerResponseType<MeResponse>;
type Variables = void;

export const useMe = createQuery<Response, Variables, ServerErrorType>({
  queryKey: ["me"],
  fetcher: async () => {
    return (await client())({
      url: "/users/me",
      method: "GET",
    }).then((response) => {
      return response.data;
    });
  },
});
