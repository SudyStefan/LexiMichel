import axios from "axios";
import { WordClass, WordGender } from "../models/transResult";
import { Scraper } from "./Scraper";
import * as cheerio from 'cheerio';

class dudenScraper implements Scraper {
  private provider = "Duden";
  private url = "https://www.duden.de/rechtschreibung/";
  private userAgent = "TranslateMichelScraper (contact: stefan.sudy1@gmail.com)" ;
  private descriptionTarget = "div.enumeration__text";
  private classTarget = "dd.tuple__val";
  private genderTarget = "dd.tuple__val";
  

  public getProvider = (): string => this.provider;
  public getUrl = (): string => this.url;

  public fetchHTML(wordToSearch: string): Promise<cheerio.Root> {
    return axios.get(this.url + wordToSearch, {
      headers: { "User-Agent": this.userAgent },
      timeout: 5000,
    }).then(res => cheerio.load(res.data)!)
      .catch(err => {
        throw err;
      });
  }
  
  public getClass($: cheerio.Root): WordClass {
    try {
      const classString = $(this.classTarget).first().text();
            
      if (classString.includes("Su")) return WordClass.N;
      if (classString.includes("Ve")) return WordClass.V;
      if (classString.includes("Ad")) return WordClass.A;

      return WordClass.U;
    } catch {
      console.log(`Failed to scrape class in ${this.provider}...`);
      return WordClass.U;
    }
  }

  public getDescription($: cheerio.Root): string {
    return $(this.descriptionTarget).first().text();
  }

  public getGender($: cheerio.Root): WordGender {
    try {
      const genderString = $(this.genderTarget).first().text();

      if (genderString.includes("N")) return WordGender.N;
      if (genderString.includes("M")) return WordGender.M;
      if (genderString.includes("F")) return WordGender.F;

      return WordGender.U
    } catch (err) {
      console.log(`Failed to scrape gender in ${this.provider}...`);
      return WordGender.U
    }
  }
}

export const DudenScraper = new dudenScraper();