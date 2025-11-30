import axios from "axios";
import { WordClass, WordGender } from "../models/transResult";
import { Scraper } from "./Scraper";
import * as cheerio from 'cheerio';

class dudenScraper implements Scraper {
  provider = "Duden";
  url = "https://www.duden.de/rechtschreibung/";


  private userAgent = "TranslateMichelScraper (contact: stefan.sudy1@gmail.com)" ;
  private descriptionTarget = "div.enumeration__text";
  private classTarget = "dd.tuple__val";
  private genderTarget = "dd.tuple__val";
  
  fetchHTML(wordToSearch: string): Promise<cheerio.Root> {
    return axios.get(this.url + wordToSearch, {
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
    const genderChar = $(this.genderTarget).first().text().split(' ')[1][0];
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

export const DudenScraper = new dudenScraper();