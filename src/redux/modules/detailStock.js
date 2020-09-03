import DetailStockService from "../../services/DetailStockService";
import {
  put,
  call,
  takeEvery,
  select
} from "redux-saga/effects";
import DataProcessingService from "../../services/DataProcessingService";
import IndicatorService from "../../services/IndicatorService";
import {
  symbol
} from "d3-shape";
import {
  useSelector
} from "react-redux";

const prefix = "stockflow/stock";

const initialState = {
  loading: true,
  stock: [],
  error: null,
  indicator: []
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
  const {
    func,
    symbol,
    date,
  } = action.payload;
  yield put(startGetDetailStock())
  try {
    console.log(date);
    let stock = yield call(DetailStockService.getStockDaily, func, symbol, date);

    if (stock.length >= 1500) {
      stock = stock.slice(-1500)
    }
    yield put(successGetDetailStock(stock));
  } catch (error) {
    console.log(error);
    yield put(failGetDetailStock(error))
  }
}

const GET_DETAILSTOCK_SAGA = "GET_DETAILSTOCK_SAGA";
export const getDetailStockSagaActionCreator = (func, symbol, date) => ({
  type: GET_DETAILSTOCK_SAGA,
  payload: {
    func,
    symbol,
    date,
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
    const symbol = yield select(state => state.selectedStock.selectedStock);
    const indicator = yield call(IndicatorService.getIndicator, symbol)
    yield put(SuccessGetIndicator(indicator))
  } catch (error) {
    console.log(error)
    yield put(FailGetIndicator(error));
  }
}











export function* detailStockSaga() {
  yield takeEvery(GET_DETAILSTOCK_SAGA, getDetailStockSaga);
  yield takeEvery(GET_DETAILSTOCK_SUCCESS, getIndicatorSaga);
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