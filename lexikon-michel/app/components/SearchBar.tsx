'use client'

import { useState } from "react";
import styles from "../styles/searchbar.module.css"

type SearchBarProp = {
  onSearch: (word: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProp) => {
  const [searchWord, setSearchWord] = useState<string>('');

  return (
    <div className={styles.searchBar}>
      <input 
        className={styles.searchBarInput}
        placeholder="Enter word to search..."
        value={searchWord}
        onChange={(q) => setSearchWord(q.target.value)} />
      <button 
        className={styles.searchBarButton} 
        onClick={() => onSearch(searchWord)} >
        GO
      </button>
    </div>
  )
}