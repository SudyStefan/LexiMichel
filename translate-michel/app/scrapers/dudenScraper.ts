import axios, { AxiosResponse } from "axios";
import { TransResult, WordClass, WordGender } from "../models/transResult";
import { Scraper } from "./Scraper";

class dudenScraper implements Scraper {
  provider = "Duden";
  
  fetchHTML(wordToSearch: string): Promise<cheerio.Root> {
    return axios.get("https://google.com"); //Placeholder
  }
  
  getClass(): WordClass {
    return WordClass.A; //Placeholder
  }

  getDescription(): string {
    return " "; //Placeholder
  }

  getGender(): WordGender {
    return WordGender.N; //Placeholder
  }
}

export const DudenScraper = new dudenScraper();