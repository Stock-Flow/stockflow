import StockService from '../../services/StockService'
import {
  put,
  call,
  select,
  takeLeading,
  take
} from 'redux-saga/effects'
import SearchService from '../../services/SearchService'
import DataProcessingService from '../../services/DataProcessingService'



const prefix = "stockflow/sidebarstock/"

const initialState = {
  loading: true,
  sideBarStock: [],
  sort: "name",
  error: null
}

const GET_SIDEBARSTOCK_START = `${prefix}GET_SIDEBARSTOCK_START`
const GET_SIDEBARSTOCK_SUCCESS = `${prefix}GET_SIDEBARSTOCK_SUCCESS`
const GET_SIDEBARSTOCK_FAIL = `${prefix}GET_SIDEBARSTOCK_FAIL`


const startGetSideBarStock = () => {
  return {
    type: GET_SIDEBARSTOCK_START,
  }
}

const SuccessGetSideBarStock = (sideBarStock) => {
  return {
    type: GET_SIDEBARSTOCK_SUCCESS,
    sideBarStock
  }
}

const FailGetSideBarStock = (error) => {
  return {
    type: GET_SIDEBARSTOCK_FAIL,
    error
  }
}

function* getSideBarStockSaga(action) {
  const {
    searchvalue
  } = action.payload
  yield put(startGetSideBarStock());
  try {
    if (searchvalue) {
      const symbols = yield call(SearchService.searchingStock, searchvalue);
      const stocks = yield call(StockService.getSideBarStock, symbols.bestMatches)
      yield put(SuccessGetSideBarStock(stocks.map(stock => DataProcessingService.DataProcessing(stock, "Time Series (Daily)"))))
    } else {
      const stocks = yield select(state => state.djia.djia);
      yield put(SuccessGetSideBarStock(stocks));
    }
  } catch (error) {
    console.log(error);
    yield put(FailGetSideBarStock(error));
  }
}

function* initialSideBarStockSaga() {
  yield put(startGetSideBarStock());
  try {
    let stocks = yield select(state => state.djia.djia);
    stocks = stocks.slice(0, 10);
    yield put(SuccessGetSideBarStock(stocks));
  } catch (error) {
    yield put(FailGetSideBarStock(error));
  }
}


const GET_SIDEBARSTOCK_SAGA = "GET_SIDEBARSTOCK_SAGA";

export const getSideBarStockSagaActionCreator = (searchvalue) => ({
  type: GET_SIDEBARSTOCK_SAGA,
  payload: {
    searchvalue
  }
})

export function* sideBarStockSaga() {
  yield takeLeading(GET_SIDEBARSTOCK_SAGA, getSideBarStockSaga);
  yield takeLeading("stockflow/djia/GET_DJIA_SUCCESS", initialSideBarStockSaga)
}

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case GET_SIDEBARSTOCK_START:
      return {
        ...prevState,
        loading: true,
          error: null,
      }

      case GET_SIDEBARSTOCK_SUCCESS:
        return {
          ...prevState,
          loading: false,
            sideBarStock: action.sideBarStock,
            error: null,
        }
        case GET_SIDEBARSTOCK_FAIL:
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