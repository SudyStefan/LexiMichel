import { Dispatch, SetStateAction } from "react";
import { InfoItem } from "../models/infoItem";
import styles from "../styles/infopopuplist.module.css"
import { InfoPopupItem } from "./InfoPupupItem";

export type InfoPopupListProps = {
  infoItems: InfoItem[],
  setInfoItems: Dispatch<SetStateAction<InfoItem[]>>
}

export const InfoPopupList = (props: InfoPopupListProps) => {
  const timeoutItem = (id: number) => {
    props.setInfoItems(props.infoItems.filter(item => {
      return item.timeStampId !== id ? item : null;
    }));
  }

  return (
    <ul className={styles.infoPopupList}>
      {props.infoItems.map((item) => (<InfoPopupItem infoItem={item} onTimeout={(id: number) => timeoutItem(id)} key={item.timeStampId} />))}
    </ul>
  );
}