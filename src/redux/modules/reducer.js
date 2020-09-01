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
import stockNow from './stocknow'
import currencyNow from './currencynow'


const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    sideBarStock,
    sidebarCurrency,
    stockNow,

    router: connectRouter(history),
  })


export default reducer