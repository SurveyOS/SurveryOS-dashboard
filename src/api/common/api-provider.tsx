import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import {
  type PersistQueryClientOptions,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import * as React from "react";

import { config } from "@/config/config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.REACT_QUERY_DEFAULT_STALE_TIME,
      gcTime: config.REACT_QUERY_DEFAULT_CACHE_TIME,
    },
  },
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
});

export const persistQueryClientOptions: PersistQueryClientOptions = {
  queryClient: queryClient,
  persister: asyncStoragePersister,
  maxAge: config.REACT_QUERY_DEFAULT_MAX_AGE,
  buster: config.REACT_QUERY_CACHE_BUSTER,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      const queryIsReadyForPersistance = query.state.status === "success";
      return queryIsReadyForPersistance;
    },
  },
};

export function APIProvider({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistQueryClientOptions}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
