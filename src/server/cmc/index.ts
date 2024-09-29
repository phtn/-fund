import type { CMCIDSchema, ListingsResultSchema } from "@/lib/cmc/crypto";
import type { AxiosInstance } from "axios";
import { createAxiosInstance, query } from "./axios";
import type { FiatMapResultSchema } from "@/lib/cmc/fiat";

const getCrypto = async (axiosInstance: AxiosInstance, id: CMCIDSchema) =>
  (
    await axiosInstance.get<ListingsResultSchema>(
      `https://pro-api.coinmarketcap.com${query.crypto_prices}=${id}`,
    )
  ).data;

export const crypto = async (id: CMCIDSchema) => {
  const axiosInstance = createAxiosInstance();
  return await getCrypto(axiosInstance, id);
};

const getFiat = async (axiosInstance: AxiosInstance) => {
  const { data } = await axiosInstance.get<FiatMapResultSchema>(
    `https://pro-api.coinmarketcap.com${query.fiat}`,
  );
  return data;
};

export const fiat = async () => {
  const axiosInstance = createAxiosInstance();
  return await getFiat(axiosInstance);
};
