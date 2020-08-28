import {
  connectRouter
} from 'connected-react-router';
import {
  combineReducers
} from 'redux';
import stock from './stock';
import djia from './djia';
import sidebarstock from './sidebarstock'
import sidebarDigitalCurrency from './sidebarDigitalCurrency'


const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    sidebarstock,
    sidebarDigitalCurrency,
    router: connectRouter(history),
  })


export default reducer