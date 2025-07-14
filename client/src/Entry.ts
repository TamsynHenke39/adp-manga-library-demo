export type Entry = {
  id: string;
  title: string;
  coverUrl?: string;
  quant: number;
  tags: string[];
}

export type Series = {
  id: string;
  title: string;
  coverUrl: string;
  volumes: Entry[];
  tags: string[];
}