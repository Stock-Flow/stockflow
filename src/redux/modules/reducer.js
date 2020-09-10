
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import stock from './stock';
import djia from './djia';
import sideBarStock from './sidebarstock';
import sidebarCurrency from './sidebarCurrency';
import currencyNow from './currencynow';
import detailStock from './detailStock';
import detailCurrency from './detailCurrency'
import exchange from './exchange';
import selectedStock from './selectedStock';
import selectedSymbol from "./selectedSymbol";


const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    sideBarStock,
    sidebarCurrency,
    detailStock,
    detailCurrency,
    selectedStock,

    exchange,

    selectedSymbol,

    router: connectRouter(history),
  });

export default reducer;
