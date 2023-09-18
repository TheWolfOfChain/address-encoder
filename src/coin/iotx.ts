import { Coin } from "../types";
import { createBech32Decoder, createBech32Encoder } from "../utils/bech32";

const name = "IOTX";
const coinType = 304;

const hrp = "io";

export const encodeIotxAddress = createBech32Encoder(hrp);
export const decodeIotxAddress = createBech32Decoder(hrp);

export const iotx = {
  name,
  coinType,
  encode: encodeIotxAddress,
  decode: decodeIotxAddress,
} satisfies Coin;
