import { Scraper } from "../../scrapers/Scraper";
import { TransResult } from "../../models/transResult";
import { DwdsScraper } from "../../scrapers/dwdsScraper";
import { NextRequest, NextResponse } from "next/server";
import { DudenScraper } from "@/app/scrapers/dudenScraper";

const fetchData = (word: string, scrapers: Scraper[]): Promise<TransResult[]> => {
  return Promise.all(
    scrapers.map(scraper => {
      return scraper.fetchHTML(word)
        .then(root => ({
          originalWord: word,
          description: scraper.getDescription(root),
          class: scraper.getClass(root),
          gender: scraper.getGender(root),
          provider: scraper.provider
        }));
    }))
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const scrapers: Scraper[] = [
  DwdsScraper,
  DudenScraper
];

export const GET = (req: NextRequest) => {
  const word  = req.url?.split('=')[1];

  if (!word || typeof word !== "string") {
    return NextResponse.json({ error: "No word included in URL!"}, { status: 404 });
  }

  return fetchData(word, scrapers)
    .then(results => NextResponse.json(results, { status: 200 }))
    .catch(err => NextResponse.json(err, { status: 500 }));
}

