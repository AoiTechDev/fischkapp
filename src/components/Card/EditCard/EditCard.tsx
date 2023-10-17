import React, { useContext, useState } from "react";
import styles from "./EditCard.module.css";
import Pen from "../Icons/Pen/Pen";
import { useId } from "react";
import { CardContext } from "../../../context/StateContext";
import Button from "../../Button/Button";
import Trashcan from "../Icons/Trashcan/Trashcan";
import CardWord from "../CardStages/CardWord/CardWord";
import CardDef from "../CardStages/CardDef/CardDef";

interface Card {
  id: number;
  word: string;
  definition: string;
  isEdited: boolean;
}
const EditCard = () => {
  const [innerCardState, setInnerCardState] = useState<string>("CARD_WORD");
  const { card, addCard , newCardHandler} = useContext(CardContext);
  const toggleInnerCardState = (state: string) => {
    setInnerCardState(state);
  };

  return (
    <div className={styles.card__container}>
      {(() => {
        switch (innerCardState) {
          case "CARD_WORD":
            return (
              <CardWord
                toggle={() => toggleInnerCardState("CARD_DEF")}
                wordValue={card.word}
                onChange={newCardHandler}
              />
            );

          case "CARD_DEF":
            return (
              <CardDef
                toggle={() => toggleInnerCardState("CARD_WORD")}
                buttonEvent={() => addCard(card)}
                defValue={card.definition}
                wordValue={card.word}
                onChange={newCardHandler}
              />
            );
        }
      })()}
    </div>
  );
};

export default EditCard;
