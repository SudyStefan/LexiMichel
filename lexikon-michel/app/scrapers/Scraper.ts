import { WordClass, WordGender } from "../models/transResult";

export interface Scraper {
  provider: string;
  url: string;
  
  fetchHTML(wordToSearch: string): Promise<cheerio.Root>;
  getDescription(root: cheerio.Root): string;
  getClass(root: cheerio.Root): WordClass;
  getGender(root: cheerio.Root): WordGender;
}