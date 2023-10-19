import { useContext, useId, useState } from "react";
import styles from "./EditCard.module.css";


import { CardContext } from "../../../context/StateContext";

import CardWord from "../CardStages/CardWord/CardWord";
import CardDef from "../CardStages/CardDef/CardDef";


const EditCard = () => {
  const [innerCardState, setInnerCardState] = useState<string>("CARD_WORD");
  const { card, addCard, newCardHandler ,toggleCardState} = useContext(CardContext);
  
  const toggleInnerCardState = (state: string) => {
    setInnerCardState(state);
  };
  function dec2hex (dec: number) {
    return dec.toString(16).padStart(2, "0")
  }

  function generateId (len: number) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }
  
  const id = generateId(25)
  console.log(typeof id)
  return (
    <div className={styles.card__container}>
      {(() => {
        switch (innerCardState) {
          case "CARD_WORD":
            return (
              <CardWord
                toggle={() => toggleInnerCardState("CARD_DEF")}
                wordValue={card.front}
                onChange={(e) => newCardHandler(e, id)}
                cancel={() => toggleCardState("")}
              />
            );

          case "CARD_DEF":
            return (
              <CardDef
              
                toggle={() => toggleInnerCardState("CARD_WORD")}
                buttonEvent={() => addCard(card, id)}
                defValue={card.back}
                wordValue={card.front}
                onChange={(e) => newCardHandler(e, id)}
              />
            );
        }
      })()}
    </div>
  );
};

export default EditCard;
