import DetailStockService from '../../services/DetailStockService';
import {
  put,
  call,
  takeEvery,
  select
} from 'redux-saga/effects';
import IndicatorService from '../../services/IndicatorService';
import LocalStorageService from '../../services/LocalStorageService';

const prefix = 'stockflow/stock';

const initialState = {
  loading: true,
  stock: [],
  error: null,
  indicator: [],
  volume: [],
};

const GET_DETAILSTOCK_START = `${prefix}/GET_DETAILSTOCK_START`;
const GET_DETAILSTOCK_SUCCESS = `${prefix}/GET_DETAILSTOCK_SUCCESS`;
const GET_DETAILSTOCK_FAIL = `${prefix}/GET_DETAILSTOCK_FAIL`;
const GET_STOCKFROMLOCALSTORAGE = `${prefix}/GET_STOCKFROMLOCALSTORAGE`;

const startGetDetailStock = () => {
  return {
    type: GET_DETAILSTOCK_START,
  };
};

const successGetDetailStock = (stock, volume) => {
  return {
    type: GET_DETAILSTOCK_SUCCESS,
    stock,
    volume,
  };
};

const failGetDetailStock = (error) => {
  return {
    type: GET_DETAILSTOCK_FAIL,
    error,
  };
};
const getStockFromLocalStorage = (detailStock) => {
  return {
    type: GET_STOCKFROMLOCALSTORAGE,
    detailStock,
  };
};

// function* getDetailStockSaga(action) {
//   const { func, symbol, date } = action.payload;
//   yield put(startGetDetailStock());
//   try {
//     let stock = yield call(DetailStockService.getStockDaily, func, symbol);
//     stock = DataProcessingService.DataProcessing(stock, 'Time Series (Daily)');
//     stock = DataProcessingService.AdjustSplitSingle(stock);
//     yield put(successGetDetailStock(stock));
//   } catch (error) {
//     console.log(error);
//     yield put(failGetDetailStock(error));
//   }
// }

function* getDetailStockSaga(action) {
  const {
    func,
    symbol,
    date
  } = action.payload;
  yield put(startGetDetailStock());
  try {
    const updateDate = yield select(state => state.djia.date);
    let stock = LocalStorageService.getDetailStock(symbol, updateDate);
    if (!stock) {
      stock = yield call(DetailStockService.getStockDaily, func, symbol, date);
      if (stock[0].length >= 1500) {
        stock[0] = stock[0].slice(-1500);
        stock[1] = stock[1].slice(-1500);
      }
      const barColor = stock[1].map((_, i) => {
        if (i === 0) {
          return 'red';
        }
        return stock[1][i - 1].value < stock[1][i].value ? 'red' : 'blue';
      });
      const volumeData = stock[1].map((item, i) => ({
        ...item,
        color: barColor[i],
      }));
      yield put(successGetDetailStock(stock[0], volumeData));
    } else {
      yield put(getStockFromLocalStorage(stock));
    }
  } catch (error) {
    console.log(error);
    yield put(failGetDetailStock(error));
  }
}

const GET_DETAILSTOCK_SAGA = 'GET_DETAILSTOCK_SAGA';
export const getDetailStockSagaActionCreator = (symbol, date) => ({
  type: GET_DETAILSTOCK_SAGA,
  payload: {
    func: 'TIME_SERIES_DAILY_ADJUSTED',
    symbol,
    date: 'Time Series (Daily)',
  },
});

//indicator

//액션
const GET_INDICATOR_START = `GET_INDICATOR_START`;
const GET_INDICATOR_SUCCESS = `GET_INDICATOR_SUCCESS`;
const GET_INDICATOR_FAIL = `GET_INDICATOR_FAIL`;

//액션생성자함수

const startGetIndicator = () => {
  return {
    type: GET_INDICATOR_START,
  };
};

const SuccessGetIndicator = (indicator) => {
  return {
    type: GET_INDICATOR_SUCCESS,
    indicator,
  };
};

const FailGetIndicator = (error) => {
  return {
    type: GET_INDICATOR_FAIL,
    error,
  };
};

const GET_INDICATOR_SAGA = 'GET_INDICATOR_SAGA';

//사가색션생성자 함수
export function getIndicatorSagaActionCreator() {
  return {
    type: GET_INDICATOR_SAGA,
  };
}

function* getIndicatorSaga() {
  yield put(startGetIndicator());
  try {
    const symbol = yield select((state) => state.selectedStock.symbol);
    const indicator = yield call(IndicatorService.getIndicator, symbol);
    yield put(SuccessGetIndicator(indicator));
    const detailStock = yield select((state) => state.detailStock);
    LocalStorageService.setItem(symbol, detailStock);
  } catch (error) {
    console.log(error);
    yield put(FailGetIndicator(error));
  }
}




export function* detailStockSaga() {
  yield takeEvery(GET_DETAILSTOCK_SAGA, getDetailStockSaga);
  yield takeEvery(GET_DETAILSTOCK_SUCCESS, getIndicatorSaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_STOCKFROMLOCALSTORAGE: {
      return {
        ...action.detailStock,
      };
    }
    case GET_DETAILSTOCK_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      };

    case GET_DETAILSTOCK_SUCCESS:
      return {
        loading: true,
          stock: action.stock,
          error: null,
          volume: action.volume,
      };
    case GET_DETAILSTOCK_FAIL:
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
      };

    case GET_INDICATOR_SUCCESS:
      return {
        ...prevState,
        loading: false,
          indicator: action.indicator,
          error: null,
      };
    case GET_INDICATOR_FAIL:
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