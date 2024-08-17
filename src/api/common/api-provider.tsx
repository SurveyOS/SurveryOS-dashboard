import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { type PersistQueryClientOptions, PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import type * as React from "react";

import { config } from "@/config/config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(config.REACT_QUERY_DEFAULT_STALE_TIME),
      gcTime: Number(config.REACT_QUERY_DEFAULT_CACHE_TIME),
    },
  },
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export const persistQueryClientOptions: PersistQueryClientOptions = {
  queryClient: queryClient,
  persister: asyncStoragePersister,
  maxAge: Number(config.REACT_QUERY_DEFAULT_MAX_AGE),
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
    <PersistQueryClientProvider client={queryClient} persistOptions={persistQueryClientOptions}>
      {children}
    </PersistQueryClientProvider>
  );
}
