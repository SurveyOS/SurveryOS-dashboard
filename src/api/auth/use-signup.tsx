import { createMutation } from "react-query-kit";

import { client } from "../common";
import type { ServerErrorType } from "../types";
import type { SignUpRequest, SignUpResponse } from "./types";

type Response = SignUpResponse;
type Variables = SignUpRequest;

export const useSignUp = createMutation<Response, Variables, ServerErrorType>({
  mutationFn: async (variables) => {
    return client()({
      url: "/users/create",
      method: "POST",
      data: variables,
    }).then((response) => {
      return response.data;
    });
  },
});
