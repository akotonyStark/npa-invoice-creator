import invoiceReducer from "./invoiceReducer";
import playgroundReducer from "./playgroundReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  masterInvoiceList: invoiceReducer,
  counter: playgroundReducer,
});

export default allReducers;
