import axios, { AxiosResponse } from "axios";
import { WordClass, WordGender } from "../models/transResult";
import { Scraper } from "./Scraper";
import * as cheerio from 'cheerio';

class dwdsScraper implements Scraper {
  provider = "DWDS";

  private userAgent = "TranslateMichelScraper (contact: stefan.sudy1@gmail.com)" ;
  private prefixUrl = "https://www.dwds.de/wb/";
  private descriptionTarget = "span.dwdswb-definition";
  private classTarget = "span.dwdswb-ft-blocktext";
  private genderTarget = "span.dwdswb-ft-blocktext";
  
  fetchHTML(wordToSearch: string): Promise<cheerio.Root> {
    return axios.get(this.prefixUrl + wordToSearch, {
      headers: { "User-Agent": this.userAgent },
      timeout: 5000,
    }).then(res => cheerio.load(res.data)!)
      .catch(err => {
        throw err;
      });
  }
  
  getClass($: cheerio.Root): WordClass {
    const classChar = $(this.classTarget).first().text()[0];
    switch (classChar) {
      case "S":
        return WordClass.N;
      case "V":
        return WordClass.V;
      case "A":
        return WordClass.A;
      default:
        return WordClass.U;
    }
  }

  getDescription($: cheerio.Root): string {
    return $(this.descriptionTarget).first().text();
  }

  getGender($: cheerio.Root): WordGender {
    const genderChar = $(this.classTarget).first().text().split('(')[1][0];
    switch (genderChar) {
      case "N":
        return WordGender.N;
      case "M":
        return WordGender.M;
      case "F":
        return WordGender.N
      default:
        return WordGender.U
    }
  }
}

export const DwdsScraper = new dwdsScraper();