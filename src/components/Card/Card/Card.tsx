import React, { useContext, useState } from "react";
import styles from "./Card.module.css";
import Pen from "../Icons/Pen/Pen";
import { CardContext } from "../../../context/StateContext";
import CardWord from "../CardStages/CardWord/CardWord";
import CardDef from "../CardStages/CardDef/CardDef";

interface Card {
  id: number;
  word: string;
  definition: string;
  isEdited: boolean;
}

interface Props {
  card: Card;
}
const Card = (props: Props) => {
  const { cards, updateCard, editCardHandler } = useContext(CardContext);

  const [innerCardState, setInnerCardState] = useState<string>("CARD_WORD");

  const toggleInnerCardState = (state: string) => {
    setInnerCardState(state);
  };
  return (
    <div
      className={
        !props.card.isEdited
          ? styles.card__container
          : styles.card__container_edit
      }
    >
     {!props.card.isEdited ?  <Pen card={props.card} /> : null}

      {props.card.isEdited ? (
        (() => {
          switch (innerCardState) {
            case "CARD_WORD":
              return (
                <CardWord
                  card={props.card}
                  toggle={() => toggleInnerCardState("CARD_DEF")}
                  wordValue={props.card.word}
                  onChange={(e) => editCardHandler(props.card, e)}
                  cancel={() => updateCard(props?.card!, false)}
                />
              );

            case "CARD_DEF":
              return (
                <CardDef
                card={props.card}
                  toggle={() => toggleInnerCardState("CARD_WORD")}
                  buttonEvent={() => {
                    toggleInnerCardState("CARD_WORD");
                    updateCard(props.card, false);
                  }}
                  defValue={props.card.definition}
                  wordValue={props.card.word}
                  onChange={(e) => editCardHandler(props.card, e)}
                />
              );
          }
        })()
      ) : (
        <p>{props.card.word}</p>
      )}
    </div>
  );
};

export default Card;
