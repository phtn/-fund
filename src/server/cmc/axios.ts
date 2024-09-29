import { env } from "@/env";
import axios from "axios";

export const createAxiosInstance = () =>
  axios.create({
    headers: {
      "X-CMC_PRO_API_KEY": `${env.COINMARKETCAP}`,
    },
    baseURL: `https://pro-api.coinmarketcap.com`,
    method: "GET",
  });

export const query = {
  quotes: "/v1/cryptocurrency/quotes/latest",
  listings:
    "/v1/cryptocurrency/listings/latest?convert_id=1&2781&convert_id=1,2803",
  fiat: "/v1/fiat/map",
  crypto_prices: "/v1/cryptocurrency/listings/latest?convert_id",
  // crypto_php: "/v1/cryptocurrency/listings/latest?convert_id=2803",
};
