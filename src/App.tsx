import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/Layout/AppLayout";

import "./App.css";
import EditCard from "./components/Card/EditCard/EditCard";
import { useContext, useState } from "react";
import { CardContext } from "./context/StateContext";
import Card from "./components/Card/Card/Card";

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
                  {cards.map((card, index) => (
                    <Card card={card} key={index} />
                  ))}
                </div>
              );

            default:
              return <p className="empty">Add your first flashcard</p>;
          }
        })()}
      </main>
    </AppLayout>
  );
}

export default App;
