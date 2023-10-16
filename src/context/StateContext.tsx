import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface Card {
  id: number;
  word: string;
  definition: string;
}

interface CardContextValue {
  card: Card;
  setCard: Dispatch<SetStateAction<Card>>;

  cards: Card[];
  addCard: (card: Card) => void;
  removeCard: (id: number) => void;

  cardState: string;
  toggleCardState: (state: string) => void;
}

const defaultValue: CardContextValue = {
  card: { id: 0, word: "", definition: "" },
  setCard: () => {},

  cards: [],
  addCard: () => {},
  removeCard: () => {},

  cardState: "",
  toggleCardState: () => {},
};

export const CardContext = createContext(defaultValue);

export default function CardProvider({ children }: { children: ReactNode }) {
  const [card, setCard] = useState<Card>(defaultValue.card);
  const [cards, setCards] = useState<Card[]>(defaultValue.cards);

  const [cardState, setCardState] = useState<string>("");

  const addCard = (newCard: Card) => {
    setCards((prev) => [...prev, newCard]);
    setCardState('CARD_ADDED')
  };

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCardState = (state: string) => {
    setCardState(state);
  };
  return (
    <CardContext.Provider
      value={{
        card,
        setCard,
        cards,
        addCard,
        removeCard,
        cardState,
        toggleCardState,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
