import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/Layout/AppLayout";

import "./App.css";
import EditCard from "./components/Card/EditCard/EditCard";
import { useContext, useState } from "react";
import { CardContext } from "./context/StateContext";
import Card from "./components/Card/Card/NewCard";

function App(): React.JSX.Element {
  const { cards, cardState } = useContext(CardContext);

  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} />
      <main>
        {(() => {
          switch (cardState) {
            case "CARD_INIT":
              return <EditCard />;
            case "CARD_ADDED":
              return (
                <div className="card_container">
                  {cards.toReversed().map((card) => (
                    <Card card={card} key={card.id} />
                  ))}
                </div>
              );

            default:
              return cards.length === 0 ? (
                <p className="empty">Add your first flashcard</p>
              ) : (
                <div className="card_container">
                  {cards.toReversed().map((card) => (
                    <Card card={card} key={card.id} />
                  ))}
                </div>
              );
          }
        })()}
      </main>
    </AppLayout>
  );
}

export default App;
