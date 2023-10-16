import { useContext, useState } from "react";
import styles from "./AppHeader.module.css";
import Logo from "./Logo/Logo";
import { CardContext } from "../../context/StateContext";

interface AppHeaderProps {
  cardsAmount: number;
}


export const AppHeader = ({cardsAmount=1}:AppHeaderProps) => {
  const { toggleCardState, cardState } = useContext(CardContext);

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Logo/>
        <div>Cards: {cardsAmount}</div>
      </div>
      <button onClick={() => toggleCardState('CARD_INIT')} className={styles.header__button}>+</button>
    </header>
  );
};