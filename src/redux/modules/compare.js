import DetailStockService from "../../services/DetailStockService";
import {
  put,
  call,
  takeEvery
} from "redux-saga/effects";

const initialState = {
  loading: true,
  stock: [],
  error: null,
}

//액션
const GET_COMPARE_START = `GET_COMPARE_START`;
const GET_COMPARE_SUCCESS = `GET_COMPARE_SUCCESS`;
const GET_COMPARE_FAIL = `GET_COMPARE_FAIL`;

//액션생성자함수

const startGetCompare = () => {
  return {
    type: GET_COMPARE_START,
  };
};

const successGetCompare = (stock) => {
  return {
    type: GET_COMPARE_SUCCESS,
    stock,
  };
};

const failGetCompare = (error) => {
  return {
    type: GET_COMPARE_FAIL,
    error,
  };
};

const GET_COMPARE_SAGA = 'GET_INDICATOR_SAGA';

//사가색션생성자 함수
export function getCompareSagaActionCreator(symbol) {
  return {
    type: GET_COMPARE_SAGA,
    payload: {
      func: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol,
      date: 'Time Series (Daily)',
    }
  };
}

function* getCompareSaga(action) {
  const {
    func,
    symbol,
    date
  } = action.payload;
  yield put(startGetCompare());
  try {
    let compareStock = JSON.parse(localStorage.getItem(symbol));
    if (!compareStock) {
      compareStock = yield call(DetailStockService.getStockDaily, func, symbol, date);
      if (compareStock[0].length >= 1500) {
        compareStock[0] = compareStock[0].slice(-1500);
      }
      yield put(successGetCompare(compareStock[0]));
    } else {
      const {
        stock
      } = compareStock;
      yield put(successGetCompare(
        stock
      ));
    }
  } catch (error) {
    yield put(failGetCompare(error));
  }
}





export function* compareSaga() {
  yield takeEvery(GET_COMPARE_SAGA, getCompareSaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_COMPARE_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      };

    case GET_COMPARE_SUCCESS:
      return {
        ...prevState,
        loading: false,
          stock: action.stock,
          error: null,
      };
    case GET_COMPARE_FAIL:
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