import React from "react";
import styles from "./Button.module.css";

interface Props {
  label: string;
  color: string;
  event: React.MouseEventHandler<HTMLButtonElement>;
}
const Button = (props: Props) => {
    
  return (
    <button
      className={styles.card__button}
      style={{
        backgroundColor: props.color,
        color: props.color === "white" ? "black" : "white",
      }}
      type="button"
      onClick={props.event}
    >
      {props.label}
    </button>
  );
};

export default Button;
