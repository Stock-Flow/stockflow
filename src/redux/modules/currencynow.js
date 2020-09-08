import {
  put,
  call,
  select,
  takeLeading,
} from 'redux-saga/effects'
import currencyService from '../../services/CurrencyService'



const prefix = "stockflow/currencynow/"

const initialState = {
  loading: true,
  currencyNow: [],
  error: null
}

const GET_CURRENCYNOW_START = `${prefix}GET_CURRENCYNOW_START`
const GET_CURRENCYNOW_SUCCESS = `${prefix}GET_CURRENCYNOW_SUCCESS`
const GET_CURRENCYNOW_FAIL = `${prefix}GET_CURRENCYNOW_FAIL`



const startGetCurrencyNow = () => {
  return {
    type: GET_CURRENCYNOW_START,
  }
}

const successGetCurrencyNow = (currencyNow) => {
  return {
    type: GET_CURRENCYNOW_SUCCESS,
    currencyNow
  }
}

const failGetCurrencyNow = (error) => {
  return {
    type: GET_CURRENCYNOW_FAIL,
    error
  }
}

function* getCurrencyNowSaga() {
  yield put(startGetCurrencyNow());
  try {
    const currencyNow = yield select(state => state.sidebarCurrency.sidebarCurrency)
    const symbols = yield currencyNow.map(item => item.symbol);
    const currencies = yield call(currencyService.getCurrencyNow, symbols);
    yield put(successGetCurrencyNow(currencies));
  } catch (error) {
    yield put(failGetCurrencyNow(error));
    console.log(error);
  }
}


export function* currencyNowSaga() {
  yield takeLeading("GET_SIDEBARCURRENCY_SUCCESS", getCurrencyNowSaga)
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_CURRENCYNOW_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      }

      case GET_CURRENCYNOW_SUCCESS:
        return {
          ...prevState,
          loading: false,
            currencyNow: action.currencyNow,
            error: null,
        }
        case GET_CURRENCYNOW_FAIL:
          return {
            ...prevState,
            loading: false,
              error: action.error
          }
          default:
            return {
              ...prevState
            }
  }
}