'use client'

import { useEffect, useState } from "react"
import styles from "../styles/root.module.css"
import { Header } from "./Header"
import { SearchBar } from "./SearchBar"
import { ResultList } from "./ResultList"
import { TransResult, WordClass, WordGender } from "../models/transResult"
import axios from "axios"

export const Root = () => {
  const [searchResults, setSearchResults] = useState<TransResult[]>([]);
  
  const fetchSearchResults = (word: string) => {
    axios.get(`./api/scrape?word=${word}`)
      .then(res => setSearchResults(res.data))
      .catch(err => {
        throw err;
      }).finally(() => console.log(searchResults));
  }

  return (
    <div className={styles.page}>
      <main className={styles.root}>
        <Header />
        <SearchBar onSearch={(word: string) => fetchSearchResults(word)}/>
        {searchResults && (<ResultList resultItems={searchResults} />)}  
      </main>
    </div>
  )
}