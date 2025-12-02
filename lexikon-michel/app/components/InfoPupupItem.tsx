import { Dispatch, SetStateAction, useEffect } from "react";
import { InfoItem } from "../models/infoItem";
import styles from "../styles/infopopupitem.module.css"

export type InfoPupupItem = {
  infoItem: InfoItem,
  onTimeout: any
}

const wait = (timeInMilliSeconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeInMilliSeconds));
}

export const InfoPopupItem = (props: InfoPupupItem) => {

  useEffect(() => {
    wait(3000)
      .then(props.onTimeout(props.infoItem.timeStampId))
      .catch(err => console.log(err));
  }, []);

  return (
    <li key={props.infoItem.timeStampId} className={styles.infoPopupItem}>{props.infoItem.infoText}</li>
  );
}