import { z } from "zod";

export const CMCID = z.union([z.literal(2781), z.literal(2803)]);
export type CMCIDSchema = z.infer<typeof CMCID>;

export const StatusResult = z.object({
  credit_count: z.number(),
  elapsed: z.number(),
  error_code: z.number(),
  error_message: z.number(),
  timestamp: z.string().datetime(),
  total_count: z.number(),
});

export type StatusResultSchema = z.infer<typeof StatusResult>;

export const Quote = z
  .object({
    fully_diluted_market_cap: z.number(),
    last_updated: z.string().datetime(),
    market_cap: z.number(),
    market_cap_dominance: z.number(),
    percent_change_1h: z.number(),
    percent_change_7d: z.number(),
    percent_change_24h: z.number(),
    percent_change_30d: z.number(),
    percent_change_60d: z.number(),
    percent_change_90d: z.number(),
    price: z.number(),
    tvl: z.string().or(z.null()),
    volume_24h: z.number(),
    volume_change_24h: z.number(),
  })
  .or(z.null());

export type QuoteSchema = z.infer<typeof Quote>;

export const ListingsResultData = z.array(
  z.object({
    circulating_supply: z.number(),
    cmc_rank: z.number(),
    date_added: z.string().datetime(),
    id: z.number(),
    infinite_supply: z.boolean(),
    last_updated: z.string().datetime(),
    max_supply: z.number(),
    name: z.string(),
    num_market_pairs: z.number(),
    platform: z.string().or(z.null()),
    quote: z.record(z.string(), Quote).or(z.null().or(z.undefined())),
    self_reported_circulating_supply: z.number().or(z.null()),
    self_reported_market_cap: z.number().or(z.null()),
    slug: z.string().or(z.null()),
    symbol: z.string(),
    tags: z.array(z.string()),
    total_supply: z.number(),
    tvl_ratio: z.string().or(z.number().or(z.null())),
  }),
);

export type ListingsResultDataSchema = z.infer<typeof ListingsResultData>;

export const ListingsResult = z.object({
  data: ListingsResultData,
  status: StatusResult,
});

export type ListingsResultSchema = z.infer<typeof ListingsResult>;
