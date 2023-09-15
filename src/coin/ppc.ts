import { Coin } from "../types";
import {
  createBase58WithCheckDecoder,
  createBase58WithCheckEncoder,
} from "../utils/bs58";

const name = "PPC";
const coinType = 6;

const p2pkhVersions = [[0x37]];
const p2shVersions = [[0x75]];

export const encodePpcAddress = createBase58WithCheckEncoder(
  p2pkhVersions[0],
  p2shVersions[0]
);
export const decodePpcAddress = createBase58WithCheckDecoder(
  p2pkhVersions,
  p2shVersions
);

export const ppc = {
  name,
  coinType,
  encode: encodePpcAddress,
  decode: decodePpcAddress,
} satisfies Coin;