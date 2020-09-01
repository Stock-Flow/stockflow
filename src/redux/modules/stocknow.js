import StockService from '../../services/StockService'
import {
  put,
  call,
  select,
  takeLeading,
  takeEvery,
} from 'redux-saga/effects'



const prefix = "stockflow/stocknow/"

const initialState = {
  loading: true,
  stockNow: [],
  error: null
}

const GET_STOCKNOW_START = `${prefix}GET_STOCKNOW_START`
const GET_STOCKNOW_SUCCESS = `${prefix}GET_STOCKNOW_SUCCESS`
const GET_STOCKNOW_FAIL = `${prefix}GET_STOCKNOW_FAIL`



const startGetStockNow = () => {
  return {
    type: GET_STOCKNOW_START,
  }
}

const successGetStockNow = (stockNow) => {
  return {
    type: GET_STOCKNOW_SUCCESS,
    stockNow
  }
}

const failGetStockNow = (error) => {
  return {
    type: GET_STOCKNOW_FAIL,
    error
  }
}

function* getStockNowSaga() {
  yield put(startGetStockNow());
  try {
    const stockNow = yield select(state => state.sideBarStock.sideBarStock)
    const symbols = yield stockNow.map(item => item.symbol);
    const stocks = yield call(StockService.getStockNow, symbols);
    yield put(successGetStockNow(stocks));
  } catch (error) {
    yield put(failGetStockNow(error));
    console.log(error);
  }
}
const LOADING = "LOADING"

function* setLoading() {
  yield put({
    type: LOADING
  });
}

export function* stockNowSaga() {
  yield takeLeading("stockflow/sidebarstock/GET_SIDEBARSTOCK_SUCCESS", getStockNowSaga)
  yield takeEvery("stockflow/sidebarstock/GET_SIDEBARSTOCK_START", setLoading)
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...prevState,
        loading: true
      }
      case GET_STOCKNOW_START:
        return {
          ...prevState,
          loading: true,
            error: null,
        }

        case GET_STOCKNOW_SUCCESS:
          return {
            ...prevState,
            loading: false,
              stockNow: action.stockNow,
              error: null,
          }
          case GET_STOCKNOW_FAIL:
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