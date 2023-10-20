import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
  useId,
} from "react";

export interface Card {
  _id: string;
  front: string;
  back: string;
  isEdited: boolean;
}

interface CardContextValue {
  card: Card;
  setCard: Dispatch<SetStateAction<Card>>;
  editCardHandler: (card: Card, e: React.ChangeEvent<HTMLInputElement>) => void;
  newCardHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
  addCard: (card: Card, id: string) => void;
  removeCard: (card: Card) => void;

  updateCard: (card: Card, editSwitch: boolean) => void;

  cardState: string;
  toggleCardState: (state: string) => void;
  innerCardState: string;
  toggleInnerCardState: (state: string) => void;
}

const defaultValue: CardContextValue = {
  card: { _id: "", front: "", back: "", isEdited: false },
  setCard: () => {},
  setCards: () => {},
  editCardHandler: () => {},
  newCardHandler: () => {},
  cards: ([] = []),

  addCard: () => {},
  removeCard: () => {},
  updateCard: () => {},

  cardState: "",
  toggleCardState: () => {},

  innerCardState: "",
  toggleInnerCardState: () => {},
};

export const CardContext = createContext(defaultValue);

export default function CardProvider({ children }: { children: ReactNode }) {
  const [card, setCard] = useState<Card>(defaultValue.card);
  const [cards, setCards] = useState<Card[]>(defaultValue.cards);
  const [cardState, setCardState] = useState<string>("");
  const [innerCardState, setInnerCardState] = useState<string>("CARD_FRONT");

  const toggleInnerCardState = (state: string) => {
    setInnerCardState(state);
  };

  async function postCard(data: Card) {
    try {
      await fetch("https://training.nerdbord.io/api/v1/fischkapp/flashcards", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "secret_token",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const addCard = (newCard: Card, id: string) => {
    postCard(newCard);
    setCards((prev) => [...prev, newCard]);
    setCard({ _id: id, front: "", back: "", isEdited: false });
    setCardState("CARD_ADDED");
    setInnerCardState("CARD_FRONT");
  };

  const newCardHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    setCard((prev) => {
      return {
        ...prev,
        _id: id,
        [e.target.name]: e.target.value,
      };
    });
  };

  const editCardHandler = (
    card: Card,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const existingCardIndex = cards.findIndex((c) => c._id === card._id);

    if (existingCardIndex >= 0) {
      // Card exists, update it
      const updatedCards = [...cards];
      updatedCards[existingCardIndex] = {
        ...updatedCards[existingCardIndex],
        [name]: value,
      };

      setCards(updatedCards);
    }
  };

  const removeCard = (card: Card) => {
    setCards((prev) => prev.filter((c) => c._id !== card._id));
  };

  const updateCard = (card: Card, editSwitch: boolean) => {
    let findCard = cards.find((item) => item._id === card._id);
    let newCard = cards.filter((item) => item._id !== findCard?._id);
    console.log(findCard);
    setCards([...newCard, { ...findCard!, isEdited: editSwitch }]);
  };
  const toggleCardState = (state: string) => {
    setCardState(state);
  };

  return (
    <CardContext.Provider
      value={{
        card,
        setCard,
        setCards,
        cards,
        addCard,
        removeCard,
        cardState,
        toggleCardState,
        updateCard,
        editCardHandler,
        newCardHandler,
        innerCardState,
        toggleInnerCardState,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
