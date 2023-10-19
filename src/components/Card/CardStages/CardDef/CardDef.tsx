import React, { useContext } from "react";
import Trashcan from "../../Icons/Trashcan/Trashcan";
import styles from "./CardDef.module.css";
import { CardContext, Card } from "../../../../context/StateContext";
import Button from "../../../Button/Button";

interface Props {
  card: Card;
  toggle: React.MouseEventHandler<HTMLButtonElement>;
  buttonEvent: React.MouseEventHandler<HTMLButtonElement>;
  defValue: string;
  wordValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const CardDef = (props: Props) => {
  const { card, cards } = useContext(CardContext);
  return (
    <>
      <>
        <Trashcan card={props.card} />
        <p className={styles.card__smallText}>{props.wordValue}</p>
        <input
          name="back"
          value={props.defValue}
          onChange={props.onChange}
          className={styles.card__input}
        />
      </>

      <div>
        <div className={styles.card__button_container}>
          <Button label="Back" color="white" event={props.toggle} />
          <Button
            label="Save"
            color="var(--accent)"
            event={props.buttonEvent}
          />
        </div>
      </div>
    </>
  );
};

export default CardDef;
