import { env } from "@/env";
import * as tronweb from "tronweb";

const trx = new tronweb.TronWeb({
  fullHost: "https://api.trongrid.io",
  headers: {
    "TRON-PRO-API-KEY": env.TRON_API_KEY,
  },
});

const newAccount = async () => await trx.createAccount();
export const createTronWallet = async () => {
  const account = await newAccount();
  const public_key = account.publicKey;
  const private_key = account.privateKey;
  const address_hex = account.address.hex;
  const address_b58 = account.address.base58;
  return { public_key, private_key, address_hex, address_b58 };
};
