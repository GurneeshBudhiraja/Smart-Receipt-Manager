export interface vectorData {
  id: string;
  values: number[];
  metadata: Record<string, string>;
}
export interface PineconeQueryResponse {
  matches: Match[];
  namespace: string;
  usage: {
    readUnits: number;
  };
}

export interface Match {
  id: string;
  score: number;
  values: number[];
  sparseValues?: undefined;
  metadata: Metadata;
}

export interface Metadata {
  receiptText: string;
}