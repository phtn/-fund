"use client";

import { getCrypto } from "@/lib/cmc/caller";
import { type ListingsResultSchema } from "@/lib/cmc/crypto";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CryptoAsset {
  name: string;
  symbol: string;
  usd: number;
  php: number;
  h_change: number;
  rank: number;
  total_supply: number;
  mcap: number;
  max_supply: number;
  dominance: number;
}

interface CryptoValues {
  usd: ListingsResultSchema | undefined;
  php: ListingsResultSchema | undefined;
  list: CryptoAsset[] | undefined;
}

const CryptoCtx = createContext<CryptoValues | null>(null);

export const Crypto = ({ children }: PropsWithChildren) => {
  const [php, setPhp] = useState<ListingsResultSchema | undefined>();
  const [usd, setUsd] = useState<ListingsResultSchema | undefined>();
  const [list, setList] = useState<CryptoAsset[] | undefined>();

  const getPrices = async () => {
    const prices_php = await getCrypto(2803);
    const prices_usd = await getCrypto(2781);
    return { prices_php, prices_usd };
  };

  useEffect(() => {
    getPrices()
      .then((crypto) => {
        setPhp(crypto.prices_php);
        setUsd(crypto.prices_usd);
        if (crypto) {
          const crypto_assets = crypto.prices_usd.data.map((asset) => {
            const { name, symbol, quote, max_supply, cmc_rank, total_supply } =
              asset;
            return {
              name,
              symbol: symbol.toLowerCase(),
              usd: quote?.["2781"]?.price,
              h_change: quote?.["2781"]?.percent_change_1h,
              dominance: quote?.["2781"]?.market_cap_dominance,
              mcap: quote?.["2781"]?.market_cap,
              max_supply,
              rank: cmc_rank,
              total_supply,
              php: crypto.prices_php.data.find((a) => a.cmc_rank === cmc_rank)
                ?.quote?.["2803"]?.price,
            };
          }) as CryptoAsset[];
          setList(crypto_assets);
        }
      })
      .catch(console.log);
  }, []);
  return (
    <CryptoCtx.Provider value={{ php, usd, list }}>
      {children}
    </CryptoCtx.Provider>
  );
};

export const useCryptoCtx = () => {
  const context = useContext(CryptoCtx);
  if (!context) throw new Error();
  return context;
};
