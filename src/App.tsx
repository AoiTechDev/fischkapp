import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/Layout/AppLayout";

import "./App.css";
import EditCard from "./components/Card/EditCard/EditCard";
import { useContext, useState } from "react";
import { CardContext } from "./context/StateContext";
import Card from "./components/Card/Card/Card";

function App(): React.JSX.Element {
  const { cards, card, addCard, cardState } = useContext(CardContext);
  console.log(cards)
  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} />
      <main>
        {cardState === "" ? (
          <p className="empty">Add your first flashcard</p>
        ) : cardState === "CARD_INIT" ? (
          <EditCard />
        ) : cardState === "CARD_ADDED" ? <div className="card_container">{cards.map((card, index) => <Card card={card} key={index}/>)}</div> : null}
      </main>
    </AppLayout>
  );
}

export default App;
