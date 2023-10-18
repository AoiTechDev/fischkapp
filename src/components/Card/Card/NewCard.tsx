import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  LegacyRef,
} from "react";
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

  const cardRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLParagraphElement>(null);

  const [innerCardState, setInnerCardState] = useState<string>("CARD_WORD");

  const toggleInnerCardState = (state: string) => {
    setInnerCardState(state);
  };

  const cardFlipHandler = (id: number) => {
    cardRef.current?.classList.remove(styles.card_flip_animation);
    phraseRef.current?.classList.remove(styles.card_phrase_animation);

    setTimeout(() => {
      cardRef.current?.classList.add(styles.card_flip_animation);
      cardRef.current?.children[1].classList.add(styles.card_phrase_animation);
    }, 10);

    setTimeout(() => {
      setIsFlipped((prev) => !prev);
    }, 100);
  };

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <div
      className={
        !props.card.isEdited
          ? styles.card__container
          : styles.card__container_edit
      }
      onClick={() => cardFlipHandler(props.index)}
      ref={cardRef}
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
        <p ref={phraseRef}>
          {isFlipped ? props.card.word : props.card.definition}
        </p>
      )}
    </div>
  );
};

export default NewCard;
