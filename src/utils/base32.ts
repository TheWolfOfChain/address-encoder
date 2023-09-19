export type Base32Options = {
  alphabet: string;
  base32Lookup: number[];
};

export const createBase32Options = (alphabet: string): Base32Options => {
  const base32Lookup: number[] = alphabet
    .split("")
    .reduce((acc, char, index) => {
      acc[char.charCodeAt(0)] = index;
      return acc;
    }, [] as number[]);
  return { alphabet, base32Lookup };
};

const DEFAULT_BASE32_OPTIONS = createBase32Options(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
);

export const base32Encode = (
  input: Uint8Array,
  { alphabet }: Base32Options = DEFAULT_BASE32_OPTIONS
): string => {
  const length = input.length;
  const leftover = (length * 8) % 5;
  const offset = leftover === 0 ? 0 : 5 - leftover;

  let buffer = 0;
  let bufferLength = 0;
  let output = "";

  for (let i = 0; i < length; i++) {
    buffer = (buffer << 8) | input[i];
    bufferLength += 8;

    while (bufferLength >= 5) {
      const index = (buffer >>> (bufferLength + offset - 5)) & 31;
      output += alphabet[index];
      bufferLength -= 5;
    }
  }

  if (bufferLength > 0) {
    output += alphabet[(buffer << (5 - (bufferLength + offset))) & 31];
  }

  return output;
};

export const base32Decode = (
  input: string,
  { base32Lookup }: Base32Options = DEFAULT_BASE32_OPTIONS
): Uint8Array => {
  const length = input.length;
  const leftover = (length * 5) % 8;
  const offset = leftover === 0 ? 0 : 8 - leftover;

  let buffer = 0;
  let bufferLength = 0;
  let output = new Uint8Array(Math.ceil((length * 5) / 8));

  let outputIndex = 0;

  for (let i = 0; i < length; i++) {
    const charCode = input.charCodeAt(i);
    const value = base32Lookup[charCode];

    if (value === undefined) {
      throw new Error("Invalid base32 character");
    }

    buffer = (buffer << 5) | value;
    bufferLength += 5;

    while (bufferLength >= 8) {
      output[outputIndex++] = (buffer >>> (bufferLength + offset - 8)) & 255;
      bufferLength -= 8;
    }
  }

  if (bufferLength > 0) {
    output[outputIndex++] = (buffer << (bufferLength + offset - 8)) & 255;
  }

  if (leftover !== 0) output = output.slice(1);

  return output.subarray(0, outputIndex);
};
