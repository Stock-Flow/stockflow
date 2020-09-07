<<<<<<< HEAD
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import stock from './stock';
import djia from './djia';
import sideBarStock from './sidebarstock';
import sidebarCurrency from './sidebarCurrency';
import currencyNow from './currencynow';
import detailStock from './detailStock';
import exchange from './exchange';
import selectedStock from './selectedStock';
=======
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import stock from "./stock";
import djia from "./djia";
import sideBarStock from "./sidebarstock";
import sidebarCurrency from "./sidebarCurrency";
import currencyNow from "./currencynow";
import detailStock from "./detailStock";
import selectedStock from "./selectedStock";
import selectedSymbol from "./selectedSymbol";
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b

const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    sideBarStock,
    sidebarCurrency,
    detailStock,
    selectedStock,
<<<<<<< HEAD
    exchange,
=======
    selectedSymbol,
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
    router: connectRouter(history),
  });

export default reducer;
