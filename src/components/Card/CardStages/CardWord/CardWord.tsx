import React, { useContext } from "react";
import styles from "./CardWord.module.css";
import { CardContext } from "../../../../context/StateContext";
import Button from "../../../Button/Button";
import Trashcan from "../../Icons/Trashcan/Trashcan";

interface Card {
  id: number;
  word: string;
  definition: string;
  isEdited: boolean;
}

interface Props {
  card?: Card;
  toggle: React.MouseEventHandler<HTMLButtonElement>;
  wordValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  cancel: React.MouseEventHandler<HTMLButtonElement>;
}
const CardWord = (props: Props) => {
  const { cards, card, toggleCardState, toggleInnerCardState, updateCard } =
    useContext(CardContext);

  return (
    <>
      <input
        name="word"
        value={props.wordValue}
        onChange={props.onChange}
        className={styles.card__input}
      />
      <div>
        <div className={styles.card__button_container}>
          <Button
            label="Cancel"
            color="white"
            event={props.cancel}
          />
          <Button label="Next" color="var(--accent)" event={props.toggle} />
        </div>
      </div>
    </>
  );
};

export default CardWord;
