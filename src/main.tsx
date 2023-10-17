import { render } from "react-dom";
import App from "./App";
import CardProvider from "./context/StateContext";

const rootElement = document.getElementById("root");
render(
  <CardProvider>
    <App />
  </CardProvider>,
  rootElement
);
