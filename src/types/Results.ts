import { Gift } from "./Gift";

interface GiftWithScore extends Gift {
  score: number;
}

export interface SimpleResult {
  title: string;
  score: number;
}

export interface SummarizedResults {
  documentId?: string;
  fullResults: GiftWithScore[];
  simpleResults: SimpleResult[];
  top3: GiftWithScore[];
  email?: string;
}
