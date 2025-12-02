import { WordClass, WordGender } from "../models/transResult";

export interface Scraper {
  getProvider(): string;
  getUrl(): string;
  fetchHTML(wordToSearch: string): Promise<cheerio.Root>;
  getDescription(root: cheerio.Root): string;
  getClass(root: cheerio.Root): WordClass;
  getGender(root: cheerio.Root): WordGender;
}