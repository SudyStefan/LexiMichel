'use client'

import { useEffect, useState } from "react"
import styles from "../styles/root.module.css"
import { Header } from "./Header"
import { SearchBar } from "./SearchBar"
import { ResultList } from "./ResultList"
import { TransResult, WordClass, WordGender } from "../models/transResult"
import axios from "axios"
import { InfoItem } from "../models/infoItem"
import { InfoPopupList } from "./InfoPopupList"

const noSpecialCharacter = (word: string): boolean => {
  const wordToLower = word.toLowerCase();
  if (wordToLower.includes('ä') || 
      wordToLower.includes('ö') || 
      wordToLower.includes('ü') || 
      wordToLower.includes('ß')) 
      return false;
  return true;
}

export const Root = () => {
  const [searchResults, setSearchResults] = useState<TransResult[]>([]);
  const [infoItems, setInfoItems] = useState<InfoItem[]>([]);
  
  const fetchSearchResults = (word: string) => {
    if (noSpecialCharacter(word)) {
      axios.get(`./api/scrape?word=${word}`)
        .then(res => setSearchResults(res.data))
        .catch(err => {
          throw err;
        }).finally(() => console.log(searchResults)) 
    } else {
      setSearchResults([]);
      setInfoItems([...infoItems, { timeStampId: Date.now(), infoText: "Special characters aren't supported yet! (ü ö ä ß)"}]);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.root}>
        <Header />
        <SearchBar onSearch={(word: string) => fetchSearchResults(word)}/>
        {searchResults && (<ResultList resultItems={searchResults} />)}
        {infoItems && (<InfoPopupList infoItems={infoItems} setInfoItems={setInfoItems} />)}
      </main>
    </div>
  )
}