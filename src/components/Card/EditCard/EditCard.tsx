import React, { useContext, useState } from "react";
import styles from "./EditCard.module.css";
import Pen from "../Icons/Pen/Pen";
import { useId } from "react";
import { CardContext } from "../../../context/StateContext";
import Button from "../../Button/Button";
import Trashcan from "../Icons/Trashcan/Trashcan";

interface Card {
  id: number;
  word: string;
  definition: string;
}

const EditCard = () => {
  const [innerCardState, setInnerCardState] = useState<string>("CARD_WORD");
  const toggleInnerCardState = (state: string) => {
    setInnerCardState(state);
  };

  const { cards, card, addCard, toggleCardState, cardState } =
    useContext(CardContext);

  const [cardData, setCardData] = useState<Card>({
    id: 0,
    word: "",
    definition: "",
  });

  const cardDataHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCardData((prev) => {
      return {
        ...prev,
        id: cards.length,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className={styles.card__container}>
      {(() => {
        switch (innerCardState) {
          case "CARD_WORD":
            return (
              <>
                <input
                  name="word"
                  value={cardData.word}
                  onChange={cardDataHandler}
                  className={styles.card__input}
                />
                <div>
                  <div className={styles.card__button_container}>
                    <Button
                      label="Cancel"
                      color="white"
                      event={() => toggleCardState("")}
                    />
                    <Button
                      label="Next"
                      color="var(--accent)"
                      event={() => toggleInnerCardState("CARD_DEF")}
                    />
                  </div>
                </div>
              </>
            );

          case "CARD_DEF":
            return (
              <>
                <>
                  <Trashcan />
                  <p className={styles.card__smallText}>{cardData.word}</p>
                  <input
                    name="definition"
                    value={cardData.definition}
                    onChange={cardDataHandler}
                    className={styles.card__input}
                  />
                </>

                <div>
                  <div className={styles.card__button_container}>
                    <Button
                      label="Back"
                      color="white"
                      event={() => toggleInnerCardState("CARD_WORD")}
                    />
                    <Button
                      label="Save"
                      color="var(--accent)"
                      event={() => addCard(cardData)}
                    />
                  </div>
                </div>
              </>
            );
        }
      })()}
      {/* 
      {innerCardState === "CARD_WORD" ? (
        <input
          name="word"
          value={cardData.word}
          onChange={cardDataHandler}
          className={styles.card__input}
        />
      ) : innerCardState === "CARD_DEF" ? (
        <>
          <Trashcan />
          <p className={styles.card__smallText}>{cardData.word}</p>
          <input
            name="definition"
            value={cardData.definition}
            onChange={cardDataHandler}
            className={styles.card__input}
          />
        </>
      ) : null} */}

      {/* <div>
        <div className={styles.card__button_container}>
          <Button
            label={innerCardState === "CARD_WORD" ? "Cancel" : "Back"}
            color="white"
            event={() =>
              innerCardState === "CARD_WORD"
                ? toggleCardState("")
                : toggleInnerCardState("CARD_WORD")
            }
          />
          <Button
            label={innerCardState === "CARD_WORD" ? "Next" : "Save"}
            color="var(--accent)"
            event={() =>
              innerCardState === "CARD_WORD"
                ? toggleInnerCardState("CARD_DEF")
                : addCard(cardData)
            }
          />
        </div>
      </div> */}
    </div>
  );
};

export default EditCard;
