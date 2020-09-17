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
import {
  useDispatch
} from 'react-redux'
import LocalStorageService from '../../services/LocalStorageService'


const prefix = "stockflow/sidebarstock/"

const initialState = {
  loading: true,
  sideBarStock: [],
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
      let stocks = yield call(StockService.getSideBarStock, symbols.bestMatches)
      stocks = DataProcessingService.AdjustSplit(stocks);
      stocks = stocks.map(stock => ({
        ...stock,
        stockData: DataProcessingService.sidebarGraphDataProcessing(stock)
      }))
      yield put(SuccessGetSideBarStock(stocks))
    } else {
      let stocks = yield select(state => state.djia.djia);
      stocks = stocks.slice(0, 10);

      yield put(SuccessGetSideBarStock(stocks));
    }
  } catch (error) {
    console.log(error);
    yield put(FailGetSideBarStock(error));
  }
}

const GET_STOCKNOW_START = `${prefix}GET_STOCKNOW_START`
const GET_STOCKNOW_SUCCESS = `${prefix}GET_STOCKNOW_SUCCESS`
const GET_STOCKNOW_FAIL = `${prefix}GET_STOCKNOW_FAIL`

const startGetStockNow = () => {
  return {
    type: GET_STOCKNOW_START,
  }
}

const successGetStockNow = (sideBarStock) => {
  return {
    type: GET_STOCKNOW_SUCCESS,
    sideBarStock
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
    const savedStocks = LocalStorageService.getItem("stockSideBar");
    const stockNow = yield select(state => state.sideBarStock.sideBarStock)
    if (stockNow.length === 0) {
      return;
    }
    if (savedStocks !== null) {


      if (stockNow.filter((stock, i) => {
          if (i > savedStocks.length - 1) return false
          return stock.symbol !== savedStocks[i].symbol

        }).length === 0) {
        yield put(successGetStockNow(savedStocks));
      } else {
        const stocks = yield call(StockService.getStockNow, stockNow);
        LocalStorageService.setItem("stockSideBar", stocks);
        yield put(successGetStockNow(stocks));
      }
    } else {
      const stocks = yield call(StockService.getStockNow, stockNow);
      LocalStorageService.setItem("stockSideBar", stocks);
      yield put(successGetStockNow(stocks));
    }
  } catch (error) {
    console.log(error);
    yield put(failGetStockNow(error));
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
  yield takeLeading(`${prefix}GET_SIDEBARSTOCK_SUCCESS`, getStockNowSaga)
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
          loading: true,
            sideBarStock: action.sideBarStock,
            error: null,
        }
        case GET_SIDEBARSTOCK_FAIL:
          return {
            ...prevState,
            loading: false,
              error: action.error
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
                sideBarStock: action.sideBarStock,
                  error: null,
                  loading: false,
              }
              case GET_STOCKNOW_FAIL:
                return {
                  ...prevState,
                  loading: false,
                    error: action.error,
                }
                default:
                  return {
                    ...prevState
                  }
  }
}