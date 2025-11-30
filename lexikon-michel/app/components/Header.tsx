'use client'

import styles from "../styles/header.module.css"

export const Header = () => {
  return (
    <div className={styles.header}>
      <a className={styles.headerText} href="./">
        LexiMichel
      </a>
    </div>
  )
}