import { Coin } from "../types";
import { base58Decode, base58Encode } from "../utils/base58";

const name = "NMC";
const coinType = 7;

export const encodeNmcAddress = base58Encode;
export const decodeNmcAddress = base58Decode;

export const nmc = {
  name,
  coinType,
  encode: encodeNmcAddress,
  decode: decodeNmcAddress,
} as const satisfies Coin;
