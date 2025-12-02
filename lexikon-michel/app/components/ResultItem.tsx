import { TransResult, WordGender } from "../models/transResult"
import styles from "../styles/resultitem.module.css"

export const ResultItem = (item: TransResult) => {
  return (
    <li key={item.provider} className={styles.resultItem}>
      <div className={styles.header}>
        <span className={styles.provider}>
          <a href={item.url}>{item.provider}</a>
        </span>
        {item.gender != WordGender.U ? (<span className={styles.gender}>{item.gender}</span>) : null}
        <span className={styles.class}>{item.class}</span>
      </div>
      <div className={styles.body}>
        <span>{item.description}</span>
      </div>
    </li>
  );
}