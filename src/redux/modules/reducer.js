import {
  connectRouter
} from 'connected-react-router';
import {
  combineReducers
} from 'redux';
import stock from './stock';
import djia from './djia';


const reducer = (history) =>
  combineReducers({
    stock,
    djia,
    router: connectRouter(history),
  })


export default reducer