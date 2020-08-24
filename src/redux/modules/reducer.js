import {
  connectRouter
} from 'connected-react-router';
import {
  combineReducers
} from 'redux';
import stock from './stock';


const reducer = (history) =>
  combineReducers({
    stock,
    rotuer: connectRouter(history),
  })


export default reducer