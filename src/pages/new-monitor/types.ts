export type Process = {
  id: number;
  date: Date;
  name: number;
  isNew?: boolean;
};

export type HistorySize = 'replace' | 5 | 10 | 50 | 100 | 200 | 500;
