type Days = "M" | "T" | "W";

export interface player1out {
  lines: number;
  averageNumber: number;
  averageNumberPerLine: number[];
}

export interface player2out {
  averageNumberPerLine: number;
  lisumOfOtherTwones: number;
  day: Days;
}
[];

export type player3out = {
  [K in Days]: number;
  // to string
};
