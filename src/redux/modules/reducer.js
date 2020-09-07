<<<<<<< HEAD
=======

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import stock from './stock';
import djia from './djia';
import sideBarStock from './sidebarstock';
import sidebarCurrency from './sidebarCurrency';
import currencyNow from './currencynow';
import detailStock from './detailStock';
import selectedStock from './selectedStock';
<<<<<<< HEAD
import selectedSymbol from './selectedSymbol';
=======
import selectedSymbol from "./selectedSymbol";

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a

const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    sideBarStock,
    sidebarCurrency,
    detailStock,
    selectedStock,
<<<<<<< HEAD
    selectedSymbol,
=======

    exchange,

    selectedSymbol,

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a
    router: connectRouter(history),
  });

export default reducer;
