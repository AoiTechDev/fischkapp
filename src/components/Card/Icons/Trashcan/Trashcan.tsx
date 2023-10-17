import React, { useContext } from "react";
import styles from "./Trashcan.module.css";
import { CardContext } from "../../../../context/StateContext";

interface Props{
  index: number
}

const Trashcan = (props: Props) => {
  const {removeCard} = useContext(CardContext)
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.trashcan}
      onClick={() => {removeCard(props.index)}}
    >
      <path d="M25 15.5H15" stroke="#161616" stroke-linecap="round" />
      <path d="M22 15H18" stroke="#161616" stroke-linecap="round" />
      <path
        d="M15 19V27H25C25 26.2727 25 19 25 19"
        stroke="#161616"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Trashcan;
