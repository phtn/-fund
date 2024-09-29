import { z } from "zod";
import { StatusResult } from "./crypto";

export const FiatMapResultData = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    sign: z.string(),
    symbol: z.string(),
  }),
);

export type FiatMapResultDataSchema = z.infer<typeof FiatMapResultData>;

export const FiatMapResult = z.object({
  data: FiatMapResultData,
  status: StatusResult,
});

export type FiatMapResultSchema = z.infer<typeof FiatMapResult>;
