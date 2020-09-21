import DetailCurrencyService from "../../services/DetailCurrencyService";
import {
  put,
  call,
  takeEvery
} from "redux-saga/effects";

const initialState = {
  loading: true,
  currency: [],
  error: null,
}

//액션
const GET_COMPARECURRENCY_START = `GET_COMPARECURRENCY_START`;
const GET_COMPARECURRENCY_SUCCESS = `GET_COMPARECURRENCY_SUCCESS`;
const GET_COMPARECURRENCY_FAIL = `GET_COMPARECURRENCY_FAIL`;

//액션생성자함수

const startGetCompareCurrency = () => {
  return {
    type: GET_COMPARECURRENCY_START,
  };
};

const successGetCompareCurrency = (currency) => {
  return {
    type: GET_COMPARECURRENCY_SUCCESS,
    currency,
  };
};

const failGetCompareCurrency = (error) => {
  return {
    type: GET_COMPARECURRENCY_FAIL,
    error,
  };
};

const GET_COMPARECURRENCY_SAGA = 'GET_INDICATOR_SAGA';

//사가색션생성자 함수
export function getCompareCurrencySagaActionCreator(symbol) {
  return {
    type: GET_COMPARECURRENCY_SAGA,
    payload: {
      func: 'DIGITAL_CURRENCY_DAILY',
      symbol,
      date: "Time Series (Digital Currency Daily)",
    }
  };
}

function* getCompareCurrencySaga(action) {
  const {
    func,
    symbol,
    date
  } = action.payload;
  yield put(startGetCompareCurrency());
  try {
    let compareCurrency = JSON.parse(localStorage.getItem(symbol));
    if (!compareCurrency) {
      compareCurrency = yield call(DetailCurrencyService.getCurrencyDaily, func, symbol, date);
      if (compareCurrency[0].length >= 1500) {
        compareCurrency[0] = compareCurrency[0].slice(-1500);
      }
      yield put(successGetCompareCurrency(compareCurrency[0]));
    } else {
      const {
        currency
      } = compareCurrency;
      yield put(successGetCompareCurrency(
        currency
      ));
    }
  } catch (error) {
    yield put(failGetCompareCurrency(error));
  }
}





export function* compareCurrencySaga() {
  yield takeEvery(GET_COMPARECURRENCY_SAGA, getCompareCurrencySaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_COMPARECURRENCY_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      };

    case GET_COMPARECURRENCY_SUCCESS:
      return {
        ...prevState,
        loading: false,
          currency: action.currency,
          error: null,
      };
    case GET_COMPARECURRENCY_FAIL:
      return {
        ...prevState,
        loading: false,
          error: action.error,
      };

    default:
      return {
        ...prevState,
      };
  }
}