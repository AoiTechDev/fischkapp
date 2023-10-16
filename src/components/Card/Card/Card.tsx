import React from "react";
import styles from "./Card.module.css";
import Pen from "../Icons/Pen/Pen";

interface Card {
  id: number;
  word: string;
  definition: string;
}

interface Props{
    card: Card
}
const Card = (props: Props) => {
  return <div className={styles.card__container}>
    <Pen/>
    <p>{props.card.word}</p>
  </div>;
};

export default Card;
