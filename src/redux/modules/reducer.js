import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import stock from "./stock";
import djia from "./djia";
import sideBarStock from "./sidebarstock";
import stockNow from "./stocknow";
import detailStock from "./detailStock";

const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    sideBarStock,
    detailStock,
    stockNow,
    router: connectRouter(history),
  });

export default reducer;
