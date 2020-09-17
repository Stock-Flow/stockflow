import DetailCurrencyService from "../../services/DetailCurrencyService";
import {
  put,
  call,
  takeEvery,
  select
} from "redux-saga/effects";
import IndicatorService from "../../services/IndicatorService";
import LocalStorageService from "../../services/LocalStorageService";
import DataProcessingService from "../../services/DataProcessingService";



const prefix = 'stockflow/currency';

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

const successGetDetailCurrency = (currency, volume, indicator) => {
  return {
    type: GET_DETAILCURRENCY_SUCCESS,
    currency,
    indicator,
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
    const updateDate = yield select(state => state.djia.date);
    let currency = LocalStorageService.getDetailCurrency(symbol, updateDate);
    if (!currency) {
      currency = yield call(DetailCurrencyService.getCurrencyDaily, func, symbol, date);
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
      const indicator = DataProcessingService.currencyIndicatorProcessing(currency[0])
      yield put(successGetDetailCurrency(currency[0], volumeData, indicator));
    } else {
      yield put(getCurrencyFromLocalStorage(currency))
    }
  } catch (error) {
    console.log(error)
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

// //indicator

// //액션
// const GET_CURRENCYINDICATOR_START = `GET_CURRENCYINDICATOR_START`
// const GET_CURRENCYINDICATOR_SUCCESS = `GET_CURRENCYINDICATOR_SUCCESS`
// const GET_CURRENCYINDICATOR_FAIL = `GET_CURRENCYINDICATOR_FAIL`

// //액션생성자함수

// const startGetCurrencyIndicator = () => {
//   return {
//     type: GET_CURRENCYINDICATOR_START,
//   }
// }

// const SuccessGetCurrencyIndicator = (indicator) => {
//   return {
//     type: GET_CURRENCYINDICATOR_SUCCESS,
//     indicator
//   }
// }

// const FailGetCurrencyIndicator = (error) => {
//   return {
//     type: GET_CURRENCYINDICATOR_FAIL,
//     error
//   }
// }

// const GET_CURRENCYINDICATOR_SAGA = 'GET_CURRENCYINDICATOR_SAGA'

// // 사가색션생성자 함수
// export function getCurrencyIndicatorSagaActionCreator() {
//   return {
//     type: GET_CURRENCYINDICATOR_SAGA,
//   }
// }


// function* getCurrencyIndicatorSaga() {
//   yield put(startGetCurrencyIndicator());
//   try {
//     const symbol = yield select(state => state.selectedStock.symbol);
//     const indicator = yield call(IndicatorService.getIndicator, symbol)
//     yield put(SuccessGetCurrencyIndicator(indicator))
//     const detailCurrency = yield select(state => state.detailCurrency)
//     LocalStorageService.setItem(symbol, detailCurrency)
//   } catch (error) {
//     console.log(error)
//     yield put(FailGetCurrencyIndicator(error));
//   }
// }












export function* detailCurrencySaga() {
  yield takeEvery(GET_DETAILCURRENCY_SAGA, getDetailCurrencySaga);
  // yield takeEvery(GET_DETAILCURRENCY_SUCCESS, getCurrencyIndicatorSaga);
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
        ...prevState,
        loading: false,
        currency: action.currency,
        indicator: action.indicator,
        error: null,
        volume: action.volume
      };
    case GET_DETAILCURRENCY_FAIL:
      return {
        ...prevState,
        loading: false,
        error: action.error,
      };

    // case GET_CURRENCYINDICATOR_START:
    //   return {
    //     ...prevState,
    //     loading: true,
    //       error: null,
    //   }

    //   case GET_CURRENCYINDICATOR_SUCCESS:
    //     return {
    //       ...prevState,
    //       loading: false,
    //         indicator: action.indicator,
    //         error: null,
    //     }
    //     case GET_CURRENCYINDICATOR_FAIL:
    //       return {
    //         ...prevState,
    //         indicator: [],
    //         loading: false,
    //         error: action.error
    //       }

          default:
            return {
              ...prevState,
            };

  }
}
