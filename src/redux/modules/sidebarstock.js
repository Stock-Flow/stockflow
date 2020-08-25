import StockService from '../../services/StockService'
import {
  put,
  call,
  select,
  takeLeading
} from 'redux-saga/effects'


const prefix = "stockflow/sidebarstock"

const initialState = {
  loading: false,
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
    symbols
  } = action.payload
  yield put(startGetSideBarStock());
  try {
    const stocks = yield call(StockService.getSideBarStock(symbols))
    yield put(SuccessGetSideBarStock(stocks))
  } catch (error) {
    yield put(FailGetSideBarStock(error));
  }

<<<<<<< HEAD
}
=======
}

const GET_SIDEBARSTOCK_SAGA = "GET_SIDEBARSTOCK_SAGA";
>>>>>>> feature/sidebarStock
