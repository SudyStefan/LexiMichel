import { TransResult } from "../models/transResult"
import styles from "../styles/resultitem.module.css"

export const ResultItem = (item: TransResult) => {
  return (
    <div className={styles.resultItem}>
      <div className={styles.header}>
        <h1>{item.provider}</h1>
      </div>
      <div className={styles.body}>
        <p>{item.description}</p>
        {item.gender && (<p>{item.gender}</p>)}
        <p>{item.class}</p>
      </div>
    </div>
  )
}