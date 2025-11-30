import { describe, expect, test } from "vitest";
import { Scraper } from "../scrapers/Scraper"
import { DwdsScraper } from "../scrapers/dwdsScraper";
import * as cheerio from 'cheerio';
import { dwbs_haus_html } from "./html/dwbs_haus.html";
import { WordClass, WordGender } from "../models/transResult";
import { duden_haus_html } from "./html/duden_haus.html";
import { DudenScraper } from "../scrapers/dudenScraper";

type TestScraper = {
  html: string;
  descriptionResult: string;
  scraper: Scraper;
};

const testScraper = (scraperEntry: TestScraper) => {
  describe(`Test Scraper: ${scraperEntry.scraper.provider}`, () => {
    const mockHTML = cheerio.load(scraperEntry.html);
    test("getDescription", () => {
      expect(scraperEntry.scraper.getDescription(mockHTML)).toBe(scraperEntry.descriptionResult);
    });
    test("getGender", () => {
      expect(scraperEntry.scraper.getGender(mockHTML)).toBe(WordGender.N);
    });
    test("getClass", () => {
      expect(scraperEntry.scraper.getClass(mockHTML)).toBe(WordClass.N);
    });
  });
}

const testScrapers: TestScraper[] = [
  {
    html: dwbs_haus_html,
    descriptionResult: "aus Wänden und Dach errichtetes Gebäude für Menschen",
    scraper: DwdsScraper 
  },
  { 
    html: duden_haus_html, 
    descriptionResult: "Gebäude, das Menschen zum Wohnen dient",
    scraper: DudenScraper
  }
];

testScrapers.forEach(scraperEntry => {
  testScraper(scraperEntry);
})