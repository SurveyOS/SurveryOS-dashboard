import { createMutation } from "react-query-kit";

import { client } from "../common";
import type { ServerErrorType } from "../types";
import {CreateSurveyRequest, SurveyResponse} from "./types"

type Variables = CreateSurveyRequest;
type Response = SurveyResponse;


export const useCreateSurvey = createMutation<Response, Variables, ServerErrorType>({
  mutationFn: async (variables) => {
    return (await client())({
      url: "/survey/create",
      method: "POST",
      data: variables,
    }).then((response) => {
      return response.data;
    });
  },
});
