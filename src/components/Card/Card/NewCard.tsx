import { useContext, useState, useRef } from "react";
import styles from "./NewCard.module.css";
import Pen from "../Icons/Pen/Pen";
import { CardContext, Card } from "../../../context/StateContext";
import CardWord from "../CardStages/CardWord/CardFront";
import CardDef from "../CardStages/CardDef/CardBack";

interface Props {
  card: Card;
  index?: number;
}
const NewCard = (props: Props) => {
  const { cards, updateCard, editCardHandler } = useContext(CardContext);

  const cardRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLParagraphElement>(null);

  const [innerCardState, setInnerCardState] = useState<string>("CARD_FRONT");

  const toggleInnerCardState = (state: string) => {
    setInnerCardState(state);
  };

  const cardFlipHandler = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      cardRef.current?.classList.remove(styles.card_flip_animation);
      phraseRef.current?.classList.remove(styles.card_phrase_animation);

      setTimeout(() => {
        cardRef.current?.classList.add(styles.card_flip_animation);
        cardRef.current?.children[1].classList.add(
          styles.card_phrase_animation
        );
      }, 10);
      setTimeout(() => {
        setIsFlipped((prev) => !prev);
      }, 100);
    }
  };

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <div
      className={
        !props.card.isEdited
          ? styles.card__container
          : styles.card__container_edit
      }
      onClick={(e) => (!props.card.isEdited ? cardFlipHandler(e) : null)}
      ref={cardRef}
    >
      {!props.card.isEdited ? <Pen card={props.card} /> : null}

      {props.card.isEdited ? (
        (() => {
          switch (innerCardState) {
            case "CARD_FRONT":
              return (
                <CardWord
                  card={props.card}
                  toggle={() => toggleInnerCardState("CARD_BACK")}
                  wordValue={props.card.front}
                  onChange={(e) => editCardHandler(props.card, e)}
                  cancel={() => updateCard(props?.card!, false)}
                />
              );

            case "CARD_BACK":
              return (
                <CardDef
                  card={props.card}
                  toggle={() => toggleInnerCardState("CARD_FRONT")}
                  buttonEvent={() => {
                    toggleInnerCardState("CARD_FRONT");
                    updateCard(props.card, false);
                  }}
                  defValue={props.card.back}
                  wordValue={props.card.front}
                  onChange={(e) => editCardHandler(props.card, e)}
                />
              );
          }
        })()
      ) : (
        <p ref={phraseRef}>{!isFlipped ? props.card.front : props.card.back}</p>
      )}
    </div>
  );
};

export default NewCard;
