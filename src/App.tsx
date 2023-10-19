import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/Layout/AppLayout";

import "./App.css";
import EditCard from "./components/Card/EditCard/EditCard";
import { useContext, useEffect, useState } from "react";
import { CardContext } from "./context/StateContext";
import NewCard from "./components/Card/Card/NewCard";

function App(): React.JSX.Element {
  const { cards, cardState, setCards } = useContext(CardContext);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        fetch("https://training.nerdbord.io/api/v1/fischkapp/flashcards")
          .then((res) => res.json())
          .then((data) => {
            setCards(data);
            setLoading(false);
          });
      } catch (err) {
        console.error(err);
        
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} />
     {!loading ? <main>
        {(() => {
          switch (cardState) {
            case "CARD_INIT":
              return <EditCard />;
            case "CARD_ADDED":
              return (
                <div className="card_container">
                  {cards.toReversed().map((card, index) => (
                    <NewCard card={card} key={card._id} index={index} />
                  ))}
                </div>
              );

            default:
              return cards.length === 0 ? (
                <p className="empty">Add your first flashcard</p>
              ) : (
                <div className="card_container">
                  {cards.toReversed().map((card, index) => (
                    <NewCard card={card} key={card._id} index={index} />
                  ))}
                </div>
              );
          }
        })()}
      </main> : <h1>Fetching data...</h1>}
    </AppLayout>
  );
}

export default App;
