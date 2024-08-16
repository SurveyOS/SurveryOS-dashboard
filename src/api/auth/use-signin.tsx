import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { SignInRequest, SignInResponse } from './types';
import { ServerErrorType } from '../types';

type Response = SignInResponse;
type Variables = SignInRequest;

export const useSignIn = createMutation<Response, Variables, ServerErrorType>(
  {
    mutationFn: async (variables) => {
      return client()({
        url: `/users/login`,
        method: 'POST',
        data: variables,
      }).then((response) => {
        return response.data;
      });
    },
  }
);
