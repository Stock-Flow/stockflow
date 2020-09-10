import DetailCurrencyService from "../../services/DetailCurrencyService";
import {
  put,
  call,
  takeEvery,
  select
} from "redux-saga/effects";
import IndicatorService from "../../services/IndicatorService";



const prefix = 'currencyflow/currency';

const initialState = {
  loading: true,
  currency: [],
  error: null,
  indicator: [],
  volume: []
};

const GET_DETAILCURRENCY_START = `${prefix}/GET_DETAILCURRENCY_START`;
const GET_DETAILCURRENCY_SUCCESS = `${prefix}/GET_DETAILCURRENCY_SUCCESS`;
const GET_DETAILCURRENCY_FAIL = `${prefix}/GET_DETAILCURRENCY_FAIL`;
const GET_CURRENCYFROMLOCALSTORAGE = `${prefix}/GET_CURRENCYFROMLOCALSTORAGE`

const startGetDetailCurrency = () => {
  return {
    type: GET_DETAILCURRENCY_START,
  };
};

const successGetDetailCurrency = (currency, volume) => {
  return {
    type: GET_DETAILCURRENCY_SUCCESS,
    currency,
    volume,
  };
};

const failGetDetailCurrency = (error) => {
  return {
    type: GET_DETAILCURRENCY_FAIL,
    error,
  };
};
const getCurrencyFromLocalStorage = (detailCurrency) => {
  return {
    type: GET_CURRENCYFROMLOCALSTORAGE,
    detailCurrency
  }
}


function* getDetailCurrencySaga(action) {
  const { func, symbol, date } = action.payload;
  yield put(startGetDetailCurrency());
  try {

    let currency = JSON.parse(localStorage.getItem(symbol))
    console.log(currency)
    if (!currency) {
      currency = yield call(DetailCurrencyService.getCurrencyDaily, func, symbol, date);
      console.log(currency);
      if (currency[0].length >= 1500) {
        currency[0] = currency[0].slice(-1500)
        currency[1] = currency[1].slice(-1500)
      }
      const barColor = currency[1].map((_, i) => {
        if (i === 0) {
          return "red"
        }
        return currency[1][i - 1].value < currency[1][i].value ? "red" : 'blue'
      })
      const volumeData = currency[1].map((item, i) => ({
        ...item,
        color: barColor[i]
      }))
      yield put(successGetDetailCurrency(currency[0], volumeData));
    } else {
      yield put(getCurrencyFromLocalStorage(currency))

    }
  } catch (error) {
    yield put(failGetDetailCurrency(error));
  }
}


const GET_DETAILCURRENCY_SAGA = "GET_DETAILCURRENCY_SAGA";
export const getDetailCurrencySagaActionCreator = (symbol, date) => ({
  type: GET_DETAILCURRENCY_SAGA,
  payload: {
    func: 'DIGITAL_CURRENCY_DAILY',
    symbol,
    date: "Time Series (Digital Currency Daily)"
  },
});

//indicator

//액션
const GET_INDICATOR_START = `GET_INDICATOR_START`
const GET_INDICATOR_SUCCESS = `GET_INDICATOR_SUCCESS`
const GET_INDICATOR_FAIL = `GET_INDICATOR_FAIL`

//액션생성자함수

const startGetIndicator = () => {
  return {
    type: GET_INDICATOR_START,
  }
}

const SuccessGetIndicator = (indicator) => {
  return {
    type: GET_INDICATOR_SUCCESS,
    indicator
  }
}

const FailGetIndicator = (error) => {
  return {
    type: GET_INDICATOR_FAIL,
    error
  }
}

const GET_INDICATOR_SAGA = 'GET_INDICATOR_SAGA'

//사가색션생성자 함수
export function getIndicatorSagaActionCreator() {
  return {
    type: GET_INDICATOR_SAGA,
  }
}


function* getIndicatorSaga() {
  yield put(startGetIndicator());
  try {
    const symbol = yield select(state => state.selectedStock.symbol);
    if (localStorage.getItem(symbol)) return;
    const indicator = yield call(IndicatorService.getIndicator, symbol)
    yield put(SuccessGetIndicator(indicator))
    const detailCurrency = yield select(state => state.detailStock)
    localStorage.setItem(symbol, JSON.stringify(detailCurrency))
  } catch (error) {
    console.log(error)
    yield put(FailGetIndicator(error));
  }
}












export function* detailCurrencySaga() {
  yield takeEvery(GET_DETAILCURRENCY_SAGA, getDetailCurrencySaga);
  yield takeEvery(GET_DETAILCURRENCY_SUCCESS, getIndicatorSaga);
}










export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_CURRENCYFROMLOCALSTORAGE: {
      return {
        ...action.detailCurrency
      }
    }
    case GET_DETAILCURRENCY_START:
      return {
        ...prevState,
        loading: true,
        error: null,
      };

    case GET_DETAILCURRENCY_SUCCESS:
      return {

        loading: true,
          currency: action.currency,
          error: null,
          volume: action.volume
      };
    case GET_DETAILCURRENCY_FAIL:
      return {
        ...prevState,
        loading: false,
        error: action.error,
      };

    case GET_INDICATOR_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      }

      case GET_INDICATOR_SUCCESS:
        return {
          ...prevState,
          loading: false,
            indicator: action.indicator,
            error: null,
        }
        case GET_INDICATOR_FAIL:
          return {
            ...prevState,
            loading: false,
              error: action.error
          }

          default:
            return {
              ...prevState,
            };

  }
}
