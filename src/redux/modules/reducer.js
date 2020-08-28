import {
  connectRouter
} from 'connected-react-router';
import {
  combineReducers
} from 'redux';
import stock from './stock';
import djia from './djia';
import sideBarStock from './sidebarstock'


const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    sideBarStock,
    router: connectRouter(history),
  })


export default reducer