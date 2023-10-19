import { useContext } from "react";
import { CardContext } from "../../../../context/StateContext";
import styles from "./Pen.module.css";
import {Card} from "../../../../context/StateContext";


interface Props{
  card: Card
}
const Pen = (props: Props) => {
    const {updateCard} = useContext(CardContext)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      className={styles.pen}
      onClick={() => updateCard(props.card, true)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.8279 14.7611C24.8641 13.7973 23.3014 13.7973 22.3376 14.7611L15.2696 21.8291C14.8007 22.298 14.5374 22.9338 14.5374 23.5969V25.5517V26.0517H15.0374H16.9921C17.6552 26.0517 18.2911 25.7883 18.7599 25.3194L25.8279 18.2514C26.7917 17.2876 26.7917 15.7249 25.8279 14.7611ZM23.0447 15.4682C23.618 14.8949 24.5475 14.8949 25.1208 15.4682C25.6941 16.0415 25.6941 16.971 25.1208 17.5443L24.7786 17.8865L22.7025 15.8104L23.0447 15.4682ZM21.9954 16.5175L15.9767 22.5362C15.6954 22.8175 15.5374 23.1991 15.5374 23.5969V25.0517H16.9921C17.39 25.0517 17.7715 24.8936 18.0528 24.6123L24.0715 18.5936L21.9954 16.5175Z"
        fill="#161616"
      />
    </svg>
  );
};

export default Pen;
