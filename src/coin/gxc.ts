import { Coin } from "../types";
import { createEosDecoder, createEosEncoder } from "../utils/eosio";

const name = "GXC";
const coinType = 2303;

const prefix = "GXC";

export const encodeGxcAddress = createEosEncoder(prefix);
export const decodeGxcAddress = createEosDecoder(prefix);

export const gxc = {
  name,
  coinType,
  encode: encodeGxcAddress,
  decode: decodeGxcAddress,
} as const satisfies Coin;