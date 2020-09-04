import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import stock from "./stock";
import djia from "./djia";
import sideBarStock from "./sidebarstock";
import sidebarCurrency from "./sidebarCurrency";
import currencyNow from "./currencynow";
import detailStock from "./detailStock";
import selectedStock from './selectedStock'
import selectedCurrency from './selectedCurrency'
import selectedSymbol from "./selectedSymbol";

const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    sideBarStock,
    sidebarCurrency,
    detailStock,
    selectedStock,
    selectedCurrency,
    selectedSymbol,
    router: connectRouter(history),
  });

export default reducer;
