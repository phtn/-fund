import { CMCID } from "@/lib/cmc/crypto";
import { proc, router } from "../trpc";
import { crypto, fiat } from "@/server/cmc";

export const getCryptoProc = proc.input(CMCID);

export const cmc = router({
  getCrypto: getCryptoProc.query(async ({ input }) => await crypto(input)),
  getFiat: proc.query(async () => await fiat()),
});
