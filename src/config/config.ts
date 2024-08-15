import z from "zod";

const envValidation = z
  .object({
    CORE_NETWORK_URL: z.string().default("http://localhost:8080"),
    REACT_QUERY_DEFAULT_MAX_AGE: z.number().default(Infinity),
    REACT_QUERY_DEFAULT_CACHE_TIME: z.number().default(1000 * 60 * 60 * 24 * 7),
    REACT_QUERY_DEFAULT_STALE_TIME: z.number().default(1000 * 20),
    REACT_QUERY_CACHE_BUSTER: z.string().default("1"),
  })
  .safeParse(process.env);

const { error, data: env } = envValidation;

if (error) {
  throw new Error(`Config validation error: ${error.errors}`);
}

export const config = {
  CORE_NETWORK_URL: env.CORE_NETWORK_URL,
  REACT_QUERY_DEFAULT_MAX_AGE: env.REACT_QUERY_DEFAULT_MAX_AGE,
  REACT_QUERY_DEFAULT_CACHE_TIME: env.REACT_QUERY_DEFAULT_CACHE_TIME,
  REACT_QUERY_DEFAULT_STALE_TIME: env.REACT_QUERY_DEFAULT_STALE_TIME,
  REACT_QUERY_CACHE_BUSTER: env.REACT_QUERY_CACHE_BUSTER,
};
