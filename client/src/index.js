import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BasketStore from "./store/BasketStore";
import ColorStore from "./store/ColorStore";
import FrameStore from "./store/FrameStore";
import OrderStore from "./store/OrderStore";
import ProductStore from "./store/ProductStore";
import ProviderStore from "./store/ProviderStore";
import PurposeStore from "./store/PurposeStore";
import UserStore from "./store/UserStore";

export const Context = createContext(null);
ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      product: new ProductStore(),
      frames: new FrameStore(),
      colors: new ColorStore(),
      purposes: new PurposeStore(),
      providers: new ProviderStore(),
      orders: new OrderStore(),
      basket: new BasketStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
