import { useContext, useId, useState } from "react";
import styles from "./CreateCard.module.css";


import { CardContext } from "../../../context/StateContext";


import CardFront from "../CardStages/CardWord/CardFront";
import CardBack from "../CardStages/CardDef/CardBack";


const CreateCard = () => {
  const [innerCardState, setInnerCardState] = useState<string>("CARD_FRONT");
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


  return (
    <div className={styles.card__container}>
      {(() => {
        switch (innerCardState) {
          case "CARD_FRONT":
            return (
              <CardFront
                toggle={() => toggleInnerCardState("CARD_BACK")}
                wordValue={card.front}
                onChange={(e) => newCardHandler(e, id)}
                cancel={() => toggleCardState("")}
              />
            );

          case "CARD_BACK":
            return (
              <CardBack
              
                toggle={() => toggleInnerCardState("CARD_FRONT")}
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

export default CreateCard;
