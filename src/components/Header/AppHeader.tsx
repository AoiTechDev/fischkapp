import { useState } from "react";
import styles from "./AppHeader.module.css";
import Logo from "./Logo/Logo";

interface AppHeaderProps {
  cardsAmount: number;
}

export const AppHeader = ({cardsAmount=1}:AppHeaderProps) => {
 
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Logo/>
        <div>Cards: {cardsAmount}</div>
      </div>
      <button className={styles.header__button}>+</button>
    </header>
  );
};