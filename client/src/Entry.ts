export type Entry = {
  id: string;
  title: string;
  coverUrl?: string;
  quant: number;
}

export type Series = {
  id: string;
  title: string;
  coverUrl: string;
  volumes: Entry[];
}