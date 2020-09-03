import StockService from '../../services/StockService';
import { put, call, takeEvery } from 'redux-saga/effects';

const prefix = 'stockflow/stock';

const initialState = {
  loading: false,
  stock: {},
  error: null,
};

const GET_STOCK_START = `${prefix}/GET_STOCK_START`;
const GET_STOCK_SUCCESS = `${prefix}/GET_STOCK_SUCCESS`;
const GET_STOCK_FAIL = `${prefix}/GET_STOCK_FAIL`;

const startGetStock = () => {
  return {
    type: GET_STOCK_START,
  };
};

const successGetStock = (stock) => {
  return {
    type: GET_STOCK_SUCCESS,
    stock,
  };
};

const failGetStock = (error) => {
  return {
    type: GET_STOCK_FAIL,
    error,
  };
};

function* getStockSaga(action) {
  const { func, symbol } = action.payload;

  yield put(startGetStock());
  try {
    const stock = yield call(StockService.getStockIntra, func, symbol);

    console.log(stock);
    yield put(successGetStock(stock));
  } catch (error) {
    yield put(failGetStock(error));
  }
}

const GET_STOCK_SAGA = 'GET_STOCK_SAGA';
export const getStockSagaActionCreator = (func, symbol) => ({
  type: GET_STOCK_SAGA,
  payload: {
    func,
    symbol,
  },
});

export function* stockSaga() {
  yield takeEvery(GET_STOCK_SAGA, getStockSaga);
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_STOCK_START:
      return {
        ...prevState,
        loading: true,
        error: null,
      };

    case GET_STOCK_SUCCESS:
      return {
        loading: false,
        stock: action.stock,
        error: null,
      };
    case GET_STOCK_FAIL:
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
