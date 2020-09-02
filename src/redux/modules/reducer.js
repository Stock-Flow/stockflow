import {
  connectRouter
} from 'connected-react-router';
import {
  combineReducers
} from 'redux';
import stock from './stock';
import djia from './djia';
import sideBarStock from './sidebarstock'
import sidebarCurrency from './sidebarCurrency'
import currencyNow from './currencynow'
import detailStock from "./detailStock";
import indicator from './indicator'


const reducer = (history) =>
  combineReducers({
    indicator,
    stock,
    djia,
    sideBarStock,
    sidebarCurrency,
    detailStock,
    router: connectRouter(history),
  })


export default reducer