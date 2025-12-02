'use client'

import { Dispatch, SetStateAction, useEffect } from "react"
import { TransResult } from "../models/transResult"
import styles from "../styles/resultlist.module.css"
import { ResultItem } from "./ResultItem"

type ResultListProp = {
  resultItems: TransResult[],
  setResultItems?: Dispatch<SetStateAction<TransResult[]>>
}


export const ResultList = (props: ResultListProp) => {
  useEffect(() => {
    console.log(`Results: `, props.resultItems);
  }, []);
  
  return (
    <ul className={styles.resultList}>
      {props.resultItems.map(item => 
        (<ResultItem {...item} key={item.provider}/>)
      )}
    </ul>
  )
}