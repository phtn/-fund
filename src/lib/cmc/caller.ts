"use server";

import { api } from "@/trpc/server";
import type { CMCIDSchema } from "./crypto";

export const getCrypto = async (params: CMCIDSchema) =>
  await api.cmc.getCrypto(params);

export const getFiat = async () => await api.cmc.getFiat();
