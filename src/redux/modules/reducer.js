<<<<<<< HEAD
import {
  connectRouter
} from 'connected-react-router';
import {
  combineReducers
} from 'redux';
=======
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import stock from './stock';
>>>>>>> 687fb8fe400d06a7c6a6ff67be15166bec440b50
import djia from './djia';
import sideBarStock from './sidebarstock';
import sidebarCurrency from './sidebarCurrency';
import detailStock from './detailStock';
import detailCurrency from './detailCurrency';
import exchange from './exchange';
import selectedStock from './selectedStock';
import selectedSymbol from './selectedSymbol';
import compare from './compare';
import favoriteList from './favoriteList';

const reducer = (history) =>
  combineReducers({
    djia,
    sideBarStock,
    sidebarCurrency,
    detailStock,
    detailCurrency,
    selectedStock,
    compare,
    exchange,

    selectedSymbol,
    // favoriteList,
    router: connectRouter(history),
  });

export default reducer;
