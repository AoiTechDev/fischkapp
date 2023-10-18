import React, { useContext, useEffect, useState } from "react";
import styles from "./NewCard.module.css";
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
  index: number;
}
const NewCard = (props: Props) => {
  const { cards, updateCard, editCardHandler } = useContext(CardContext);

  const [innerCardState, setInnerCardState] = useState<string>("CARD_WORD");

  const toggleInnerCardState = (state: string) => {
    setInnerCardState(state);
  };

  const cardFlipHandler = (id: number) => {
    const card = document.querySelectorAll(`.card`);
    const phrase = document.querySelectorAll(`.card .card__phrase`);

    console.log(card[id]);
    card.forEach((item) => item.classList.remove(styles.card_flip_animation));
    phrase.forEach((item) =>
      item.classList.remove(styles.card_phrase_animation)
    );

    setTimeout(() => {
      card[id].classList.add(styles.card_flip_animation);
      card[id].children[1].classList.add(styles.card_phrase_animation);
    }, 10);

    setTimeout(() => {
      setIsFlipped((prev) => !prev);
    }, 100);
  };

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {});
  return (
    <div
      className={`${
        !props.card.isEdited
          ? styles.card__container
          : styles.card__container_edit
      } card`}
      onClick={() => cardFlipHandler(props.index)}
    >
      {!props.card.isEdited ? <Pen card={props.card} /> : null}

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
        <p className="card__phrase">
          {isFlipped ? props.card.word : props.card.definition}
        </p>
      )}
    </div>
  );
};

export default NewCard;
