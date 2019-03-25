import { createStore } from "redux";
import { reducer } from "./mainDuck";

const store = createStore(reducer);

export default store;
