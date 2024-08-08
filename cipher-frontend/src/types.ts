export interface ICipher {
  password: string;
  encodeMessage: string;
  decodeMessage: string;
  encoded?: string;
  decoded?: string;
}

