import DetailStockService from '../../services/DetailStockService';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import DataProcessingService from '../../services/DataProcessingService';

const prefix = 'stockflow/stock';

const initialState = {
  loading: true,
  stock: [],
  error: null,
  date: 'Time Series (Daily)',
};

const GET_DETAILSTOCK_START = `${prefix}/GET_DETAILSTOCK_START`;
const GET_DETAILSTOCK_SUCCESS = `${prefix}/GET_DETAILSTOCK_SUCCESS`;
const GET_DETAILSTOCK_FAIL = `${prefix}/GET_DETAILSTOCK_FAIL`;

const startGetDetailStock = () => {
  return {
    type: GET_DETAILSTOCK_START,
  };
};

const successGetDetailStock = (stock) => {
  return {
    type: GET_DETAILSTOCK_SUCCESS,
    stock,
  };
};

const failGetDetailStock = (error) => {
  return {
    type: GET_DETAILSTOCK_FAIL,
    error,
  };
};

function* getDetailStockSaga(action) {
  const { func, symbol, date } = action.payload;
  yield put(startGetDetailStock());
  try {
    let stock = yield call(DetailStockService.getStockDaily, func, symbol);
    stock = DataProcessingService.DataProcessing(stock, 'Time Series (Daily)');
    stock = DataProcessingService.AdjustSplitSingle(stock);
    yield put(successGetDetailStock(stock));
  } catch (error) {
    console.log(error);
    yield put(failGetDetailStock(error));
  }
}

const GET_DETAILSTOCK_SAGA = 'GET_DETAILSTOCK_SAGA';

export const getDetailStockSagaActionCreator = (func, symbol, date) => ({
  type: GET_DETAILSTOCK_SAGA,
  payload: {
    func,
    symbol,
    date,
  },
});

export function* detailStockSaga() {
  yield takeEvery(GET_DETAILSTOCK_SAGA, getDetailStockSaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_DETAILSTOCK_START:
      return {
        ...prevState,
        loading: true,
        error: null,
      };

    case GET_DETAILSTOCK_SUCCESS:
      return {
        loading: false,
        stock: action.stock,
        error: null,
      };
    case GET_DETAILSTOCK_FAIL:
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
