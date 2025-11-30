'use client'

import { useEffect } from "react"
import { TransResult } from "../models/transResult"
import styles from "../styles/resultlist.module.css"
import { ResultItem } from "./ResultItem"

type ResultListProp = {
  resultItems: TransResult[]
}


export const ResultList = ({ resultItems }: ResultListProp) => {
  useEffect(() => {
    console.log(`Results: `, resultItems);
  }, []);
  
  return (
    <div className={styles.resultList}>
      <ul className={styles.list}>
        {resultItems.map(item => (
          <li className={styles.listItem}
            key={item.provider}>
            <ResultItem {...item}/>
          </li>
          ))}
      </ul>
    </div>
  )
}